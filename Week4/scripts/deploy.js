// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  const [lawyer] = await hre.ethers.getSigners()
  
  const Amount = hre.ethers.utils.parseEther("0.00001");
  
  const Escrow = await hre.ethers.getContractFactory("Escrow");
  const escrow = await Escrow.deploy(
    "0x7E8FEA48d4c3bB3EE9a5811fDfE51afc0c7C3A53",
    "0x9834bB9dcab23Ac2FFc6a8734647F184A0b121F8",
     33333);  
  console.log("Escrow deployed to:", escrow.address);
  console.log("contract :", escrow );
  let contract = await escrow.deployed()

  // let balanceAfterDeposit = await hre.ethers.provider.getBalance(contract.address);
  // console.log("Balance after deposit: ", hre.ethers.utils.formatEther(balanceAfterDeposit));

  // let balanceOfBuyer = await contract.connect(buyer).balanceOf();
  // console.log("Balance of Buyer: ", balanceOfBuyer.toString());

  // let balanceOfSeller = await contract.connect(seller).balanceOf();
  // console.log("Balance of Seller: ", balanceOfSeller.toString());

  // let balanceOfContract = await contract.connect(owner).balanceOf();
  // console.log("Balance of Contract: ", balanceOfContract.toString());

  // let release = await contract.connect(owner).release({value : Amount});
  
  // let balanceAfterRelease = await hre.ethers.provider.getBalance(contract.address);
  // console.log("Balance of Contract After Release: ", balanceAfterRelease.toString());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
