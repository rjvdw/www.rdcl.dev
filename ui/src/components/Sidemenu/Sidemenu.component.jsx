import React from 'react'
import IconHome from '../icons/nav/home.svg'
import IconTools from '../icons/nav/tools.svg'
import { attr } from '../../util/component'

export class Sidemenu extends React.Component {
  constructor(props) {
    super(props)
    this.sidemenuRef = React.createRef()
    this.state = { collapsed: false }

    const storedJson = window.localStorage.getItem('sidemenu-state')
    if (storedJson) {
      try {
        const stored = JSON.parse(storedJson)
        if (stored.collapsed) {
          this.state.collapsed = true
        }
      } catch (err) {
        console.warn(err)
        // ignore whatever is currently in local storage
      }
    }
  }

  componentDidMount() {
    this.sidemenuRef.current.addEventListener('sidemenu-toggle', this)
  }

  componentWillUnmount() {
    this.sidemenuRef.current.removeEventListener('sidemenu-toggle', this)
  }

  handleEvent(event) {
    if (event.type === 'sidemenu-toggle') {
      this.setState(({ collapsed }) => {
        const state = { collapsed: !collapsed }
        window.localStorage.setItem('sidemenu-state', JSON.stringify(state))
        return state
      })
    }
  }

  render() {
    return (
      <rdcl-sidemenu
        slot="sidemenu" ref={ this.sidemenuRef }
        collapsed={ attr(this.state.collapsed) }
      >
        <rdcl-sidemenu-item href="/" active>
          <IconHome slot="icon"/>
          Home
        </rdcl-sidemenu-item>

        <rdcl-sidemenu-item href="/tools">
          <IconTools slot="icon"/>
          Tools
        </rdcl-sidemenu-item>
      </rdcl-sidemenu>
    )
  }
}
