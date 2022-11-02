const { use } = require("chai");
const expect = require("chai");

describe("Crud control Test", function () {
  async function deployedDetails() {
    const CrudControl = await hre.ethers.getContractFactory("CrudControl");
    const crudCo = await CrudControl.deploy();
    const contract = await crudCo.deployed();
    const contractAddress = crudCo.address;
    return {
      contractAddress,
      crudCo,
    };
  }

  it("deploy the contract", async function () {
    const CrudControl = await hre.ethers.getContractFactory("CrudControl");
    const crudCo = await CrudControl.deploy();
    console.log(crudCo.address, " <= contract address");
  });

  describe('Create AND Read', function () {
    it("can add user", async function () {
      const { crudCo, contractAddress } = await deployedDetails();
      const addUser = await crudCo.addUser("vikash", "chota");
      const user = await crudCo.getUser(0);
      console.log(user.name, " <= user name");
    });
    it("get user", async function () {
      const { crudCo, contractAddress } = await deployedDetails();
      const addUser = await crudCo.addUser("vikash", "chota");
      const user = await crudCo.getUser(0)
      console.log(user.name, user.email, user.userAddress, ' <= user Details');
    });
  })
  describe('Update AND delete', function () {
    it('can update user', async function () {
      const { crudCo, contractAddress } = await deployedDetails();
      const addUser = await crudCo.addUser("vik", "ch");
      let user = await crudCo.getUser(0)
      console.log(user.name , user.email , " <= added first user ");
      const updated = await crudCo.Update(0, 'vikash', 'chota');
      user = await crudCo.getUser(0);
      console.log(user.name, user.email, user.userAddress, ' <= updated first user ');
    })
  })
  it("can delete the detail", async function() {
    const { crudCo, contractAddress } = await deployedDetails();
    const addUser = await crudCo.addUser("vikash", "chota");
    let user = await crudCo.getUser(0);
    console.log(user.name, user.email, user.userAddress, ' <= before deleted')
    // due to storage limitations getting error { reverted with panic code 0x32, { (Array accessed at an out-of-bounds or negative index) }}
    const DeletedUser = await crudCo.deleteUser("0x5FbDB2315678afecb367f032d93F642f64180aa3");
    user = await crudCo.getUser(0)
    console.log(user.name, user.email , user.userAddress, ' <= after deleted');
  })

});
