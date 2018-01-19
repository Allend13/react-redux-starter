import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import promiseMiddleware from 'redux-promise-middleware'
import { routerMiddleware } from 'react-router-redux'
import reducers from 'redux-modules'

const logger = createLogger({ timestamp: false, collapsed: true })

export default function configureStore(history) {
  const router = routerMiddleware(history)
  const enhancer = compose(applyMiddleware(thunk, promiseMiddleware(), router, logger))
  const store = createStore(reducers, enhancer)

  return store
}
