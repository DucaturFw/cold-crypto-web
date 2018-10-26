import React from 'react'
import { Column, Container, Centered, Header } from '../components/shared/layout'
import { H1 } from './shared/typography'
import { connect} from 'react-redux'

const TxView = ({error, lastTransaction : tx}) => {
  return (
    <>
      <Header to='/' />
      <Container>
        <Centered>
          <Column>
            <H1>Tx sent result</H1>
            {error
              ? (<p>{error}</p>)
              : (
                <>
                  {`From : ${tx.from} To: ${tx.to}, txhash: ${tx.transactionHash}`}
                  <a target='_blank' href={`https://rinkeby.etherscan.io/tx/${tx.transactionHash}`}>
                    {`https://rinkeby.etherscan.io/tx/${tx.transactionHash}`}
                  </a>
                </>
              )
            }
          </Column>
        </Centered>
      </Container>
    </>
  )
}

export default connect( (state: any) => state.webrtc)(TxView)
