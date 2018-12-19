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
  RangeInput,
} from '../../components/atoms'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { IApplicationState } from '../../store'
import { IWallet, IEthTxFormValues } from '../../store/wallets/types'
import { createEthTransfer } from '../../store/transport/actions'
import { priceGet } from '../../store/price/actions'
import styled from 'react-emotion'

interface IPropsFromState {
  wallet: IWallet
  price: number
}

interface IPropsFromDispatch {
  createTx: typeof createEthTransfer
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
                              name="amount"
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
                          }: FieldProps<IEthTxFormValues>) => (
                            <TextInput
                              type="number"
                              name="price"
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
                      name="data"
                      render={({
                        field,
                        form,
                      }: FieldProps<IEthTxFormValues>) => (
                        <TextArea {...field} />
                      )}
                    />
                  </Column>
                </RowMargined>
                <RowMargined>
                  <Column>
                    <Field
                      name="gasPrice"
                      render={({
                        field,
                        form,
                      }: FieldProps<IEthTxFormValues>) => (
                        <React.Fragment>
                          <Label>Gas price {field.value} GWEI</Label>
                          <RangeInput type="range" min="1" max="7" {...field} />
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
  }
}

const mapStateToProps = ({ wallets, price }: IApplicationState) => ({
  wallet: wallets.item,
  price: price.eth,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  createTx: (data: IEthTxFormValues) => dispatch(createEthTransfer(data)),
  priceGet: () => dispatch(priceGet()),
})

export const CreateEthTx = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTxPage)

const RowMargined = styled(Row)({
  margin: '1rem 0',
})
