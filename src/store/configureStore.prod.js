import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import reducers from 'redux-modules'

const history = createHistory()
const router = routerMiddleware(history)

export default function configureStore() {
  const store = createStore(reducers, applyMiddleware(thunk, router))
  return store
}
