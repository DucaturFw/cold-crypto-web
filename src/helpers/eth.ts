import callApi from './../utils/callApi'
import Web3 from 'web3'
const web3 = new Web3()

const API_ENDPOINT =
  process.env.REACT_APP_API_ENDPOINT || 'https://api-rinkeby.etherscan.io'

web3.setProvider(
  new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws')
)

export async function getNonce(address: string): Promise<number> {
  return web3.eth.getTransactionCount(address)
}

export async function sendTx(tx: string): Promise<string> {
  const result = await web3.eth.sendSignedTransaction(tx)
   
  return result.transactionHash
}

export async function getTx(address: string) {
  return callApi(
    'get',
    API_ENDPOINT,
    `/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=YourApiKeyToken`
  )
}

export async function getInfo(address: string) {
  const res = await getTx(address)
  const nonce = await getNonce(address)

  return {
    txs: res.result,
    nonce,
  }
}
