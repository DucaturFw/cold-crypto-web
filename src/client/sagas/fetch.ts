import { call, race } from 'redux-saga/effects'
import { delay } from 'redux-saga'

interface IFetchOptions {
  body?: any
  method?: string
  authToken?: string
}

const makeFetchOptions = ({ body, method, authToken }: IFetchOptions = {}): RequestInit => ({
  body: body ? JSON.stringify(body) : null,
  credentials: 'same-origin',
  headers: {
    Authorization: authToken ? `Basic ${authToken}` : null,
    'Content-Type': 'application/json; charset=utf-8',
  },
  method: method || 'GET',
})

export default function* fetchJson(url: string, options?: IFetchOptions): IterableIterator<[ unknown?, Error? ]> {
  try {
    const [ res, timeout ] = yield race([
      call(window.fetch, url, makeFetchOptions(options)),
      delay(10000),
    ] as any) as any

    if (timeout) throw Error(`Request timeout for "${url}"`)
    if (!res.ok) throw Error(res.statusText)

    const response = yield res.json()

    return [ response, null ]
  } catch (error) {
    console.error(error)
    return [ null, error ]
  }
}
