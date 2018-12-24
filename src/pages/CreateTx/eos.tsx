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
import { priceGet } from '../../store/price/actions'
import styled from 'react-emotion'

interface IPropsFromState {
  wallet: IWallet
  price: number
}

interface IPropsFromDispatch {
  createTx: typeof createEosTransfer
  priceGet: typeof priceGet
}

type AllProps = IPropsFromState & IPropsFromDispatch

class CreateTxPage extends React.Component<AllProps, {}> {
  componentDidMount() {
    this.props.priceGet()
  }

  updatePrice = async (e: React.ChangeEvent<HTMLInputElement>, form: any) => {
    const { name, value } = e.target

    form.setFieldValue(name, value)
    if (name === 'amount') {
      form.setFieldValue('price', parseFloat(value) * this.props.price)
    } else {
      form.setFieldValue('amount', parseFloat(value) / this.props.price)
    }
  }

  render() {
    const { wallet, createTx } = this.props
    return (
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
                              name="amount"
                              step={(1e-4).toFixed(4)}
                              value={field.value}
                              onChange={e => this.updatePrice(e, form)}
                            />
                          )}
                        />
                      </LabelAtop>
                      <img src="/icon-change.svg" />
                      <LabelAtop label="usd">
                        <Field
                          name="price"
                          render={({
                            field,
                            form,
                          }: FieldProps<IEosTxFormValues>) => (
                            <TextInput
                              type="number"
                              name="price"
                              step={(1e-4).toFixed(4)}
                              value={field.value}
                              onChange={e => this.updatePrice(e, form)}
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
                      render={({
                        field,
                        form,
                      }: FieldProps<IEosTxFormValues>) => (
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
  }
}

const mapStateToProps = ({ wallets, price }: IApplicationState) => ({
  wallet: wallets.item,
  price: price.eos,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  createTx: (data: IEosTxFormValues) => dispatch(createEosTransfer(data)),
  priceGet: () => dispatch(priceGet()),
})

export const CreateEosTx = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTxPage as any)

const RowMargined = styled(Row)({
  margin: '1rem 0',
})
