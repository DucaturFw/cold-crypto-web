import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import styled from 'react-emotion'
import { css } from 'emotion'
import { createTransaction } from '../../store/transport/actions'
import { FormValues } from '../../store/wallets/types'
import {
  H2,
  H3,
  Column,
  Label,
  TextInput,
  ButtonBase,
  Row,
  H1,
  Hr,
  SelectOptions
} from '../../components/atoms'

import { TxTypes } from '../../helpers/jsonrps'
import { eos } from '../../helpers/eos'
import { toDictionary, lookUpBase } from '../../helpers/eos-types'
import { formToJson } from '../../helpers/func'

const Error = styled('div')`
  margin-top: 10px;
  font-weight: bold;
`

const styles = {
  offtop: css`
    margin-top: 25px;
  `,
  select: css`
    padding: 0.8rem 1rem;
  `,
}

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
  error: string
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
      error: '',
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

      if (abi) {
        const customs = customTypes(abi.abi.structs, abi.abi.types)

        this.setState({
          abi,
          customs,
        })
      }
    } catch (e) {
      this.setState({
        error: 'Contract not found',
      })
    }
  }

  handleConfirm = (e: any) => {
    e.preventDefault()

    const data = formToJson(e.target)
    this.props.createTx(
      {
        to: this.state.address,
        method: this.state.action,
        data,
        abi: this.state.customs[this.state.action].fields,
      },
      TxTypes.Contract
    )
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
            <H2>Call Contract EOS</H2>
            <Column>
`             <Row>
                <H1>Call Contract EOS</H1>
              </Row>
              <Hr />`
              <Row>
                <Column style={{ flexBasis: '100%', marginRight: '0%' }}>
                  <TextInput
                    type="text"
                    placeholder="contract name"
                    value={this.state.address}
                    onChange={this.handleChangeAddress}
                  />
                </Column>
              </Row>
              <Row>{this.state.error && <Error>{this.state.error}</Error>}</Row>
              <Column
                style={{ width: '40%', marginLeft: '30%', marginTop: '50px' }}
              >
                <ButtonBase type="submit">Find contract</ButtonBase>
              </Column>
            </Column>
          </form>
        )}
        {this.state.abi && (
          <React.Fragment>
            <H2>Call Contract EOS</H2>
            <H3>{this.state.address}</H3>
            <Row className={styles.offtop}>
              <Column>
                <Label>Contract method:</Label>
                <SelectOptions
                  onChange={this.handleMethodSelect}
                  name="method"
                  className={styles.select}
                >
                  <option value="">Select method</option>
                  {this.state.abi.abi.actions.map((item: any) => (
                    <option key={item.type} value={item.type}>
                      {item.name}
                    </option>
                  ))}
                </SelectOptions>
              </Column>
            </Row>
            <form onSubmit={this.handleConfirm}>
              {this.state.action && (
                <React.Fragment>
                  <H3 className={styles.offtop}>Parameters:</H3>
                  {Object.entries(
                    expand(this.state.action, this.state.customs)
                  ).map((item: any[]) => {
                    return (
                      <Row key={item[0]}>
                        <Column>
                          <Label>{item[0]}:</Label>
                          <TextInput
                            name={item[0]}
                            type="text"
                            placeholder={item[0]}
                          />
                        </Column>
                      </Row>
                    )
                  })}
                </React.Fragment>
              )}
              {this.state.action && (
                <ButtonBase type="submit" className={styles.offtop}>
                  Sign
                </ButtonBase>
              )}
            </form>
          </React.Fragment>
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
