
import { Reducer, Action } from 'redux'

import { Window } from '../types'
import { Metrics } from '../../constants'
import { ActorMap, buildReducer } from '../actorMap'
import { type as changeWindowWidth, ChangeWindowWidthAction } from '../actions/changeWindowWidth'

const INITIAL_WIDTH = window.innerWidth

export const INITIAL_STATE: Window = {
  width: 0,
  isBelowDrawerBreakpoint: true
}

const actors: ActorMap<Window> = {
  [changeWindowWidth]: (prev: Window, action: ChangeWindowWidthAction): Window => {
    return {
      ...prev,
      width: action.windowWidth,
      isBelowDrawerBreakpoint: action.windowWidth <= Metrics.drawerBreakpoint
    }
  }
}

export default buildReducer(INITIAL_STATE, actors)
