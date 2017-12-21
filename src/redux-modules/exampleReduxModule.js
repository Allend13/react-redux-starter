import { PENDING, FULFILLED, REJECTED } from 'redux-promise-middleware'
import axios from 'axios'

const FETCH = 'app/FETCH'
const REQUEST = FETCH + PENDING
const SUCCESS = FETCH + FULFILLED
const ERROR = FETCH + REJECTED

const initialState = {
  data: [],
  fetching: false,
  fetched: false,
  errors: [],
}

function reducer(state = initialState, action = {}) {
  const { type, payload } = action
  switch (type) {
    case REQUEST: return { ...state, fetching: true }
    case SUCCESS: return { data: payload, fetching: false, fetched: true }
    case ERROR: return { ...initialState, errors: payload }
    default: return state
  }
}

export function fetchTest() {
  return dispatch => dispatch({
    type: FETCH,
    async payload() {
      const data = await axios.get('https://jsonplaceholder.typicode.com/posts')

      return data
    },
  })
}

export default reducer
