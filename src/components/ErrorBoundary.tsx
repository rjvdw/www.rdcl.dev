import React from 'react'

type ErrorBoundaryProps = {
  children?: React.ReactNode,
}
type ErrorBoundaryState = {
  hasError: boolean,
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
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
