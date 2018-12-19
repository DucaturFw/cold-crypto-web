import { toDictionary, lookUpBase } from './eos-types'

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

export class EosContract {
  public eos: any = null;

  public abi: any = null;
  public custom: any = null;

  constructor(eos: any) {
    this.eos = eos;
  }

  assignContract = async (contractName: string) => {
    const abi = await this.eos.getAbi(contractName)

    if (abi) {
      this.abi = abi
      this.custom = customTypes(this.abi.abi.structs, this.abi.abi.types)

      return contractName
    }

    return null
  }

  getActions = () => {
    return this.abi.abi.actions
  }

  getMethodFields = (method: string) => {
    console.log(expand(method, this.custom))
    return expand(method, this.custom)
  }

  getMethodAbi = (method: string) => {
    return this.custom[method].fields
  }
}