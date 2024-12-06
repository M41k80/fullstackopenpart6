import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector(state => state.notification.message)
  const visible = useSelector(state => state.notification.visible)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    color: 'green',
  }

  
  if (!visible) {
    return null
    }
  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification