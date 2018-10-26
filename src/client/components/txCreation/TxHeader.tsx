import React, { Fragment } from 'react'

import { H1, H2 } from '../shared/typography'

export default ({ params, children }) => (
  <Fragment>
    <H1>{ children } <strong>{ params.blockchain.toUpperCase() }</strong></H1>
    <H2>{ params.address }</H2>
  </Fragment>
)
