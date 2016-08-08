import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { App, AppReady, Login, NotFound } from 'components'

const Routes = (
  <Route>
    <Route path="/" component={App} >
      <IndexRoute component={AppReady} />
    </Route>
    <Route path="/login" component={Login} />
    <Route path="*" component={NotFound} status={404} />
  </Route>
)

export default Routes
