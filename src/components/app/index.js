import React from 'react'
import PropTypes from 'prop-types'
import { Header } from 'components'
import './app.less'

const App = (props) => {
  const { children } = props

  return (
    <div>
      <div className="app">
        <Header />
        {children}
      </div>
    </div>
  )
}

App.propTypes = {
  children: PropTypes.element.isRequired,
}

export default App
