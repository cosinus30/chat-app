function Message({message, children}) {
  const {messageText, author, socketId, ...rest} = message 
  return <div>{messageText}</div>
}

export default Message