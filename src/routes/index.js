/* eslint-disable react/forbid-prop-types */
import React, { PropTypes } from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import { App, AppReady, NotFound } from 'components'

const Routes = props => (
  <Router history={props.history}>
    <Route path="/" component={App} >
      <IndexRoute component={AppReady} />
    </Route>
    <Route path="*" component={NotFound} status={404} />
  </Router>
)

Routes.propTypes = {
  history: PropTypes.object.isRequired,
}

export default Routes
