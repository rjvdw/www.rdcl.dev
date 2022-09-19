import { useEffect, useRef } from 'react'
import { RdclPageHeader } from '../../elements/rdcl-page-header'
import { useOpen } from '../SideMenu'

export const usePageHeaderRef = () => {
  const ref = useRef<RdclPageHeader>(null)
  const open = useOpen()

  useEffect(() => {
    const { current } = ref
    current?.addEventListener('mobile-menu-open', open)
    return () => current?.removeEventListener('mobile-menu-open', open)
  }, [ref, open])

  return ref
}
