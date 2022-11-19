import { ABI, ESCROW_ADDRESS } from "../src/utils/constants";
import { ethers } from "ethers";
import  detectEthereumProvider from '@metamask/detect-provider';
import './App.css';
import React, {useState, useEffect} from 'react';

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [amount, setAmount] = useState(0);
  const [payer, setPayer] = useState("");
  const [payee, setPayee] = useState("");

  useEffect(() => {
    async function initialize() {
      const _provider = await detectEthereumProvider();
      const provider = new ethers.providers.Web3Provider(_provider);

      if (provider && contract) {
        setProvider(provider);

      } else {
        console.log("Please install MetaMask!");
      }
    }
    initialize();
  }, [])

  async function connect () {
    if(window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer =  provider.getSigner();
        const contract = new ethers.Contract(ESCROW_ADDRESS, ABI, signer);
        const amount = await contract.balance();
        console.log("Connected");
        setContract(contract);
        setAmount(amount.toString());
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Please install MetaMask!");
    }
  }

  // async function deposit() {
  //   const tx = await contract.deposit({value: ethers.utils.parseEther(amount.toString())});
  //   await tx.wait();
  // }

  async function getData() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer =  provider.getSigner();
    const contract = new ethers.Contract(ESCROW_ADDRESS, ABI, signer);
  
    const payer = await contract.payer();
    const payee = await contract.payee();
    const amount = await contract.balance();
    // console.log(payer, payee, amount.toString());
    setPayer(payer);
    setPayee(payee);
    setAmount(amount.toString());
    
  }

  async function deposit() {
    const transaction = await contract.deposit({
      value: amount,
    });

    console.log(transaction);

    await transaction.wait();
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Escrow</h1>
        <button onClick={connect}>Connect</button>
        <span> Contract address : {contract?.address}</span>
        <button onClick={deposit}>Deposit : {amount}</button>
        <button>submitWork</button>
        <button>Release</button>
      </header>
      <div>
        <button onClick={getData}>Get Data</button>
        <span>payer : {payer}</span>
      </div>
    </div>
  );
}

export default App;
