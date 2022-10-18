const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe('Test', function() {
  async function deployedTest() {

  const [owner, otherAccount] = await hre.ethers.getSigners();

  const Test = await hre.ethers.getContractFactory('Test');
  const test = await Test.deploy();

  const contractAddress = test.address;
  console.log('Our contract address',contractAddress)
  await test.deployed();

  return { test, contractAddress};
}
  describe('test-case-1', function () {
    it('should add user', async function(){
      const {test,contractAddress} = await deployedTest()

      const createEmp =  test.addEmp('vikash', 'chota',  21, "0x5FbDB2315678afecb367f032d93F642f64180aa3");

      const getEmpData = await test.readEmp(0)
      console.log(getEmpData);
  })
})
})
