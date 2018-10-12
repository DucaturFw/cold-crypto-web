import React, { Fragment } from 'react'

export default ({ params, children }) => (
  <Fragment>
    <h2>{ params.blockchain }</h2>
    <h1>{ children } { params.address }</h1>
  </Fragment>
)
