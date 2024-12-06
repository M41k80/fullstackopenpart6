import React, { useEffect} from 'react'
import { useNotifications, removeNotification } from './NotificationContext'

const Notification = () => {
  const { state, dispatch } = useNotifications()


  useEffect(() => {
    if (state.notifications.length > 0) {
      const notification = state.notifications[0]
      console.log(notification)

      const timeout = setTimeout(() => {
        const notificacion = state.notifications[0]
        dispatch(removeNotification(notificacion.id))
      }, 5000)
      return () => clearTimeout(timeout)
    }
  }, [state.notifications, dispatch])

  if (state.notifications.length === 0) return null

  const notification = state.notifications[0]

  return (
    
    
        <div
          style = {{
            border: 'solid',
            padding: 10,
            borderWidth: 1,
            marginBottom: 5,
            color: state.notifications[0].isError ? 'red' : 'green',
            backgroundColor: state.notifications[0].isError ? '#f8d7da' : '#d4edda',
            borderColor: state.notifications[0].isError ? '#f5c6cb' : '#c3e6cb',
            }}
          >
            {notification.message}
          </div>
         
          
      )
    }

export default Notification
