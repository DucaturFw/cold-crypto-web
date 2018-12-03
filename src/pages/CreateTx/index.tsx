import * as React from 'react'
import { connect } from 'react-redux'

import { IApplicationState } from '../../store'
import { IWallet } from '../../store/wallets/types'
import { CreateEthTx } from './eth'
import { CreateEosTx } from './eos'

interface IPropsFromState {
  wallet: IWallet
}

const CreateTxPage: React.SFC<IPropsFromState> = ({ wallet }) => {
  return (
    <React.Fragment>
      {wallet.blockchain === 'eth' && <CreateEthTx />}
      {wallet.blockchain === 'eos' && <CreateEosTx />}
    </React.Fragment>
  )
}

const mapStateToProps = ({ wallets }: IApplicationState) => ({
  wallet: wallets.item,
})

export const CreateTx = connect(
  mapStateToProps,
  null
)(CreateTxPage)
