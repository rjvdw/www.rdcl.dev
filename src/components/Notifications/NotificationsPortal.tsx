import React from 'react'
import { createPortal } from 'react-dom'
import { NotificationsBody } from './NotificationsBody'

export class NotificationsPortal extends React.Component {
  readonly #el: HTMLDivElement

  constructor(props: Record<string, never>) {
    super(props)
    this.#el = document.createElement('div')
    this.#el.classList.add('notifications')
  }

  componentDidMount() {
    document.body.appendChild(this.#el)
  }

  componentWillUnmount() {
    document.body.removeChild(this.#el)
  }

  render() {
    return createPortal(
      <NotificationsBody/>,
      this.#el,
    )
  }
}
