const hre = require('hardhat')


async function main() {
    const [owner1, owner2 , owner3] = await hre.ethers.getSigners()    
    const Amount = hre.ethers.utils.parseEther("1.1");
    
    const Token = await hre.ethers.getContractFactory("Token");
    const token = await Token.deploy(
      "SoftMangement",
      "SEP",
      18,
       333333333333, {value: Amount});  // deposits amount with deployement

    console.log("token deployed to:", token.address);
    let contract  = await token.deployed()
    const Owner1Balance = await contract.balanceOf(owner1.address);
    console.log(Owner1Balance, " <= blance of owner1")
    const deposit = await contract.deposit(Amount, owner2.address, {value: Amount});
    const Owner2Balance = await contract.balanceOf(owner2.address);
    console.log(Owner2Balance, " <= balance of Owner2")
    // const trans = await contract.transferEther(333333, owner3.address)
    const transfer = await contract.connect(owner1).transferEther(Amount, owner3.address);

    
  }
  
  // We recommend this pattern to be able to use async/await everywheres
  // and properly handle errors.
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  