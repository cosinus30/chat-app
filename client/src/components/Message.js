import classes from './Message.module.css'

function Message({message, isAuthorMe}) {
  const {messageText, author, socketId, ...rest} = message
  
  const messageClasses = `${classes.message} ${isAuthorMe ? classes.fromMe : classes.fromOtherSide}`
  return <p className={messageClasses}>{messageText}</p>
}

export default Message