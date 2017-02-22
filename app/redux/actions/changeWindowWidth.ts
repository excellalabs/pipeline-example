
import { Action } from 'redux'

export interface ChangeWindowWidthProperties {
  windowWidth: number
}

export type ChangeWindowWidthAction = Action & ChangeWindowWidthProperties

export const type = 'CHANGE_WINDOW_WIDTH'
export default (props: ChangeWindowWidthProperties): ChangeWindowWidthAction => {
  return {
    ...props,
    type: type
  }
}
