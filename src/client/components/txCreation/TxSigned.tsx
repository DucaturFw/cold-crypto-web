import React from 'react'
import { withSignPush } from './index'

const TxSigned = ({ values }) => (
  <div>Signed {JSON.stringify(values)}</div>
)

export default withSignPush(TxSigned)
