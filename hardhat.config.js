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
    goerli: {
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
