import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import { AppReady, SecondPage } from 'components'

const Routes = () => (
  <Switch>
    <Route exact path="/" component={AppReady} />
    <Route exact path="/second" component={SecondPage} />
    <Redirect from="*" to="/" />
  </Switch>
)

export default Routes
