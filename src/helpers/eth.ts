import Web3 from 'web3'
const web3 = new Web3()

web3.setProvider(
  new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws')
)

export async function getNonce(address: string): Promise<number> {
  return await web3.eth.getTransactionCount(address)
}

export async function sendTx(tx: string) {
  return await web3.eth.sendSignedTransaction(tx, (err, transactionHash) => {
    console.log('transactionHash: ', transactionHash)
    if (err) return err

    return transactionHash
  })
}
