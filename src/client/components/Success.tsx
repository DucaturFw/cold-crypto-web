import React from 'react';
import { log } from 'util';
import {Column} from './layout'
import { H1, H2 } from './shared/typography'

const Success = ({params: {id}}) => {
  return (
    <Column style={{ width: '45%', marginLeft: '5%' }}>
          <H1>Tx sent </H1>
          {`txhash: 0x${id}`}
        </Column>
  )
};

export default Success;