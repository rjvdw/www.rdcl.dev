import { useCallback, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RdclSideMenu } from '../../elements/grid/rdcl-side-menu'
import { close, open, toggle } from '../../slices/side-menu'
import { StoreDispatch } from '../../store'

export const useClose = () => {
  const dispatch = useDispatch<StoreDispatch>()
  return useCallback(
    () => dispatch(close()),
    [dispatch],
  )
}

export const useOpen = () => {
  const dispatch = useDispatch<StoreDispatch>()
  return useCallback(
    () => dispatch(open()),
    [dispatch],
  )
}

export const useToggle = () => {
  const dispatch = useDispatch<StoreDispatch>()
  return useCallback(
    () => dispatch(toggle()),
    [dispatch],
  )
}

export const useSideMenuRef = () => {
  const ref = useRef<RdclSideMenu>(null)
  const toggle = useToggle()
  const close = useClose()
  const handleClick = useHandleClick()

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
  }, [ref, toggle, close, handleClick])

  return ref
}

const useHandleClick = () => {
  const navigate = useNavigate()
  const close = useClose()
  return useCallback(
    (event: MouseEvent) => {
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
        close()
      }
    },
    [navigate, close],
  )
}
