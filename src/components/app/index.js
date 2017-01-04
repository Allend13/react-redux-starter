import React, { PropTypes } from 'react'
import { Header, Footer, Devtools } from 'components'
import './app.less'

const isProd = process.env.NODE_ENV === 'production'

const App = (props) => {
  const { children } = props

  return (
    <div>
      <div className="app">
        <Header />
        {children}
        <Footer />
      </div>
      {!isProd && <Devtools />}
    </div>
  )
}

App.propTypes = {
  children: PropTypes.element,
}

export default App
