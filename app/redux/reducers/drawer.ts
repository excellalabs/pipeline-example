
import { Reducer, Action } from 'redux'

import { Drawer } from '../types'
import { ActorMap, buildReducer } from '../actorMap'
import { type as toggleDrawer, ToggleDrawerAction } from '../actions/toggleDrawer'
import { type as changeWindowWidth, ChangeWindowWidthAction } from '../actions/changeWindowWidth'

import store from '../../store'
import { Metrics } from '../../constants'

export const INITIAL_STATE: Drawer = {
  open: false
}

const actors: ActorMap<Drawer> = {
  [toggleDrawer]: (prev: Drawer, action: ToggleDrawerAction): Drawer => {
    return {
      ...prev,
      open: action.open
    }
  },
  [changeWindowWidth]: (prev: Drawer, action: ChangeWindowWidthAction): Drawer => {
    const previousState = store.getState()

    const wasBelowBreakpoint = previousState.window.isBelowDrawerBreakpoint
    const isBelowBreakpoint = action.windowWidth <= Metrics.drawerBreakpoint

    if (wasBelowBreakpoint && !isBelowBreakpoint) {
      return {
        ...prev,
        open: true
      }
    }

    if (!wasBelowBreakpoint && isBelowBreakpoint) {
      return {
        ...prev,
        open: false
      }
    }

    return prev
  }
}

export default buildReducer(INITIAL_STATE, actors)
