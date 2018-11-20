import React from 'react'
import { connect } from 'react-redux'
import { Form } from 'react-powerplug'
import { compose } from 'recompact'
import { withRouter } from 'react-router'

import { scanWallets } from '../../actions'

import ModalLayout from '../layouts/Modal'
import H2 from '../atoms/H2'
import H3 from '../atoms/H3'
import Hr from '../atoms/Hr'
import ButtonClose from '../atoms/ButtonClose'
import Row from '../atoms/Row'
import Column from '../atoms/Column'
import Label from '../atoms/Label'
import LabelAtop from '../atoms/LabelAtop'
import TextInput from '../atoms/TextInput'
import ButtonBase from '../atoms/ButtonBase'
import Select from '../atoms/Select'
import Wrap from '../atoms/Wrap'

export interface IProps {
  match: {
    params: {
      address: string,
      blockchain: string,
      contract: string,
    },
  },
  address: string,
}

const ContractCall = (props: IProps) => (
  <ModalLayout>
    <Row>
      <Column>
        <H2>Call Contract {props.match.params.blockchain.toUpperCase()}</H2>
        <H3><small>{props.match.params.address}</small></H3>
      </Column>
      <ButtonClose />
    </Row>
    <Hr/>
    <Row>
      <Form initial={{
        address: props.address,
        gasPrice: '0',
        method: 'Initial',
        parameters: '',
        to: props.match.params.contract,
      }}>
        {({ field, values }) => (
          <Column>
            <Row>
              <Column style={{ flexBasis: '65%', marginRight: '5%' }}>
                <Label>Address:</Label>
                <TextInput
                  {...field('to').bind as any} />
              </Column>
              <Column style={{ flexBasis: '30%' }}>
                <Label><small>Select from computer:</small></Label>
                <ButtonBase>Upload ABI</ButtonBase>
                <Wrap vertical={1} />
              </Column>
            </Row>
            <Row>
              <Column>
                <Label>Method:</Label>
                <Select
                  options={[ 'First', 'Second' ]}
                  // value='First'
                  {...field('method').bind as any} />
                <Wrap vertical={1} />
                <Label>Parameters:</Label>
                <LabelAtop label='owner'>
                  <TextInput {...field('parameters').bind as any} />
                </LabelAtop>
                <LabelAtop label='owner'>
                  <TextInput {...field('parameters').bind as any} />
                </LabelAtop>
                <LabelAtop label='value'>
                  <TextInput {...field('parameters').bind as any} />
                </LabelAtop>
              </Column>
              <Column>
                <Wrap horizontal={2} >
                  <Label>Estimated GAS: 3200</Label>
                  <Wrap vertical={1} />
                  <Label>GAS price: 4 GWEI</Label>
                  <TextInput type='range' {...field('gasPrice').bind as any} min='1' max='7' />
                </Wrap>
              </Column>
            </Row>
            <Row style={{ justifyContent: 'flex-end' }}>
              <Wrap style={{ alignSelf: 'flex-end' }}>
                <ButtonBase style={{ width: '13rem' }}>Sign</ButtonBase>
              </Wrap>
            </Row>
          </Column>
        )}
      </Form>
    </Row>
  </ModalLayout>
)

const withConnect = connect(null, { scanWallets })

export default compose(withConnect, withRouter)(ContractCall)
