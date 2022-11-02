
const hre = require('hardhat');

async function main() {
    const Test = await hre.ethers.getContractFactory('Test');
    const test = await Test.deploy()
    const CrudControl = await hre.ethers.getContractFactory('CrudControl');
    const crudCo = await CrudControl.deploy();

    await crudCo.deployed();

    console.log(crudCo.address, '  <= CRUD contract address');

    await test.deployed()

    console.log(test.address, '<= contract address');

}


main().catch((error) => {
  console.error(error);
})
