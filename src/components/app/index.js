import React, { PropTypes } from 'react'
import { Header, Footer, Devtools } from 'components'
import './app.less'

const isProd = process.env.NODE_ENV === 'production'

const App = (props) => {
  const { children } = props

  console.log('APP_API_HOST', APP_API_HOST);

  return (
    <div>
      <div className="app">
        <Header />
        {children}
        {APP_API_HOST}
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
