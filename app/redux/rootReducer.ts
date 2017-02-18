
import { Reducer, Action, combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { State } from './types'
import helloReducer, { INITIAL_STATE as HELLO } from './reducers/hello'

const INITIAL_STATE: State = {
  hello: HELLO
}

export default combineReducers<State>({
  hello: helloReducer,
  routing: routerReducer
})
