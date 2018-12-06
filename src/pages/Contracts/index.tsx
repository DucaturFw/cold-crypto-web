import * as React from 'react'
import { connect } from 'react-redux'
import { IApplicationState } from '../../store'

import { IWalletBase } from '../../store/wallets/types'

import { CallEthContract } from './eth'
import { CallEosContract } from './eos'

interface IPropsFromDispatch {
  wallet: IWalletBase
}

type AllProps = IPropsFromDispatch

class ContractPage extends React.Component<AllProps, {}> {
  render() {
    const { wallet } = this.props

    switch (wallet.blockchain) {
      case 'eth':
        return <CallEthContract />
      case 'eos':
        return <CallEosContract />
    }
    return null
  }
}
const mapStateToProps = ({ wallets }: IApplicationState) => ({
  wallet: wallets.item,
})

export const CallContract = connect(mapStateToProps)(ContractPage)
