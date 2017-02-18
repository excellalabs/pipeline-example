
import { type as setName, SetNameAction } from '../actions/setName'
import { Reducer, Action } from 'redux'
import { Hello } from '../types'
import { ActorMap, buildReducer } from '../actorMap'

export const INITIAL_STATE: Hello = {
  name: 'world'
}

const actors: ActorMap<Hello> = {
  [setName]: (prev: Hello, action: SetNameAction): Hello => {
    return {
      ...prev,
      name: action.name
    }
  }
}

export default buildReducer(INITIAL_STATE, actors)
