Gsn = require('@opengsn/provider');
const { expect } = require('chai');
const { ethers } = require('hardhat');
const Web3 = require('web3');
const address = require('../scripts/address');
const util = require('../scripts/util');
const Counter = require('../artifacts/contracts/Counter.sol/Counter.json');


describe('Integration Test', function () {
  let counter;
  let admin;
  let user;
  let web3;
  let chainId;
  // console.log('break1');
  before(async function () {
    // Only run integration test if --network is NOT local
    // if (util.isLocal(hre.network.config.chainId)) {
    //   this.skip();
    // }
    // console.log('break2');
    web3 = new Web3(process.env.INFURA_URL);
    // console.log('web3', web3);
    chainId = await web3.eth.net.getId();
    // console.log('chainID: ', chainId);

    const counterAddress = address.getCounter(chainId);
    const paymasterAddress = address.getPayMaster(chainId);
    // console.log('contractAddr: ', counterAddress);
    // console.log('paymaster: ', paymasterAddress);

    console.log('break3');

    [admin] = await ethers.getSigners();
    console.log('admin', admin);
    const config = {
      paymasterAddress,
      loggerConfiguration: {
        logLevel: 'error',
      },
    };

    provider = Gsn.RelayProvider.newProvider({
      provider: web3.currentProvider,
      config,
    });
    console.log('provider', provider);
    console.log('break4');
    await provider.init();
    web3.setProvider(provider);

    //create a new gasless account:
    console.log('break 5');
    user = provider.newAccount();
    console.log(user.address);
    counter = new web3.eth.Contract(Counter.abi, counterAddress, {
      from: user.address,
      gasPrice: 0,
    });
  });

  it('Increment count from gasless user', async function () {
    const oldCount = await counter.methods.counter().call();

    // increment count using gasless user
    await counter.methods.increment().send({ gas: 210000 });

    // check that counter has been incremented
    const newCount = await counter.methods.counter().call();
    expect(parseInt(newCount)).to.equal(parseInt(oldCount) + 1);

    // check lastCaller
    expect(await counter.methods.lastCaller().call()).to.equal(user.address);
  });
});
