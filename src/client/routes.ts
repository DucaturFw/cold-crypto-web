import Home from './components/pages/Home'
import Login from './components/pages/Login'
import Pay from './components/Pay'
import PayToAddress from './components/PayToAddress'
import TxCreation from './components/pages/TxCreation'
import TxView from './components/TxView'
import Wallet from './components/pages/Wallet'
import Wallets from './components/pages/Wallets'
import Webrtc from './components/Webrtc/WebrtcServer'
import ContractCall from './components/pages/ContractCall'

export default [
  { path: '/', exact: true, component: Home },
  { path: '/login', component: Login },
  { path: '/wallets', component: Wallets },
  { path: '/wallet/:blockchain/:address', component: Wallet },
  { path: '/txCreation/:blockchain/:address', component: TxCreation },
  { path: '/webrtc', component: Webrtc },
  { path: '/tx', component: TxView },
  { path: '/pay/:address', component: Pay },
  { path: '/paytoaddress/:address', component: PayToAddress },
  { path: '/contract/:blockchain/:address/call/:contract?', component: ContractCall },
]
