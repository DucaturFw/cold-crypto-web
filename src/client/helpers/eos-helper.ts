const Eos = require('eosjs');

const chain = {
  main: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906', // main network
  jungle: 'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473', // jungle testnet
  sys: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f' // local developer
};

// Create instance Eosjs
const eos = Eos({
  httpEndpoint: 'http://jungle.eosgen.io:80',
  chainId: chain.jungle,
});

export const sendEOSTx = async (signedTx) => {
  const txHash = await eos.pushTransaction(signedTx);
  console.log('txHash:', txHash)

  return txHash.transaction_id
}
