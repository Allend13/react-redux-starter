import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.less'

const App = (props) => {
  const { children } = props

  return (
    <div>
      <div className={styles.root}>
        {children}
      </div>
    </div>
  )
}

App.propTypes = {
  children: PropTypes.element.isRequired,
}

export default App
