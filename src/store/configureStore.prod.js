import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import { routerMiddleware } from 'react-router-redux'
import reducers from 'redux-modules'


export default function configureStore(history) {
  const router = routerMiddleware(history)

  const store = createStore(reducers, applyMiddleware(thunk, promiseMiddleware(), router))
  return store
}
