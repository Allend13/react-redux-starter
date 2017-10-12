import React from 'react'
import { Link } from 'react-router-dom'
import Content from './content'

const AppReady = () => (
  <div className="dummy-component text-center">
    <Content />
    <Link to="/second">Other page (test router)</Link>
  </div>
)

export default AppReady
