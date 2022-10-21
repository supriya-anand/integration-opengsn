require('dotenv').config();
require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-etherscan');
require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-web3');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// INFURA_URL = 'https://goerli.infura.io/v3/0f18af40c18d442688cb8b81b2558d0b';
// ADMIN_KEY = 'e7df724481514fee79f04bd73b29b0be86fd31297213506d3b2ddbd29ef24d44';
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: '0.8.7',
  networks: {
    ganache: {
      url: 'HTTP://127.0.0.1:8545',
      network_id: '1337',
    },
    rinkeby: {
      chainId: 5,
      url: process.env.INFURA_URL,
      from: process.env.ADMIN_KEY,
      accounts: [process.env.ADMIN_KEY],
      gas: 2100000,
      gasPrice: 8000000000,
    },
  },
  // etherscan: {
  //   apiKey: {
  //     rinkeby: process.env.ETHERSCAN_TOKEN,
  //   },
  // },
  // gasReporter: {
  //   enabled: process.env.REPORT_GAS !== undefined,
  //   currency: 'USD',
  // },
};
