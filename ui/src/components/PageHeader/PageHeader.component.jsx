import React from 'react'

export class PageHeader extends React.Component {
  constructor(props) {
    super(props)
    this.pageHeaderRef = React.createRef()
  }

  componentDidMount() {
    this.pageHeaderRef.current.addEventListener('mobilemenu-open', this)
  }

  componentWillUnmount() {
    this.pageHeaderRef.current.removeEventListener('mobilemenu-open', this)
  }

  handleEvent(event) {
    console.log(event)
    if (event.type === 'mobilemenu-open') {
      this.props.open()
    }
  }

  render() {
    const { pageHeaderProps } = this.props

    return (
      <rdcl-page-header { ...pageHeaderProps } ref={ this.pageHeaderRef }>
        rdcl.dev
      </rdcl-page-header>
    )
  }
}
