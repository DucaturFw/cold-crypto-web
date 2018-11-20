import React from 'react'
import { connect } from 'react-redux'

import ModalLayout from '../layouts/Modal'
import Column from '../atoms/Column'
import Row from '../atoms/Row'
import H2 from '../atoms/H2'
import H3 from '../atoms/H3'
import Hr from '../atoms/Hr'
import ButtonClose from '../atoms/ButtonClose'

import { setScanResult } from '../../actions'
import { IState } from '../../reducers'

interface IProps {
  error: Error
}

const TxCreationError = ({ error }: IProps) =>
  <ModalLayout>
    <Row>
      <Column>
        <H2>Sign Transaction Error</H2>
      </Column>
      <ButtonClose />
    </Row>
    <Hr/>
    <Row>
      <H3 style={{ maxWidth: '30rem' }}>
        { error ? error.message : 'Unknown error' }
      </H3>
    </Row>
  </ModalLayout>

const mapStateToProps = ({ errors: { transactionError } }: IState) => ({ error: transactionError })

const withConnect = connect(mapStateToProps, { setScanResult })

export default withConnect(TxCreationError)
