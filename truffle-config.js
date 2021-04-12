const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");

// Below is the account
const mnemonic = "shadow roof credit caught liar kiss convince guilt deputy chapter affair toy foil silly cloth"; // Remove before prod

module.exports = {
  contracts_build_directory: path.join(__dirname, "app/src/contracts"),
  networks: {
    develop: {
      host: "127.0.0.1",
      port: 7845,
      network_id: "*",
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/27a927ec42f347228ad1cca04dc42186")
      },
      network_id: 3
    },  
  },
  compilers: {
    solc: {
        version: "0.5.16",
        settings: { 
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    }
  }
};
  