
import { Action, Reducer } from 'redux'

export interface ActorMap<S> {
  [name: string]: Reducer<S>
}

export function buildReducer<S> (initialState: S, map: ActorMap<S>): Reducer<S> {
  return (prev: S = initialState, action: Action): S => {
    let actor = map[action.type]
    return typeof actor === 'function' ? actor(prev, action) : prev
  }
}
