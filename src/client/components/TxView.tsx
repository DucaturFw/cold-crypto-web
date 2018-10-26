import React from 'react';
import {Column} from '../components/shared/layout'
import { H1 } from './shared/typography'
import { connect} from 'react-redux'

const TxView = ({error, lastTransaction : tx}) => {
  return (
    <Column style={{ width: '45%', marginLeft: '5%' }}>
      <H1>Tx sent result</H1>
      {error
        ? (<p>{error}</p>)
        : (
          <React.Fragment>
            {`From : ${tx.from} To: ${tx.to}, txhash: ${tx.transactionHash}`}
            <a target="_blank" href={`https://rinkeby.etherscan.io/tx/${tx.transactionHash}`}>
              {`https://rinkeby.etherscan.io/tx/${tx.transactionHash}`}
            </a>
          </React.Fragment>
        )
      }   
    </Column>
  )
};

export default connect( (state: any) => state.webrtc)(TxView)