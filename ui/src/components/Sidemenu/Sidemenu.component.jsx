import React from 'react'
import IconHome from './icons/home.svg'
import IconTools from './icons/tools.svg'
import { attr } from '../../util/component'

export class Sidemenu extends React.Component {
  constructor(props) {
    super(props)
    this.sidemenuRef = React.createRef()
  }

  componentDidMount() {
    this.sidemenuRef.current.addEventListener('sidemenu-toggle', this)
    this.sidemenuRef.current.addEventListener('sidemenu-close', this)
  }

  componentWillUnmount() {
    this.sidemenuRef.current.removeEventListener('sidemenu-toggle', this)
    this.sidemenuRef.current.removeEventListener('sidemenu-close', this)
  }

  handleEvent(event) {
    console.log(event.type)
    if (event.type === 'sidemenu-toggle') {
      this.props.toggle()
    } else if (event.type === 'sidemenu-close') {
      this.props.close()
    }
  }

  render() {
    const { activeRoute, collapsed, sidemenuProps } = this.props

    return (
      <rdcl-sidemenu
        { ...sidemenuProps }
        ref={ this.sidemenuRef }
        collapsed={ attr(collapsed) }
      >
        <rdcl-sidemenu-item href="/" active={ attr(activeRoute === 'home') }>
          <IconHome slot="icon"/>
          Home
        </rdcl-sidemenu-item>

        <rdcl-sidemenu-item href="/tools" active={ attr(activeRoute === 'tools') }>
          <IconTools slot="icon"/>
          Tools
        </rdcl-sidemenu-item>
      </rdcl-sidemenu>
    )
  }
}
