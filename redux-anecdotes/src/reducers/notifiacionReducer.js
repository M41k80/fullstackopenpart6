import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: '',
  visible:false,
}



const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      state.message = action.payload.message
      state.visible = true

    },
    clearNotification(state) {
      state.visible = false
      state.message = ''
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const setNotificationWithTimeout = (message, duration) => dispatch => {
  dispatch(setNotification({ message}))

  setTimeout(() => {
    dispatch(clearNotification())
  }, duration * 1000)
  
}
  

export default notificationSlice.reducer
