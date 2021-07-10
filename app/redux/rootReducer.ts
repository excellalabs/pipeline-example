
import { Reducer, Action, combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { State } from './types'
import drawerReducer, { INITIAL_STATE as DRAWER } from './reducers/drawer'
import windowReducer, { INITIAL_STATE as WINDOW } from './reducers/window'

const INITIAL_STATE: State = {
  drawer: DRAWER,
  window: WINDOW
}

export default combineReducers<State>({
  drawer: drawerReducer,
  window: windowReducer,
  routing: routerReducer
})
