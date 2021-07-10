
import * as React from 'react'
import { connect } from 'react-redux'
import { Drawer } from 'material-ui'

import { State } from '../redux/types'
import { Metrics } from '../constants'
import { ToggleDrawer } from '../redux/actions'

export type HeaderProps = HeaderStateProps & HeaderDispatchProps

export class Header extends React.Component<HeaderProps, {}> {
  render () {
    return (
      <Drawer docked={!this.props.isBelowDrawerBreakpoint} open={this.props.open} onRequestChange={this.props.onToggle} width={Metrics.drawerWidth} />
    )
  }
}

interface HeaderStateProps {
  open: boolean
  isBelowDrawerBreakpoint: boolean
}

const stateToProps = (state: State): HeaderStateProps => {
  return {
    open: state.drawer.open,
    isBelowDrawerBreakpoint: state.window.isBelowDrawerBreakpoint
  }
}

interface HeaderDispatchProps {
  onToggle: (open: boolean) => void
}

const dispatchToProps = (dispatch): HeaderDispatchProps => {
  return {
    onToggle: (open: boolean) => dispatch(ToggleDrawer({ open }))
  }
}

export default connect(stateToProps, dispatchToProps)(Header)
