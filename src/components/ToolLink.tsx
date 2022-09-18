import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'

type HrefLink = { href: string }
type ToLink = { to: string }
type BaseLink = HrefLink | ToLink

type ToolLinkProps = BaseLink & {
  title: string
  children: React.ReactNode
}
export const ToolLink: FunctionComponent<ToolLinkProps> = (props) => {
  const { title, children } = props

  return (
    <rdcl-tool-link>
      { isHrefLink(props) && (
        <a slot="link" href={ props.href } data-no-history>{ title }</a>
      ) }
      { isToLink(props) && (
        <Link slot="link" to={ props.to }>{ title }</Link>
      ) }
      { children }
    </rdcl-tool-link>
  )
}

function isHrefLink(p: BaseLink): p is HrefLink {
  return (p as HrefLink).href !== undefined
}

function isToLink(p: BaseLink): p is ToLink {
  return (p as ToLink).to !== undefined
}
