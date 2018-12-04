import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { IApplicationState, IConnectedReduxProps } from '../store'
import { sendTransaction } from '../store/transport/actions'
import { IHostCommand } from '../helpers/webrtc/hostproto'
import { Formik, FormikProps, Form, Field, FieldProps } from 'formik'
import { IEthContractFormValues } from '../store/wallets/types'
import {
  Column,
  Label,
  TextInput,
  ButtonBase,
  Row,
  Wrap,
  Select,
} from '../components/atoms'

interface IPropsFromState {
  signTx: IHostCommand<unknown[], unknown>
}

interface IPropsFromDispatch {
  sendTx: typeof sendTransaction
}

type AllProps = IPropsFromState & IPropsFromDispatch & IConnectedReduxProps

class CreateContractPage extends React.Component<AllProps> {
  state = {}

  handleOnChangeAbi = async (
    e: React.ChangeEvent<HTMLInputElement>,
    form: any
  ) => {
    console.log(form)
    if (!e.target.files) {
      return
    }

    let file = e.target.files[0]
    console.log(file)
    const reader = new FileReader()
    reader.readAsText(file)
    const result = await new Promise(resolve => {
      reader.onload = () => {
        resolve(JSON.parse(reader.result as string))
      }
    })

    form.setFieldValue('abi', result)
  }

  render() {
    return (
      <React.Fragment>
        <Formik
          initialValues={{ to: '', abi: '', method: '', gasPrice: '' }}
          onSubmit={(values: IEthContractFormValues) => console.log(values)}
          render={(formikBag: FormikProps<IEthContractFormValues>) => (
            <Form>
              <Column>
                <Row>
                  <Column style={{ flexBasis: '65%', marginRight: '5%' }}>
                    <Label>Address:</Label>
                    <Field
                      name="to"
                      render={({
                        field,
                        form,
                      }: FieldProps<IEthContractFormValues>) => (
                        <TextInput
                          type="text"
                          placeholder="Address"
                          {...field}
                        />
                      )}
                    />
                  </Column>
                  <Column style={{ flexBasis: '30%' }}>
                    <Label>
                      <small>Select from computer:</small>
                    </Label>
                    <div style={{ flexBasis: '30%', position: 'relative' }}>
                      <ButtonBase>Upload ABI</ButtonBase>
                      <Field
                        name="abi"
                        render={({
                          field,
                          form,
                        }: FieldProps<IEthContractFormValues>) => (
                          <TextInput
                            type="file"
                            name={field.name}
                            onBlur={field.onBlur}
                            onChange={e => this.handleOnChangeAbi(e, form)}
                            style={{
                              position: 'absolute',
                              left: 0,
                              top: 0,
                              opacity: 0,
                            }}
                          />
                        )}
                      />
                    </div>
                    <Wrap vertical={1} />
                  </Column>
                </Row>
                <Row>
                  <Column>
                    <Label>Method:</Label>
                    <Field
                      name="method"
                      render={({
                        field,
                        form,
                      }: FieldProps<IEthContractFormValues>) => (
                        <Select defaultValue="" {...field}>
                          <option key={0} value="test">
                            test
                          </option>
                          )
                        </Select>
                      )}
                    />
                    <Wrap vertical={1} />
                    <Label>Parameters:</Label>
                  </Column>
                  <Column>
                    <Wrap horizontal={2}>
                      <Label>Estimated GAS: WAAAAAT</Label>
                      <Wrap vertical={1} />
                      <Label>GAS price: WAAAAAt GWEI</Label>
                      <Field
                        name="gasPrice"
                        render={({
                          field,
                          form,
                        }: FieldProps<IEthContractFormValues>) => (
                          <TextInput
                            type="range"
                            placeholder="Address"
                            {...field}
                            min="1"
                            max="7"
                          />
                        )}
                      />
                    </Wrap>
                  </Column>
                </Row>
                <ButtonBase type="submit">Continue</ButtonBase>
              </Column>
            </Form>
          )}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ wallets }: IApplicationState) => ({
  signTx: wallets.sendingTxData.signTx!,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  sendTx: (data: string) => dispatch(sendTransaction(data)),
})

export const CreateContract = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateContractPage)
