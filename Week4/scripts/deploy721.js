const hre = require("hardhat");

async function main() {
  const ERC721 = await hre.ethers.getContractFactory("ERC721");
  const erc721 = await ERC721.deploy();
  console.log("ERC721 deployed to:", erc721.address);
  let contract = await erc721.deployed()
  console.log("contract :", contract.address );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
