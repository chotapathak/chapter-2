const hre = require('hardhat')

async function main() {
    // const [owner] = hre.ethers.getSigners();

    const NFT = await hre.ethers.getContractFactory("BatchNFT");
    const token = await NFT.deploy(
        "Moosa",
        "PBX1"
        )
    let contract  = await token.deployed()
    console.log("token deployed to:", token.address);
    let mint = await contract.mint(21,"https://ipfs.io/ipfs/QmSvYRMCAVaBN6TM7irjzuUmC4vkAjgYz4c8b1VDGTnw1u")
    console.log("Minted", mint);
    
}

// We recommend this pattern to be able to use async/await everywheres
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
