import { useCallback, useMemo, useState } from 'preact/hooks'

export function useSideMenu() {
  const [visible, setVisible] = useState(false)
  const show = useCallback(() => setVisible(true), [setVisible])
  const hide = useCallback(() => setVisible(false), [setVisible])

  return useMemo(
    () => ({
      visible,
      show,
      hide,
    }),
    [visible, show, hide],
  )
}
