import React, { PropTypes } from 'react'
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
import { Header, Footer } from 'components'
import './app.less'

const App = (props) => {
  const { children } = props

  return (
    <div>
      <div id="app">
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  )
}

App.propTypes = {
  children: PropTypes.element,
}

export default App

// function mapStateToProps(state) {
//   return {
//   }
// }
//
// function mapDispatchToProps(dispatch) {
//   return {
//   }
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(App)
