import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from './store/configureStore'
import Routes from './routes'
import 'less/master.less'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)


render(
  <Provider store={store}>
    <Router history={history}>
      {Routes}
    </Router>
  </Provider>,
  document.getElementById('root')
)
