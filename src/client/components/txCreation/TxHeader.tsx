import React, { Fragment } from 'react'

import { H1, H2 } from '../shared/typography'

export default ({ params, children }) => (
  <Fragment>
    <H2>{ params.blockchain }</H2>
    <H1>{ children } { params.address }</H1>
  </Fragment>
)
