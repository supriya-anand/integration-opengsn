const hre = require('hardhat');
const address = require('./address');

async function main() {
  const chainId = hre.network.config.chainId;
  console.log('chainId: ', chainId);
  const forwarder = address.getForwarder(chainId);
  console.log('Forwarder Address: ', forwarder);
  const relayHubAddress = address.getRelayHub(chainId);
  console.log('RelayHubAddr ', relayHubAddress);

  const WhitelistPaymaster = await hre.ethers.getContractFactory(
    'WhitelistPaymaster'
  );
  const whitelistPaymaster = await WhitelistPaymaster.deploy();
  console.log('Paymaster deployed to:', whitelistPaymaster.address);

  console.log('setting forwarder address in paymaster...');

  await whitelistPaymaster.setTrustedForwarder(forwarder);
  console.log(
    'Set trusted forwarder:',
    await whitelistPaymaster.trustedForwarder()
  );

  console.log('setting relayHub address in paymaster...');

  await whitelistPaymaster.setRelayHub(relayHubAddress);
  console.log('Set relay hub:', await whitelistPaymaster.getHubAddr());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
