import React from 'react'
import { connect } from 'react-redux'
import { Form } from 'react-powerplug'
import { compose } from 'recompact'
import { withRouter } from 'react-router'
import Web3 = require('web3');

import { signContractRequest } from '../../actions'
import { getPublicMethodNames,getArguments } from '../../helpers/eth-contracts'
 
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
import { IState } from '../../reducers';
import { IWallet } from '../../reducers/walletReducer';

export interface IProps {
  match: {
    params: {
      address: string,
      blockchain: string,
      contract: string,
    },
  },
  wallets: IWallet[],
  signContractRequest: ({data: IContractSignFormData, wallet: IWallet}) => void,
}
// type IViewArgType = 'string' | 'bytes' | 'uint' | 'fixed' | 'ufixed' | 'int' | 'function' | 'address' | 'bool'
// const abiToView = (abiType: IAbiArgumentType):{ type: IViewArgType, size?: string } =>
// {
//   let prefixes = ['uint', 'int', 'fixed', 'ufixed', 'bytes'] as IViewArgType[]
//   for (let i = 0; i < prefixes.length; i++)
//   {
//     const prefix = prefixes[i]
//     if (abiType.startsWith(prefix))
//       return { type: prefix, size: abiType.replace(prefix, '') }
//   }
//   return { type: abiType as IViewArgType }
// }

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
        gasPrice: '1',
        gasLimit: '300000',
        method: '',
        amount: '0',
        parameters: '',
        to: '',
        abi: null,
        arg0: '',
        arg1: '',
        arg2: '',
        arg3: '',
        arg4: '',
      }}
      >
        {({ field, values }) => {
          const isAddressValid = Web3.utils.isAddress(values.to)
          
          const handleUploadAbi = async (e) => {
            const file = e.target.files[0]
            
            const reader = new FileReader();
            reader.readAsText(file);
            const result = await new Promise((resolve, reject) => {
              reader.onload = function(event) {

              resolve(JSON.parse(reader.result as string))
              }
            })

            field('abi').bind.onChange(result)
          }
        
          return (
            <form 
              style={{width: '100%'}}
              onSubmit={(e) => {
                e.preventDefault()

                const contractValues = {
                  to: values.to,
                  amount: 0,
                  gasPrice: values.gasPrice,
                  gasLimit: values.gasLimit,
                  abi: values.abi,
                  method: values.method,
                  args: getArguments(values.abi, values.method).map((i, index) => values[`arg${index}`])
                }

                props.signContractRequest({ data: contractValues, wallet: props.wallets.find((w: IWallet) => w.address === props.match.params.address),})
              }
            }>
              <Column>
                <Row>
                  <Column style={{ flexBasis: '65%', marginRight: '5%' }}>
                    <Label>Address:</Label>
                    <TextInput
                      {...field('to').bind as any} />
                  </Column>
                <Column style={{ flexBasis: '30%' }}>
                  {isAddressValid && <><Label><small>Select from computer:</small></Label>
                    <div style={{flexBasis: '30%', position: 'relative' }}>
                      <ButtonBase>Upload ABI</ButtonBase>
                      <TextInput type="file" onChange={handleUploadAbi} style={{ position: 'absolute', left: 0, top: 0, opacity: 0}}></TextInput>
                    </div>
                    <Wrap vertical={1} /> </>}
                  </Column>
                </Row>
                <Row>
                  <Column>
                    {values.abi && <>
                      <Label>Method:</Label>
                      <Select defaultValue="" {...field('method').bind as any}>
                        {getPublicMethodNames(values.abi).map(item => <option key={item} value={item}>{item}</option>)}
                      </Select>
                    
                    <Wrap vertical={1} />
                    <Label>Parameters:</Label>
                    {values.method && getArguments(values.abi, values.method).map((item, index) => 
                      <LabelAtop label={item.name}>
                        <TextInput  {...field(`arg${index}` as 'arg1').bind as any} />
                      </LabelAtop>
                      )}
                    </>}
                  </Column>
                  {values.method && <Column>
                    <Wrap horizontal={2} >
                      <Label>Estimated GAS: {values.gasLimit}</Label>
                      <Wrap vertical={1} />
                      <Label>GAS price: {values.gasPrice} GWEI</Label>
                      <TextInput type='range' {...field('gasPrice').bind as any} min='1' max='7' />
                    </Wrap>
                  </Column>}
                </Row>
                { values.method && (values[`arg${getArguments(values.abi, values.method).length - 1 }`] || getArguments(values.abi, values.method).length === 0 )&& <Row style={{ justifyContent: 'flex-end' }}>
                  <Wrap style={{ alignSelf: 'flex-end' }}>
                    <ButtonBase type="submit" style={{ width: '13rem' }}>Sign</ButtonBase>
                  </Wrap>
                </Row>}
              </Column>
            </form>
        )}}
      </Form>
    </Row>
  </ModalLayout>
)

const withConnect = connect(({ wallet, blockchains }: IState) =>
  ({ wallets: wallet.wallets, blockchains }), { signContractRequest })

export default compose(withConnect, withRouter)(ContractCall)

