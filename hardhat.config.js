require("@nomicfoundation/hardhat-toolbox");
require ("hardhat-contract-sizer");
require( "dotenv" ).config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "arb",
  networks: {
    arb:{
      url: process.env.RPC_URL,
      accounts: ["0xf6292b84833bb2366c45668f96c88d2b16fe685cda66ce653418edc68bdfe411"],
    }
  },
  solidity: {
    version: "0.8.24",
  settings: {
    optimizer: {
      enabled: true,
      runs: 1000,
    },
  },
  },
  // evmVersion: "paris",
};
