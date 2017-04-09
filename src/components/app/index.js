import React, { PropTypes } from 'react'
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
