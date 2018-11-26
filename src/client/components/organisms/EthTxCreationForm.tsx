import React from 'react'
import { Form } from 'react-powerplug'
import styled from 'react-emotion'
import web3 from 'web3'

import TextInput from '../atoms/TextInput'
import TextArea from '../atoms/TextArea'
import Label from '../atoms/Label'
import LabelAtop from '../atoms/LabelAtop'
import Column from '../atoms/Column'
import Row from '../atoms/Row'
import ButtonBase from '../atoms/ButtonBase'
import LoaderContent from '../moleculas/LoaderContent'

interface IFormData {
  to: string
  amount: string
  gasPrice: string
  data: string
}

interface IProps {
  onSubmit: (data: IFormData) => void
  avgWait: number
  blockchain: string
  blockchainPrice: string
}

const RowMargined = styled(Row)({
  margin: '1rem 0',
})

export default ({ onSubmit, avgWait, blockchain, blockchainPrice }: IProps) => (
  <Form initial={{ to: '', amount: '0', gasPrice: '0', data: '' }} >
    {({ field, values }) => {
      // TODO: Move it to redux
      const totalPrice = (Number(values.amount) * Number(blockchainPrice)).toFixed(2)
      const gweiPromPrice = web3.utils.fromWei(values.gasPrice.toString(), 'gwei')
      const gweiPrice = (Number(gweiPromPrice) * 21000 * Number(blockchainPrice)).toFixed(3)
      const awaitTime = (avgWait * Number(values.gasPrice)).toFixed(2)

      return (
        <form onSubmit={(e) => {
          e.preventDefault()
          onSubmit(values)
        }}>
          <Column>
            <Label>To:</Label>
            <TextInput {...field('to').bind as any} />
            <RowMargined>
              <Column>
                <Label>Enter amount:</Label>
                <Row>
                  <LabelAtop label={blockchain}>
                    <TextInput
                      type='number'
                      min='0'
                      step={1e-18.toFixed(20)}
                      { ...field('amount').bind as any }
                    />
                  </LabelAtop>
                  <LabelAtop label='usd'>
                    <TextInput
                      type='number'
                      min='0'
                      step={1e-18.toFixed(20)}
                      value={totalPrice}
                      onChange={({ target: { value } }) => {
                        field('amount').set(Number(value).toFixed(4))
                      }}
                    />
                  </LabelAtop>
                </Row>
              </Column>
            </RowMargined>
            <RowMargined>
              <Column>
                <Label>Description:</Label>
                <TextArea type='text' {...field('data').bind as any} />
              </Column>
            </RowMargined>
            <LoaderContent>
              <RowMargined>
                <Column>
                  <Label>Gas price {values.gasPrice} GWEI</Label>
                  <TextInput type='range' {...field('gasPrice').bind as any} min='1' max='7' />
                  <Row>
                    <span>${gweiPrice}</span>
                    <span> {`< ${awaitTime} min`}</span>
                  </Row>
                </Column>
              </RowMargined>
              <ButtonBase type='submit'>Continue</ButtonBase>
            </LoaderContent>
          </Column>
        </form>
      )
    }}
  </Form>
)
