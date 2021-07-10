
import { Action } from 'redux'

export interface ToggleDrawerProperties {
  open: boolean
}

export type ToggleDrawerAction = Action & ToggleDrawerProperties

export const type = 'TOGGLE_DRAWER'
export default (props: ToggleDrawerProperties): ToggleDrawerAction => {
  return {
    ...props,
    type: type
  }
}
