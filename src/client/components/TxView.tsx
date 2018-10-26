import React from 'react';
import {Column} from './layout'
import { H1 } from './shared/typography'
import { connect} from 'react-redux'

const Success = ({error, lastTransaction : tx}) => {
  return (
    <Column style={{ width: '45%', marginLeft: '5%' }}>
      <H1>Tx sent result</H1>
      {error
        ? (<p>{error}</p>)
        : (
          <React.Fragment>
            {`From: ${tx.from}, to: ${tx.to}, txhash: ${tx.hash}`}
            <a target="_blank" href={`https://rinkeby.etherscan.io/tx/${tx.hash}`}>
              {`https://rinkeby.etherscan.io/tx/${tx.hash}`}
            </a>
          </React.Fragment>
        )
      }   
    </Column>
  )
};

export default connect( (state: any) => state.webrtc)(Success)