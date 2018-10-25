import Web3 = require('web3');

const web3 = new Web3();

web3.setProvider(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/OlWCtLVFGaNOXOgpelpw'))

export  async function getNonce (address: string): Promise<number> {
  return  await web3.eth.getTransactionCount(address) + 1;
}

export function sendTx(tx) {
  return web3.eth.sendSignedTransaction(tx, function(err, transactionHash) {
    console.log('transactionHash: ', transactionHash)
    if (!err)
      return transactionHash;

    return (err); 
   });
}
