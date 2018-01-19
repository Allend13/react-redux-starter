/* eslint-disable react/forbid-prop-types, import/no-extraneous-dependencies */
import React from 'react'
import PropTypes from 'prop-types'
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux'
import Routes from 'routes'


const Root = (props) => {
  const { store, history } = props

  return (
    <Provider store={store}>
      <Routes history={history} />
    </Provider>
  )
}

Root.propTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
}

export default hot(module)(Root)
