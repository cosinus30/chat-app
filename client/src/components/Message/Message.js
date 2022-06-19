import classes from './Message.module.css'

function Message({message, isAuthorMe}) {
  const {messageText, type} = message
  const messageClasses = `${classes.message} ${isAuthorMe ? classes.fromMe : classes.fromOtherSide} ${classes[type]}`
  return <p className={messageClasses}>{messageText}</p>
}

export default Message