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
import { IWallet, IEosTxFormValues } from '../../store/wallets/types'
import { createEosTransfer } from '../../store/transport/actions'
import styled from 'react-emotion'

interface IPropsFromState {
  wallet: IWallet
}

interface IPropsFromDispatch {
  createTx: typeof createEosTransfer
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
      initialValues={{ to: '', memo: '', amount: 0 }}
      onSubmit={(values: IEosTxFormValues) => createTx(values)}
      render={(formikBag: FormikProps<IEosTxFormValues>) => (
        <Form>
          <Column>
            <Label>To:</Label>
            <Field
              name="to"
              render={({ field, form }: FieldProps<IEosTxFormValues>) => (
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
                      }: FieldProps<IEosTxFormValues>) => (
                        <TextInput
                          type="number"
                          min="0"
                          step={(1e-4).toFixed(4)}
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
                      }: FieldProps<IEosTxFormValues>) => (
                        <TextInput
                          type="number"
                          readOnly
                          step={(1e-4).toFixed(4)}
                          value={field.value * 1.69}
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
                  name="memo"
                  render={({ field, form }: FieldProps<IEosTxFormValues>) => (
                    <TextArea {...field} />
                  )}
                />
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
  createTx: (data: IEosTxFormValues) => dispatch(createEosTransfer(data)),
})

export const CreateEosTx = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTxPage as any)

const RowMargined = styled(Row)({
  margin: '1rem 0',
})
