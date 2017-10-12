import axios from 'axios'

const FETCH_REQUEST = 'app/FETCH_REQUEST'
const FETCH_SUCCESS = 'app/FETCH_SUCCESS'
const FETCH_ERROR = 'app/FETCH_ERROR'

const initialState = {
  data: [],
  fetching: false,
  fetched: false,
  errors: [],
}

function reducer(state = initialState, action = {}) {
  const { type, payload } = action
  switch (type) {
    case FETCH_REQUEST: return { ...state, fetching: true }
    case FETCH_SUCCESS: return { data: payload, fetching: false, fetched: true }
    case FETCH_ERROR: return { ...initialState, errors: payload }
    default: return state
  }
}

export function fetchTest() {
  return (dispatch) => {
    dispatch({ type: FETCH_REQUEST })

    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then((res) => {
        dispatch({
          type: FETCH_SUCCESS,
          payload: res.data,
        })
      })
      .catch((err) => {
        dispatch({
          type: FETCH_ERROR,
          payload: err,
        })
      })
  }
}

export default reducer
