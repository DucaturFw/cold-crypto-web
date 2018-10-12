import React from 'react'
import { navigate } from 'fuse-react'
import { FormRender } from 'react-powerplug'

import { Column, Row } from '../layout'
import { Props } from './TxContainer'

interface TxFormProps extends Props {
  values: {
    [key: string]: string
  },
  input: any
}

const TxForm = ({ match, blockChainPrice, blockChainData, values, input }: TxFormProps) => (
  <form onSubmit={e => e.preventDefault() || navigate('/txCreation/eth/sign')}>
    <Column>
      <input placeholder={match.params.address} {...input('to').bind} />
      <Row>
        <input required={true} placeholder='Amount' {...input('amount').bind} />
        <span>~{(Number(values.amount) * Number(blockChainPrice)).toFixed(2)}$</span>
      </Row>
      <Row>
        <span>Gas price</span>
        <input type='range' {...input('gasPrice').bind} min='1' max='100' />
        <span> {`< ${(Number(blockChainData ? blockChainData.avgWait : 1) * Number(values.gasPrice)).toFixed(2)} min`}</span>
      </Row>
      <button type='submit'>Sign</button>
    </Column>
  </form>
)

export default TxForm