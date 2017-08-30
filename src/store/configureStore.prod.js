import { createStore, applyMiddleware } from 'redux'
import reducers from 'reducers'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

const history = createHistory()
const router = routerMiddleware(history)

export default function configureStore() {
  const store = createStore(reducers, applyMiddleware(thunk, router))
  return store
}
