import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { createTransaction } from '../../store/transport/actions'
// import {
//   Formik,
//   // FormikProps,
//   // Form,
//   Field,
//   FieldProps,
//   // FieldArray,
//   // ArrayHelpers,
// } from 'formik'
import { FormValues } from '../../store/wallets/types'
import {
  Column,
  Label,
  TextInput,
  ButtonBase,
  Row,
  // Wrap,
  Select,
} from '../../components/atoms'
// import {
//   // getPublicMethodNames,
//   // IAbiEntry,
//   // getArguments,
//   IAbiArgument,
// } from '../../helpers/eth/eth-contracts'
import { TxTypes } from '../../helpers/jsonrps'
import { eos } from '../../helpers/eos'
import { toDictionary, lookUpBase } from '../../helpers/eos-types'
import { formToJson } from '../../helpers/func'

const expand = (type: string, customs: any): any => {
  try {
    return lookUpBase(type, customs)
  } catch (e) {
    console.error('editor err', e)
    return 'error_type_' + type
  }
}

const customTypes = (customs: any, types: any) => {
  const dict = toDictionary(
    customs,
    (x: any) => x.name,
    x => ({
      ...x,
      fields: toDictionary(x.fields, (f: any) => f.name, f => f.type),
    })
  )
  ;(types as any[]).forEach(type => (dict[type.new_type_name] = type.type))

  return dict
}

interface IPropsFromDispatch {
  createTx: typeof createTransaction
}

interface IStateProps {
  address: string
  abi: any
  customs: any
  action: string
}

type AllProps = IPropsFromDispatch

class CreateEosContractPage extends React.Component<AllProps, IStateProps> {
  constructor(props: AllProps) {
    super(props)

    this.state = {
      address: '',
      abi: null,
      customs: null,
      action: '',
    }
  }

  handleChangeAddress = async (e: any) => {
    const value = e.target.value

    this.setState({
      address: value,
    })
  }

  handleSubmit = async (e: any) => {
    e.preventDefault()

    try {
      const abi = await eos.getAbi(this.state.address)
      console.log(abi)

      if (abi) {
        const customs = customTypes(abi.abi.structs, abi.abi.types)

        this.setState({
          abi,
          customs,
        })
      }
    } catch (e) {}
  }

  handleConfirm = (e: any) => {
    e.preventDefault()

    const data = formToJson(e.target)
    console.log(data)
  }

  handleMethodSelect = (e: any) => {
    const value = e.target.value
    this.setState({
      action: value,
    })
  }

  render() {
    return (
      <React.Fragment>
        {!this.state.abi && (
          <form onSubmit={this.handleSubmit}>
            <Column>
              <Row>
                <Column style={{ flexBasis: '100%', marginRight: '0%' }}>
                  <Label>Contract name:</Label>
                  <TextInput
                    type="text"
                    placeholder="Address"
                    onChange={this.handleChangeAddress}
                  />
                </Column>
              </Row>
              <Column
                style={{ width: '30%', marginLeft: '35%', marginTop: '50px' }}
              >
                <ButtonBase type="submit">Continue</ButtonBase>
              </Column>
            </Column>
          </form>
        )}
        {this.state.abi && (
          <form onSubmit={this.handleConfirm}>
            <Row>
              <Column>
                <Label>Contract method:</Label>
                <Select onChange={this.handleMethodSelect} name="method">
                  <option value="">Select method</option>
                  {this.state.abi.abi.actions.map((item: any) => (
                    <option key={item.type} value={item.type}>
                      {item.name}
                    </option>
                  ))}
                </Select>
              </Column>
            </Row>
            {this.state.action &&
              Object.entries(expand(this.state.action, this.state.customs)).map(
                (item: any[]) => {
                  return (
                    <Row key={item[0]}>
                      <Column>
                        <Label>{item[0]}:</Label>
                        <TextInput
                          name={item[0]}
                          type="text"
                          placeholder={item[0]}
                          onChange={this.handleChangeAddress}
                        />
                      </Column>
                    </Row>
                  )
                }
              )}
            <ButtonBase type="submit">Confirm</ButtonBase>
          </form>
        )}
      </React.Fragment>
    )
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => ({
  createTx: (data: FormValues, txType: TxTypes) =>
    dispatch(createTransaction(data, txType)),
})

export const CallEosContract = connect(
  null,
  mapDispatchToProps
)(CreateEosContractPage)
