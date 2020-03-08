import React from 'react'
import IconHome from '../icons/nav/home.svg'
import IconTools from '../icons/nav/tools.svg'
import { attr } from '../../util/component'

export class Sidemenu extends React.Component {
  constructor(props) {
    super(props)
    this.sidemenuRef = React.createRef()
  }

  componentDidMount() {
    this.sidemenuRef.current.addEventListener('sidemenu-toggle', this)
  }

  componentWillUnmount() {
    this.sidemenuRef.current.removeEventListener('sidemenu-toggle', this)
  }

  handleEvent(event) {
    if (event.type === 'sidemenu-toggle') {
      this.props.toggle()
    }
  }

  render() {
    const { collapsed, sidemenuProps } = this.props

    return (
      <rdcl-sidemenu
        { ...sidemenuProps }
        ref={ this.sidemenuRef }
        collapsed={ attr(collapsed) }
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
