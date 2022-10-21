const getCounter = (networkId) => {
  return {
    5: '0xd47255CB7f9c8E0DCfA65cfc1FE0D3b2F3F65Cb2',
  }[networkId];
};

const getPayMaster = (networkId) => {
  return {
    // 5: '0xFAb764C948331a9aD720F746e319BAE092a97148',
    5: '0x7C10d29cfc9951958d8ffF6d9D9c9697A146bf70',
  }[networkId];
};

const getRelayHub = (networkId) => {
  return {
    5: '0x40bE32219F0F106067ba95145e8F2b3e7930b201',
  }[networkId];
};

const getForwarder = (networkId) => {
  return {
    5: ' 0x7A95fA73250dc53556d264522150A940d4C50238',
  }[networkId];
};

module.exports = {
  getCounter,
  getPayMaster,
  getRelayHub,
  getForwarder,
};
