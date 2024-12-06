import React, {createContext, useContext, useReducer, useEffect} from "react"

const ADD_NOTIFICATION = 'ADD_NOTIFICATION'
const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION'

const initialState = {
  notifications: [],
  
}

const notificaciónReducer = (state, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, action.payload]
      }
    case REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(notification => notification.id !== action.payload)
      }
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationProvider = ({children}) => {
    const [state, dispatch] = useReducer(notificaciónReducer, initialState)

    useEffect(() => {
        if (state.notifications.length > 0) {
            const timeout = setTimeout(() => {
                const notificationId = state.notifications[0].id
                dispatch(removeNotification(notificationId))
            }, 5000)
            return () => clearTimeout(timeout)
        }
    }, [state.notifications, dispatch])

    return (
      <NotificationContext.Provider value={{state, dispatch}}>
        {children}
      </NotificationContext.Provider>
    )
}

export const useNotifications = () => useContext(NotificationContext)

export const addNotification = (message, isError = false) => {
    return {
        type: ADD_NOTIFICATION,
        payload: {
            id: Date.now(),
            message,
            isError
        },

    }
}

export const removeNotification = (id) => {
    return {
        type: REMOVE_NOTIFICATION,
        payload: id

    }
}