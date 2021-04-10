import React from 'react'

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error({ error, errorInfo })
  }

  render() {
    if (this.state.hasError) {
      return <>
        <h1>Oops... Something went wrong</h1>

        <p>For some reason, this page failed to load.</p>
      </>
    }

    return this.props.children
  }
}
