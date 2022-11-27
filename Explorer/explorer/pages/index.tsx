import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Network, Alchemy } from 'alchemy-sdk';
import { useAccount, useProvider } from 'wagmi';
import { useEffect, useState } from 'react';
import axios from 'axios';
import NftCard from '../src/NftCard';
import Button from '@mui/material/Button';
import { TextField, Input } from '@mui/material';
import IPFS from 'ipfs'
import { create } from 'ipfs-http-client'


const Home = () => {
  const { address, isConnected } = useAccount();
  const [alchemy, setAlchemy]: any = useState(null);
  const [nfts, setNfts]: any = useState([]);
  const [openForm, setOpenForm]: any = useState(false);
  const [title, setTitle]: any = useState('');
  const [description, setDescription]: any = useState('');

  

  // Optional Config object, but defaults to demo api-key and eth-mainnet.
  // const uploadNft = async (e: any) => {
  //     e.preventDefault();
  //   const node = await IPFS.
  //   const data = 'nsnsn'
  //   const files = await node.add(data)
  //   console.log(files)
  // }

  const uploadNft = async (e: any) => {
    e.preventDefault();
    console.log(e.target.files[0]);
    const client = create({
      url: 'https://ipfs.infura.io:5001/5001',
      headers: {
        auth: 'Bearer 9',
      }
    })
    const { cid } = await client.add('hello world')
    console.log(cid, "CID")
    const node = await IPFS.create()
    const files = await node.add(e.target.files[0])
    console.log(files, "File")
  }

  useEffect(() => {
    const settings = {
      apiKey: process.env.ALCHEMY_ID, // Replace with your Alchemy API Key.
      network: Network.ETH_GOERLI, // Replace with your network.
    };
    const alchemy = new Alchemy(settings);
    setAlchemy(alchemy);
  }, []);

  useEffect(() => {
    if (isConnected && alchemy && address) {
      getNFTs(address);
    }
  }, [address, alchemy, isConnected]);

  async function getNFTs(address: string) {
    const nftsForOwner = await alchemy.nft.getNftsForOwner(address);

    for (let i = 0; i < nftsForOwner?.ownedNfts?.length; i++) {
      const currentNft = nftsForOwner.ownedNfts[i];

      const nftMetadata = await axios(currentNft?.tokenUri?.raw);
      nftsForOwner.ownedNfts[i].metadata = nftMetadata.data;
    }
    setNfts(nftsForOwner.ownedNfts);

  }

  // console.log(nfts[0]?.metadata?.image);

  return (
    <div className={styles.container}>

      <main className={styles.main}>
        <ConnectButton />
      </main>

      <div className={styles.box}>
        <Button variant='contained' onClick={(() => setOpenForm(true))}  href="#create">Create</Button>
      </div>

      {openForm ?
        <div className={styles.mint} >
          <h1>Create your NFT</h1>
          <TextField id="outlined-basic" label="Title" variant="outlined" onChange={((e) => setTitle(e.target.value))} />
          <TextField id="outlined-basic" label="Description" multiline variant="outlined" onChange={((e) => setDescription(e.target.value))} />
          <Input type="file" id='nft' name='nft' onChange={((e) => uploadNft(e))} />
          <Button variant='contained' onClick={((e) => uploadNft(e))} href="#create">Done</Button>

        </div> :
        <div className={styles.box}>
          {nfts.map((nft: any, index: any) => (
              <NftCard nft={nft} key={index} />
          ))}
        </div>
      }



      <footer className={styles.footer}>
        <a href="https://rainbow.me" target="_blank" rel="noopener noreferrer">
          Made with ❤️ by your frens at 🌈
        </a>
      </footer>
    </div>
  );
};

export default Home;
