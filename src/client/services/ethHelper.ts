import Web3 = require('web3');

const web3 = new Web3();

web3.setProvider(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/OlWCtLVFGaNOXOgpelpw'))

export function getNonce (address: string): Promise<number> {
  return web3.eth.getTransactionCount(address);
}

export function sendTx(tx) {
  return web3.eth.sendSignedTransaction(tx, function(err, transactionHash) {
    if (!err)
      console.log(transactionHash);

    console.log(err); 
   });
}
