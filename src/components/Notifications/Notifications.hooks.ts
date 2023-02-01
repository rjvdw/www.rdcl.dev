import { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  dismiss,
  Notification,
  notify,
  selectNotifications,
} from '../../slices/notifications'
import { StoreDispatch } from '../../store'

const MAX_VISIBLE_NOTIFICATIONS = 10
const NOTIFICATION_DURATION = 15000

export function useNotifications() {
  return useSelector(selectNotifications).slice(0, MAX_VISIBLE_NOTIFICATIONS)
}

export function useDismissNotification(notification: Notification) {
  const dispatch = useDispatch<StoreDispatch>()

  const dismissNotification = useMemo(() => {
    return () => {
      dispatch(dismiss(notification.id))
    }
  }, [dispatch, notification])

  useEffect(() => {
    const timeout = setTimeout(dismissNotification, NOTIFICATION_DURATION)

    return () => {
      clearTimeout(timeout)
    }
  }, [dismissNotification])

  return dismissNotification
}

export const useNotify = () => {
  const dispatch = useDispatch<StoreDispatch>()

  const dispatcher = useCallback(
    (type: Notification['type']) => (message: string) => {
      dispatch(notify(type, message))
    },
    [dispatch]
  )

  return useMemo(
    () =>
      Object.assign(dispatcher('info'), {
        info: dispatcher('info'),
        warning: dispatcher('warning'),
        error: dispatcher('error'),
      }),
    [dispatcher]
  )
}
