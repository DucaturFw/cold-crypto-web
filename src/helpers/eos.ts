import callApi from './../utils/callApi';
import Eos from "eosjs"

const chain = {
  main: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906', // main network
  jungle: 'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473', // jungle testnet
  sys: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f' // local developer
};

export const getInfo = (account: string) => {
    // TODO: get right block explorer
    return callApi(
      'GET',
      `https://junglehistory.cryptolions.io:4433/v1`,
      `/history/get_actions/${account}?limit=100&skip=0`
    )
  }
;

// Create instance Eosjs
const eos = Eos({
  httpEndpoint: 'https://jungle2.cryptolions.io',
  chainId: chain.jungle,
});

export const sendTx = async (signedTx: string) => {
  const txHash = await eos.pushTransaction(signedTx);
  console.log('txHash:', txHash)

  return txHash.transaction_id
}