const Eos = require('eosjs');

const chain = {
  main: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906', // main network
  jungle: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca', // jungle testnet
  sys: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f' // local developer
};

// Create instance Eosjs
const eos = Eos({
  httpEndpoint: 'http://jungle.cryptolions.io:18888',
  chainId: chain.jungle,
});

export const sendEOSTx = async (signedTx) => {
  const txHash = await eos.pushTransaction(signedTx);
  console.log('txHash:', txHash)

  return txHash
}
