import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import * as exampleReduxModuleActiuons from 'redux-modules/exampleReduxModule'
import App from './app.component'

class AppContainer extends Component {
  componentDidMount() {
    const { fetching, fetched, fetchTest } = this.props

    if (!fetched && !fetching) fetchTest()
  }
  render() {
    return (
      <App />
    )
  }
}

AppContainer.propTypes = {
  fetching: PropTypes.bool.isRequired,
  fetched: PropTypes.bool.isRequired,
  fetchTest: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    fetching: state.exampleReduxModule.fetching,
    fetched: state.exampleReduxModule.fetched,
  }),
  {
    fetchTest: exampleReduxModuleActiuons.fetchTest,
  },
)(AppContainer)
