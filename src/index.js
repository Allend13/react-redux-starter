import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory, IndexRedirect } from 'react-router'
import { replace, syncHistoryWithStore } from 'react-router-redux'
import configureStore from './store/configureStore'
import 'less/master.less'
import App from './components/app'
import { Login, NotFound } from './components'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)
const authRedirect = (path) => store.dispatch(replace(path))
const defaultRoute = ''

const requireLogin = () => {}

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" onEnter={requireLogin} component={App}>
        <IndexRedirect to={defaultRoute} />
      </Route>
      <Route path="/login" authRedirect={authRedirect} component={Login} />
      <Route path="*" onEnter={requireLogin} component={NotFound} status={404} />
    </Router>
  </Provider>,
  document.getElementById('root')
)
