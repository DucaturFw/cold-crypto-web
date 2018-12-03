import * as React from 'react'
import { Formik, FormikProps, Form, Field, FieldProps } from 'formik'
import {
  Row,
  H1,
  Hr,
  ButtonClose,
  Column,
  Label,
  TextInput,
  LabelAtop,
  TextArea,
  ButtonBase,
} from '../../components/atoms'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { IApplicationState } from '../../store'
import { IWallet, IEthTxFormValues } from '../../store/wallets/types'
import { createTransaction } from '../../store/transport/actions'

import styled from 'react-emotion'

interface IPropsFromState {
  wallet: IWallet
}

interface IPropsFromDispatch {
  createTx: typeof createTransaction
}

type AllProps = IPropsFromState & IPropsFromDispatch

const CreateTxPage: React.SFC<AllProps> = ({ wallet, createTx }) => (
  <React.Fragment>
    <Row>
      <H1>Send {wallet.blockchain}</H1>
      <ButtonClose />
    </Row>
    <Hr />
    <Formik
      initialValues={{ to: '', gasPrice: 3, data: '', amount: 0 }}
      onSubmit={(values: IEthTxFormValues) => createTx(values)}
      render={(formikBag: FormikProps<IEthTxFormValues>) => (
        <Form>
          <Column>
            <Label>To:</Label>
            <Field
              name="to"
              render={({ field, form }: FieldProps<IEthTxFormValues>) => (
                <TextInput type="text" placeholder="Address" {...field} />
              )}
            />
            <RowMargined>
              <Column>
                <Label>Enter amount:</Label>
                <Row>
                  <LabelAtop label={wallet.blockchain}>
                    <Field
                      name="amount"
                      render={({
                        field,
                        form,
                      }: FieldProps<IEthTxFormValues>) => (
                        <TextInput
                          type="number"
                          min="0"
                          step={(1e-18).toFixed(20)}
                          {...field}
                        />
                      )}
                    />
                  </LabelAtop>
                  <LabelAtop label="usd">
                    <Field
                      name="amount"
                      render={({
                        field,
                        form,
                      }: FieldProps<IEthTxFormValues>) => (
                        <TextInput
                          type="number"
                          readOnly
                          step={(1e-18).toFixed(20)}
                          value={field.value}
                          // TODO: add totalPrice
                          // value={totalPrice}
                        />
                      )}
                    />
                  </LabelAtop>
                </Row>
              </Column>
            </RowMargined>
            <RowMargined>
              <Column>
                <Label>Description:</Label>
                <Field
                  name="data"
                  render={({ field, form }: FieldProps<IEthTxFormValues>) => (
                    <TextArea {...field} />
                  )}
                />
              </Column>
            </RowMargined>
            <RowMargined>
              <Column>
                <Field
                  name="gasPrice"
                  render={({ field, form }: FieldProps<IEthTxFormValues>) => (
                    <React.Fragment>
                      <Label>Gas price {field.value} GWEI</Label>
                      <TextInput type="range" min="1" max="7" {...field} />
                    </React.Fragment>
                  )}
                />
                <Row>
                  {/* // TODO: Calca gasprice and await time */}
                  <span>gweiPrice</span>
                  <span> {`< awaitTime min`}</span>
                </Row>
              </Column>
            </RowMargined>
            <ButtonBase type="submit">Continue</ButtonBase>
          </Column>
        </Form>
      )}
    />
  </React.Fragment>
)

const mapStateToProps = ({ wallets }: IApplicationState) => ({
  wallet: wallets.item,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  createTx: (data: IEthTxFormValues) => dispatch(createTransaction(data)),
})

export const CreateEthTx = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTxPage)

const RowMargined = styled(Row)({
  margin: '1rem 0',
})
