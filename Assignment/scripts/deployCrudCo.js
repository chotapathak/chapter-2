const hre = require('hardhat');

async function main() {
    const CrudControl = await hre.ethers.getContractFactory('CrudControl');
    const crudCo = await CrudControl.deploy();

    await crudCo.deployed();

    console.log(crudCo.address, ' <= contract address');
}

main().catch((error) => {
    console.log(error);
})