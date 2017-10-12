import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import reducers from 'redux-modules'

const history = createHistory()

const router = routerMiddleware(history)
const logger = createLogger({ timestamp: false });

const enhancer = compose(
  applyMiddleware(thunk, router, logger),
)

export default function configureStore() {
  const store = createStore(reducers, enhancer)

  if (module.hot) {
    module.hot.accept('../redux-modules', () => store.replaceReducer(reducers))
  }

  return store
}
