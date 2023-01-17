import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StoreState } from '../store'

export type Notification = {
  id: number
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
    dismiss(state, { payload: id }: PayloadAction<number>) {
      return {
        notifications: state.notifications.filter((n) => n.id !== id),
      }
    },
  },
})

export const notifications = reducer
export const { notify, dismiss } = actions

export const selectNotifications = (state: StoreState) =>
  state.notifications.notifications
