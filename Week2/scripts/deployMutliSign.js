
const hre = require('hardhat');

const {expect} = require('chai');

async function main() {
    const [owner1, owner2, owner3 , receiver] = await ethers.getSigners();

    const MultiSig = await hre.ethers.getContractFactory('MultiSign');
    const multiSig = await MultiSig.deploy([owner1.address, owner2.address, owner3.address], 2);
    await multiSig.deployed();
    console.log(multiSig.address, '  <= MultiSig contract address');
    const getOwners = await multiSig.getOwners();
    console.log(getOwners, '  <= getOwners');
    const tx = await multiSig.createTransaction(3, receiver.address);
    console.log(tx.hash, '  <= tx hash');
    const getTransactions = await multiSig.getTransactions();
    console.log(getTransactions, '  <= getTransactions');
}

main().catch((error) => {
  console.error(error);
})