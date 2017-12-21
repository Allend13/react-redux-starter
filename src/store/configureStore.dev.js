import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { routerMiddleware } from 'react-router-redux'
import reducers from 'redux-modules'

const logger = createLogger({ timestamp: false, collapsed: true })

export default function configureStore(history) {
  const router = routerMiddleware(history)
  const enhancer = compose(applyMiddleware(thunk, router, logger))
  const store = createStore(reducers, enhancer)

  if (module.hot) {
    module.hot.accept('../redux-modules', () => store.replaceReducer(reducers))
  }

  return store
}
