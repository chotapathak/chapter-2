
const hre = require('hardhat');

async function main() {
    const Test = await hre.ethers.getContractFactory('Test');
    const test = await Test.deploy()

    await test.deployed()

    console.log(test.address, '<= contract address');

}


main().catch((error) => {
  console.error(error);
})
