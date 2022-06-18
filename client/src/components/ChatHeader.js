import classes from './ChatHeader.module.css'

function ChatHeader({username = null, isTyping = false}) {
  return (
    <div className={classes.headerContainer}>
      {username && <span className={classes.username}>{username}</span>}
      {isTyping && <span className={classes.typingInfo}>typing...</span>}
    </div>
  )
}

export default ChatHeader
