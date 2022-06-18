import Message from "./Message";
import classes from './MessageContainer.module.css'

function MessageContainer({messages = [], socketId}) {
  return (
    <div className={classes.messageContainer}>
      {messages.map(message => (
        <Message key={message.id} message={message} isAuthorMe={socketId === message.socketId} />
      ))}
    </div>
  )
}


export default MessageContainer
