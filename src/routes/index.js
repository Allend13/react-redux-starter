/* eslint-disable react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import { ConnectedRouter } from 'react-router-redux'
import { Route } from 'react-router-dom'
import AppContainer from 'components/app'

const Routes = props => (
  <ConnectedRouter history={props.history}>
    <Route path="/" component={AppContainer} />
  </ConnectedRouter>
)

Routes.propTypes = {
  history: PropTypes.object.isRequired,
}

export default Routes
