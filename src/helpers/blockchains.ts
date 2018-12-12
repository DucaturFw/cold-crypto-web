export interface INetwork {
  name: string
  sign: string
  url: string
  btc?: any
  explorerUrl: string
  apiExplorerUrl: string
  chainId?: string | number
}

export const getBcNetBySign = (bc: string, net: string): INetwork => networks[bc].network.find((item: INetwork) => item.sign === net);
export const getBcNetByChainId = (bc: string, chainId: string): INetwork => networks[bc].network.find((item: INetwork) => item.chainId === chainId);

const networks = {
  eth: {
    name: 'Ethereum',
    network: [
      {
        name: 'Mainnet',
        sign: 'mainnet',
        url: 'wss://mainnet.infura.io/ws',
        explorerUrl: 'https://etherscan.io/',
        apiExplorerUrl: 'https://api.etherscan.io',
        chainId: '1'
      },
      {
        name: 'Ropsten',
        sign: 'ropsten',
        url: 'wss://ropsten.infura.io/ws',
        explorerUrl: 'https://ropsten.etherscan.io/',
        apiExplorerUrl: 'https://api-ropsten.etherscan.io',
        chainId: '3'
      },
      {
        name: 'Rinkeby',
        sign: 'rinkeby',
        url: 'wss://rinkeby.infura.io/ws',
        explorerUrl: 'https://rinkeby.etherscan.io/',
        apiExplorerUrl: 'https://api-rinkeby.etherscan.io',
        chainId: '4'
      }
    ]
  },
  eos: {
    name: 'EOS',
    network: [
      {
        name: 'Mainnet',
        sign: 'mainnet',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        url: 'http://mainnet.eoscalgary.io:80',
        explorerUrl: 'https://eospark.com/MainNet/'
      },
      {
        name: 'Jungle Testnet',
        sign: 'testnet',
        chainId: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca',
        url: 'http://jungle.eosgen.io:80',
        explorerUrl: 'https://eospark.com/Jungle/'
      }
    ]
  },
}

export default networks;