const hre = require('hardhat')


async function main() {
    const [owner] = hre.ethers.getSigners();

    const NFT = await hre.ethers.getContractFactory("NFT");
    const token = await NFT.connect(owner).deploy(
        "Sidhu",
        "PBX1",
        )
    let contract  = await token.deployed()
    console.log("token deployed to:", token.address);
    let mint = await contract.mint("https://ipfs.io/ipfs/QmainZACVhz4VtbFJpQEtGkJoUakx1Dp9s8FkfsdBfwi9S")
    console.log("Minted", mint);

    
}

// We recommend this pattern to be able to use async/await everywheres
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
