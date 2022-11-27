import React from 'react'
import styles from "../styles/Home.module.css";


export default function NftCard({nft} : any) {
// console.log(nft?.metadata)


  // console.log(nft)
  return (
    <div>
        <div className={styles.grid}>
            <div className={styles.card}>
              <h1>{nft?.title}</h1>
              <h3>{nft?.metadata?.attribute}</h3>
              <img src={nft?.metadata?.image} />
  {/* <ListItemText primary="Spam" /> */}
              <p>{nft?.metadata?.description}</p>
              <div className={styles.pbx1}>
              {nft.metadata.attributes.map((attribute: any, index: number) => (

                <p key={index} >{attribute.trait_type}: {attribute.value}</p>
                ))}
                </div>
            </div>
          </div>
    </div>
  )
}
