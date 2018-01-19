/* eslint-disable import/no-extraneous-dependencies, global-require */
import React from 'react'
import { render } from 'react-dom'
import createHistory from 'history/createBrowserHistory'

import './less/master.less'
import Root from './components/root'
import configureStore from './store/configureStore'

const rootEl = document.getElementById('root')
const history = createHistory()
const store = configureStore(history)

render(
  <Root store={store} history={history} />,
  rootEl,
)
