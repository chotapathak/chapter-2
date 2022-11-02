const hre = require('hardhat');
const {expect} = require('chai');

describe('MultiSign', function() {

    async function deployedMultiSign() {

        const [owner1, owner2, owner3 , receiver] = await hre.ethers.getSigners();

        const MultiSig = await hre.ethers.getContractFactory('MultiSign');
        const multiSig = await MultiSig.deploy([owner1.address, owner2.address, owner3.address], 3);
        await multiSig.deployed();

        return { multiSig, owner1, owner2, owner3 , receiver};
    }
    describe('test-case', function () {
        it('should have signers', async function(){
            const {multiSig} = await deployedMultiSign()
            const getOwners = await multiSig.getOwners()
            // console.log(getOwners);
        })

        it('should add Transaction', async function(){
        const {multiSig,receiver} = await deployedMultiSign()
        const createTransaction =  await multiSig.createTransaction(3, receiver.address);
        const getTransactionData = await multiSig.getTransactions()
        expect(getTransactionData[0].to).to.equal(receiver.address);
        })

        it('should get Transaction', async function(){
            const {multiSig ,owner1,owner2,owner3 ,receiver} = await deployedMultiSign()
            const createTransaction =  multiSig.createTransaction(3, receiver.address);
            const getTransactionData = await multiSig.getTransactions()
            expect(getTransactionData[0].sent).to.equal(false);
        })

        it('should approve Transaction', async function(){
          const {multiSig,owner1,owner2,owner3 , receiver} = await deployedMultiSign()
          const createTransaction = await multiSig.createTransaction(3, receiver.address);
          const approveTransaction = await multiSig.connect(owner1).approveTransfer(0);
          const approveTransaction2 = await multiSig.connect(owner2).approveTransfer(0);
         expect(multiSig.approvals[owner1.address][0]).to.equal(1);
        })
        it('should check approvals', async function() {
          const {multiSig,owner1,owner2,owner3 , receiver} = await deployedMultiSign()
          console.log(owner1)
        })
    })
})
