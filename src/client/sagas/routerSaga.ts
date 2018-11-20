import { take, put } from 'redux-saga/effects'
import { matchPath } from 'react-router'
import { LOCATION_CHANGE } from 'connected-react-router'

import { setRoutePath } from '../actions'
import routes from '../routes'

export default function* routerSaga() {
  while (true) try {
    const { payload: { location: { pathname } } }  = yield take(LOCATION_CHANGE)
    const match = routes.map((route) => matchPath(pathname, route)).find((t) => Boolean(t))
    if (match) yield put(setRoutePath(match))
  } catch (err) {
    console.log(err)
  }
}
