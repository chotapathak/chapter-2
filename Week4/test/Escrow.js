const hre = require('hardhat');
const {expect} = require('chai');

describe('Escrow', function() {

    async function deployedEscrow() {

        const [buyer, seller, lawyer ] = await hre.ethers.getSigners();
        // const amount = hre.ethers.utils.parseEther("0.01")
        const amount = 999999999;
        let  Balance = async (account) =>  await hre.ethers.provider.getBalance(account.address)
        const Escrow = await hre.ethers.getContractFactory('Escrow');
        const escrow = await Escrow.connect(lawyer).deploy(buyer.address, seller.address, amount);
        await escrow.deployed();
        return { escrow, buyer, seller, lawyer , amount, Balance};
    }
    describe('test-case', function () {
        it('have buyer and seller ', async function(){
            const {escrow} = await deployedEscrow()
            const getBuyer = await escrow.payer()
            const getSeller = await escrow.payee()
            const getLawyer = await escrow.lawyer()
            // console.log(getBuyer," <= Buyer");
            // console.log(getSeller," <= Seller ");
            // console.log(getLawyer, " <= Lawyer");

        })

        it('should deposit funds to contract', async function(){
        const {escrow,buyer,amount, Balance} = await deployedEscrow()
        const deposit =  await escrow.connect(buyer).deposit({value: amount});

        const contractBalance = await Balance(escrow)
        const getTransactionData = await escrow.balance();
        // console.log(contractBalance.toString()," <= Contract Balance");
        expect(getTransactionData.toNumber()).to.equal(contractBalance.toNumber());
        })

        it('buyer can submit the work', async function(){
            const {escrow ,buyer,seller,lawyer ,amount} = await deployedEscrow()
            const deposit =  await escrow.connect(buyer).deposit({value: amount});
            const createTransaction = await escrow.connect(seller).submitWork()

            const workDone = await escrow.workDone()
            // console.log(workDone," <= Work Done");
            expect(workDone).to.equal(true);
        })
        
        it('should release the funds', async function(){
            const {escrow,buyer,seller,lawyer , amount, Balance} = await deployedEscrow()
            const deposit =  await escrow.connect(buyer).deposit({value: amount});

            const balanceOf = await Balance(escrow)
            let balanceBeforeRelease = await Balance(lawyer)
            console.log(balanceBeforeRelease.toString()," <= Lawyer Balance Before Release");

            const createTransaction = await escrow.connect(seller).submitWork()            
            const release = await escrow.connect(lawyer).release()

            const balanceOfAfter = await Balance(escrow)
            console.log("Contract Balance After Release => ", balanceOfAfter.toString());

            expect(balanceOfAfter.toNumber()).to.equal(0);
        })
    })
})
