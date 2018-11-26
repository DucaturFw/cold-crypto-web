import Home from './components/pages/Home'
import Login from './components/pages/Login'
import Pay from './components/Pay'
import PayToAddress from './components/PayToAddress'
import TxCreation from './components/pages/TxCreation'
import TxView from './components/TxView'
import Wallet from './components/pages/Wallet'
import Wallets from './components/pages/Wallets'
// import Webrtc from './components/Webrtc/WebrtcServer' // Don't need?
import ContractCall from './components/pages/ContractCall'

export const CONTRACT_CALL_PATH = '/contract/:blockchain/:address/call/:contract?'
export const HOME_PATH = '/'
export const LOGIN_PATH = '/login'
export const PAY_ADDRESS_PATH = '/pay/:address'
export const PAY_TO_ADDRESS_PATH = '/paytoaddress/:address'
export const TX_CREATION_PATH = '/txCreation/:blockchain/:address'
export const TX_PATH = '/tx'
export const WALLET_PATH = '/wallet/:blockchain/:address'
export const WALLETS_PATH = '/wallets'

export default [
  { path: CONTRACT_CALL_PATH, component: ContractCall },
  { path: HOME_PATH, exact: true, component: Home },
  { path: LOGIN_PATH, component: Login },
  { path: PAY_ADDRESS_PATH, component: Pay },
  { path: PAY_TO_ADDRESS_PATH, component: PayToAddress },
  { path: TX_CREATION_PATH, component: TxCreation },
  { path: TX_PATH, component: TxView },
  { path: WALLET_PATH, component: Wallet },
  { path: WALLETS_PATH, component: Wallets },
]
