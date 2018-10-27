import Web3 = require('web3');
import { jsonRequest } from '../services/api'
import axios from 'axios'
const web3 = new Web3();
const unsign = require('@warren-bank/ethereumjs-tx-unsign')

web3.setProvider(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws'))

export  async function getNonce (address: string): Promise<number> {
  return  await jsonRequest(`account/${address}`, 'nonce');
}

export async function sendTx(tx) {
  const txData = await unsign(tx).txData

  return axios.post('http://18.221.128.6:8080/rawtx', 'sdfsd' + tx)
    .then(response => ({ transactionHash: response.data.txHash, ...txData}))
    .catch(error => new Error(error.response.data))
}
