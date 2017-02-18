
import * as React from 'react'

export interface HelloProps {
  name: string
  changeName?: (name: string) => void
}

export default (props: HelloProps) => {
  return (
    <div>
      <div>Hello, {props.name}</div>
      <input type='text' value={props.name} onChange={(ev) => props.changeName(ev.target.value)} />
    </div>
  )
}
