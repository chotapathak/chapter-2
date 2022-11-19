const hre = require('hardhat');
const {expect} = require('chai');


describe('Token', async function() {
    async function initialToken(){
        
        const [owner1, owner2 , owner3] = await hre.ethers.getSigners()
        const Amount = hre.ethers.utils.parseEther("0.00003")
        const amount = 9999999;
        
        const Token = await hre.ethers.getContractFactory('Token');
        const token = await Token.deploy('SoftToken',"ST", 18, Amount, {value: amount});
        let contract = await token.deployed()
        const balanceOf = await contract.balanceOf(contract.address);
        console.log(contract.address, " <= Token contract addresss || Balance => ",balanceOf )
        
        
        return {
            owner1, owner2, owner3, Amount, amount,contract
        }
    }
    it('should deposit the amount', async function(){
        const {contract, Amount, owner1, owner3 } = await initialToken()
        const deposit = await contract.deposit(Amount, owner3.address)
        
    })
    it('transfer the amount', async function() {
        const {contract,owner1,owner2 , Amount} = await initialToken();
        const amount = hre.ethers.utils.parseEther("0.1");
        let transfer = await contract.transferEther(Amount, owner2.address);
    })
})
