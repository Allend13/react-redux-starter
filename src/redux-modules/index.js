import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import exampleReduxModule from './exampleReduxModule'

export default combineReducers({
  routing: routerReducer,
  exampleReduxModule,
})
