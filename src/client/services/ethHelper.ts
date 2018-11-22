import Web3 = require('web3');
import { getArguments } from '../helpers/eth-contracts';
const web3 = new Web3();

web3.setProvider(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws'))

export  async function getNonce (address: string): Promise<number> {
  return  await web3.eth.getTransactionCount(address);
}

export async function sendTx(tx) {
  return await web3.eth.sendSignedTransaction(tx, (err, transactionHash) => {
    console.log('transactionHash: ', transactionHash)	
    if (err)
      return err

    return transactionHash
  })
}

export const getContractData = (abi, method, args) => {
  const inputs = getArguments(abi, method)
  
  return web3.eth.abi.encodeFunctionCall({
    name: method,
    type: 'function',
    inputs,
  }, args);
}