import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StoreState } from '../store'

export type Notification = {
  id: string
  type: 'info' | 'warning' | 'error'
  message: string
}

type NotificationsState = {
  notifications: Notification[]
}

const INITIAL_STATE: NotificationsState = {
  notifications: [],
}

const { actions, reducer } = createSlice({
  name: 'notifications',
  initialState: INITIAL_STATE,
  reducers: {
    notify(state, { payload: notification }: PayloadAction<Notification>) {
      return {
        notifications: state.notifications.concat(notification),
      }
    },
    dismiss(state, { payload: id }: PayloadAction<string>) {
      return {
        notifications: state.notifications.filter((n) => n.id !== id),
      }
    },
  },
})

export const notifications = reducer
export const { dismiss } = actions

export function notify(
  notification: Notification,
): ReturnType<typeof actions.notify>
export function notify(
  type: Notification['type'],
  message: string,
): ReturnType<typeof actions.notify>
export function notify(
  notificationOrType: Notification | Notification['type'],
  message?: string,
) {
  if (typeof notificationOrType === 'string') {
    return actions.notify({
      id: crypto.randomUUID(),
      type: notificationOrType,
      message: message as string,
    })
  }

  return actions.notify(notificationOrType)
}

export const selectNotifications = (state: StoreState) =>
  state.notifications.notifications
