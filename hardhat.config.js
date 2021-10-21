/**
* @type import('hardhat/config').HardhatUserConfig
*/
require('dotenv').config()
require("@nomiclabs/hardhat-ethers")
require('hardhat-contract-sizer')
require("@nomiclabs/hardhat-truffle5")
require("hardhat-gas-reporter")

const { ALCHEMY_API, METAMASK_PRIVATE_KEY, COINMARKETCAP } = process.env;

module.exports = {
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1
      }
    }
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    rinkeby: {
      url: ALCHEMY_API,
      accounts: [`0x${METAMASK_PRIVATE_KEY}`]
    },
    mainnet: {
      url: ALCHEMY_API,
      accounts: [`0x${METAMASK_PRIVATE_KEY}`]
    }
  },
  gasReporter: {
    currency: "USD",
    coinmarketcap: COINMARKETCAP,
  }
}