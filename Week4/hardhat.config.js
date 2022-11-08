require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli : {
      url: "https://eth-goerli.g.alchemy.com/v2/0PN3WL10d6LsrKw1bUPlG0eui5g7b3lS",
      accounts: ["c1b365f66a3a0c0d103582726347a0604b501ea4239eb37b576842169761b964"]

    }
  }
};


// lawyer : 0x7487E0c2A86d010583deCa7E31349F43966Cd333 : Account 1
// buyer : 0x7E8FEA48d4c3bB3EE9a5811fDfE51afc0c7C3A53 : Account 2
// seller : 0x9834bB9dcab23Ac2FFc6a8734647F184A0b121F8 : Account 3
