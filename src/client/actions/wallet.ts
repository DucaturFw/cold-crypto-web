import { IAction, ActionType, IWallet } from '../model'
import { navigate } from 'fuse-react'

// export function addWallet(wallet: IWallet): IAction<IWallet> {
//   return {
//     type: ActionType.ADD_Wallet,
//     payload: wallet
//   };
// }

export function addWallet(wallet: IWallet[]) {
  // here you could do API eg

  return (dispatch: Function, getState: Function) => {
    dispatch({ type: ActionType.ADD_Wallet, payload: wallet })
    console.log('Action add wallet ', typeof wallet)
    if (wallet.length > 0)
      navigate('/')
  }
}
