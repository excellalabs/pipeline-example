
import { Action } from 'redux'

import { setName } from '../actionTypes'

export interface SetNameProperties {
  name: string
}

export type SetNameAction = Action & SetNameProperties

export const type = setName
export default (props: SetNameProperties): SetNameAction => {
  return {
    ...props,
    type: type
  }
}
