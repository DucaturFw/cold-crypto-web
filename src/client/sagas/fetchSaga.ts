import { call, race, put } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import { setLoaderState } from '../actions'

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

export default function* fetchJson(url: string, options?: IFetchOptions) {
  try {
    yield put(setLoaderState(true))

    const [ res, timeout ] = yield race([
      call(window.fetch, url, makeFetchOptions(options)),
      delay(10000),
    ] as any) as any

    if (timeout) throw Error(`Request timeout for "${url}"`)
    if (!res.ok) throw Error(res.statusText)

    const response = yield res.json()
    yield put(setLoaderState(false))

    return [ response, null ]
  } catch (error) {
    console.error(error)

    yield put(setLoaderState(false))
    return [ null, error ]
  }
}
