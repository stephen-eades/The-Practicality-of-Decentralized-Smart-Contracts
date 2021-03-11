const path = require("path");

module.exports = {
  contracts_build_directory: path.join(__dirname, "app/src/contracts"),
  networks: {
    develop: {
      host: "127.0.0.1",
      port: 7845,
      network_id: "*",
    }
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
  