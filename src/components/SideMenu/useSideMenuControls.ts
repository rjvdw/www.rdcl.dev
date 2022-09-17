import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { close as closeSideMenu, toggle as toggleSideMenu } from '../../slices/side-menu'
import { StoreDispatch } from '../../store'

export const useSideMenuControls = <T extends HTMLElement = HTMLElement>() => {
  const dispatch = useDispatch<StoreDispatch>()
  const toggle = () => dispatch(toggleSideMenu())
  const close = () => dispatch(closeSideMenu())

  const ref = useRef<T>(null)
  const navigate = useNavigate()

  const handleClick = (event: MouseEvent) => {
    if (event.defaultPrevented) {
      return
    }

    if (event.ctrlKey || event.shiftKey || event.metaKey || event.button === 1) {
      // user is trying to open a new tab, don't interfere
      return
    }

    const element = event.composedPath().find(el => (el as HTMLAnchorElement).href) as HTMLAnchorElement

    if (element && !element.dataset.noHistory && element.origin === window.location.origin) {
      event.preventDefault()
      navigate(element.pathname)
    }
  }

  useEffect(() => {
    const { current } = ref

    current?.addEventListener('side-menu-toggle', toggle)
    current?.addEventListener('side-menu-close', close)
    current?.addEventListener('click', handleClick)

    return () => {
      current?.removeEventListener('side-menu-toggle', toggle)
      current?.removeEventListener('side-menu-close', close)
      current?.removeEventListener('click', handleClick)
    }
  })

  return { ref, toggle, close }
}
