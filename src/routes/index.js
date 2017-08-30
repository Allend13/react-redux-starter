/* eslint-disable react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import { ConnectedRouter, Route } from 'react-router'
import { App } from 'components'

const Routes = props => (
  <ConnectedRouter history={props.history}>
    <Route path="/" component={App} />
  </ConnectedRouter>
)

Routes.propTypes = {
  history: PropTypes.object.isRequired,
}

export default Routes
