import classNames from 'classnames'
import React, { FunctionComponent } from 'react'
import { Notification } from '../../slices/notifications'
import { useDismissNotification, useNotifications } from './Notifications.hooks'

export const NotificationsBody: FunctionComponent = () => {
  const notifications = useNotifications()

  return (
    <>
      {notifications.map((notification) => (
        <NotificationEntry key={notification.id} notification={notification} />
      ))}
    </>
  )
}

type NotificationEntryProps = {
  notification: Notification
}

const NotificationEntry: FunctionComponent<NotificationEntryProps> = ({
  notification,
}) => {
  const dismiss = useDismissNotification(notification)

  return (
    <div
      className={classNames(
        'notifications__notification',
        `notifications__notification--${notification.type}`,
      )}
      onClick={dismiss}
    >
      {notification.message}
    </div>
  )
}
