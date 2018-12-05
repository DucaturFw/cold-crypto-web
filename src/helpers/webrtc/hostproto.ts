import { Id } from './jsonrpc'

export interface IHostCommand<
  TArr extends TObj[keyof TObj][] | unknown[],
  TObj
> {
  method: string
  id: Id
  params: TArr | TObj
}
export type IHostCommandU = IHostCommand<unknown[], unknown>
export interface IHostError {
  id?: Id
  error: unknown
}
export interface IHostResult<T> {
  id: Id
  result: T
}
export type IJsonRpcMessage =
  | IHostCommandU
  | IHostResult<unknown>
  | IHostError

export type IHCSimple<
  T1 = unknown,
  T2 = unknown,
  T3 = unknown,
  T4 = unknown,
  T5 = unknown,
  T6 = unknown,
  T7 = unknown
> = IHostCommand<
  [
    T1[keyof T1],
    T2[keyof T2],
    T3[keyof T3],
    T4[keyof T4],
    T5[keyof T5],
    T6[keyof T6],
    T7[keyof T7]
  ],
  T1 & T2 & T3 & T4 & T5 & T6 & T7
>

export function isMethodCall(json: IJsonRpcMessage): json is IHostCommandU
{
  return "method" in json
}
export function isResult(json: IJsonRpcMessage): json is IHostResult<unknown>
{
  return "result" in json
}
export function isError(json: IJsonRpcMessage): json is IHostError
{
  return "error" in json
}

export function parseHostMessage(msg: string): IJsonRpcMessage | undefined {
  if (!msg) return undefined // empty message

  if (msg.startsWith('{')) return JSON.parse(msg)

  let regex = /^.*|.*|.*$/

  if (!regex.test(msg)) return undefined // not enough data to parse

  let [method, _id, data] = msg.split('|', 3).map(x => x || '')

  let prefixLength = method.length + _id.length + data.length + 2
  if (msg.length > prefixLength) data += msg.substr(prefixLength)

  let id = _id.match(/^\d+/) ? parseInt(_id) : _id

  let params = JSON.parse(data || '[]')

  if (!method)
    return {
      id,
      result: params,
    }

  return {
    method,
    id,
    params,
  }
}
export function arrayToObj<TArr extends any[], TObj>(
  args: TArr,
  mapping: (keyof TObj)[]
): TObj {
  return args.reduce((acc, cur, idx) => ((acc[mapping[idx]] = cur), acc), {})
}
export function objToArray<TArr extends TObj[keyof TObj][], TObj extends {}>(
  args: TObj,
  mapping: (keyof TObj)[]
): TArr {
  return mapping.map(name => args[name]) as TArr
}
export function allToObj<TObj>(
  msg: IHostCommand<TObj[keyof TObj][], TObj>,
  mapping: (keyof TObj)[]
): TObj {
  return Array.isArray(msg.params)
    ? arrayToObj(msg.params, mapping)
    : msg.params
}
export function allToArray<TArr extends TObj[keyof TObj][], TObj>(
  msg: IHostCommand<TArr, TObj>,
  mapping: (keyof TObj)[]
): TArr {
  return Array.isArray(msg.params)
    ? msg.params
    : objToArray(msg.params, mapping)
}
