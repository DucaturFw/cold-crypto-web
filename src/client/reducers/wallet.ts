import { ActionType, IAction, IWallet } from "../model";
import createReducer from "./createReducer";

export const WalletList = createReducer([], {
  [ActionType.ADD_Wallet](state: IWallet[], action: IAction<IWallet>) {
    console.log(action, "Action test");
    return action.payload;
  }
});
