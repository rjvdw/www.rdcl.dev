import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { selectActiveRoute } from '../../slices/routes'
import { ReactSvgComponent } from '../Icon'

type ItemProps = {
  href: string
  route: string
  children: string
  icon: ReactSvgComponent
}

export const Item: FunctionComponent<ItemProps> = ({
  href,
  route,
  children: text,
  icon: IconComponent,
}) => {
  const activeRoute = useSelector(selectActiveRoute)

  return (
    <rdcl-side-menu-item
      href={href}
      active={activeRoute === route}
      title={text}
    >
      <IconComponent slot="icon" />
      {text}
    </rdcl-side-menu-item>
  )
}
