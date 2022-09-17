import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { RdclPageHeader } from '../../elements/rdcl-page-header'
import { open as openSideMenu } from '../../slices/side-menu'
import { StoreDispatch } from '../../store'

export const usePageHeaderControls = () => {
  const dispatch = useDispatch<StoreDispatch>()
  const open = () => dispatch(openSideMenu())

  const ref = useRef<RdclPageHeader>(null)

  useEffect(() => {
    const { current } = ref
    current?.addEventListener('mobile-menu-open', open)
    return () => current?.removeEventListener('mobile-menu-open', open)
  })

  return { ref }
}
