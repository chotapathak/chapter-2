const expect = require('chai');

describe('Crud control Test', async function () {
    
    // const CrudControl = await hre.ethers.getContractFactory('CrudControl');
    // const crudCo = await CrudControl.deploy();


    it('deploy the contract', async function () {
        const CrudControl = await hre.ethers.getContractFactory('CrudControl');
        const crudCo = await CrudControl.deploy();
        console.log(crudCo.address);
    })
})

