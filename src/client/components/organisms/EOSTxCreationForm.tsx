import React from 'react'
import { Form } from 'react-powerplug'
import styled from 'react-emotion'

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
  data: string
}

interface IProps {
  onSubmit: (data: IFormData) => void
  blockchain: string
  blockchainPrice: string
}

const RowMargined = styled(Row)({
  margin: '1rem 0',
})

export default ({ onSubmit, blockchain, blockchainPrice }: IProps) => (
  <Form initial={{ to: '', amount: '0', data: '' }} >
    {({ field, values }) => {
      // TODO: Move it to redux
      const totalPrice = (Number(values.amount) * Number(blockchainPrice)).toFixed(2)

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
                      { ...field('amount').bind as any }
                    />
                  </LabelAtop>
                  <LabelAtop label='usd'>
                    <TextInput
                      value={totalPrice}
                      onChange={({ target: { value } }) => {
                        // field('amount').set((Number(blockchainPrice) / Number(value)).toFixed(2))
                      }}
                    />
                  </LabelAtop>
                </Row>
              </Column>
            </RowMargined>
            <RowMargined>
              <Column>
                <Label>Memo:</Label>
                <TextArea type='text' {...field('data').bind as any} />
              </Column>
            </RowMargined>
            <LoaderContent>
              <ButtonBase type='submit'>Continue</ButtonBase>
            </LoaderContent>
          </Column>
        </form>
      )
    }}
  </Form>
)
