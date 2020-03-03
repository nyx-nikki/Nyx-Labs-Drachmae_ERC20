const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config();

const providerFactory = network =>
  new HDWalletProvider(
    process.env.MNEMONICS,
    `https://${network}.infura.io/v3/${process.env.INFURA_KEY}`,
    0,
    20
  );

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: 999
    },
    mainnet: {
      provider: () => providerFactory("mainnet"),
      network_id: 1,
      gas: 7000000,
      gasPrice: 20000000000 // 20 Gwei, Change this value according to price average of the deployment time
    },
    rinkeby: {
      provider: () => providerFactory("rinkeby"),
      network_id: 4,
      gas: 6900000,
      gasPrice: 20000000000 // 20 Gwei
    }
  },
  compilers: {
    solc: {
      version: "0.5.0",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  },
  mocha: {
    useColors: true,
    reporter: "eth-gas-reporter",
    reporterOptions: {
      currency: "USD",
      gasPrice: 10
    }
  }
};
