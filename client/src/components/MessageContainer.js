import { useLayoutEffect, useRef } from "react";
import Message from "./Message";
import classes from './MessageContainer.module.css'

function MessageContainer({messages = [], socketId}) {
  const containerRef = useRef()

  useLayoutEffect(() => {
    containerRef.current.scrollTop = containerRef.current.scrollHeight
  })

  return (
    <div ref={containerRef} className={classes.messageContainer}>
      {messages.map(message => (
        <Message key={message.id} message={message} isAuthorMe={socketId === message.socketId} />
      ))}
    </div>
  )
}


export default MessageContainer
