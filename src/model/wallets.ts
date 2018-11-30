export interface IWalletsState {
  item: IWalletEth | IWalletEos
  items: IWalletEth[] | IWalletEos[]
}

export interface IWalletBase {
  blockchain: string
  address: string
  chainId: string | number
  balance?: string
}

export interface IWalletEth extends IWalletBase {
  nonce: number
}

export interface IWalletEos extends IWalletBase {}

export enum WalletsActionType {
  ADD_WALLET,
  REMOVE_WALLET,
}
