function ChatHeader({username = null, isTyping = false}) {
  return (
    <div>
      {username && <span>{username}</span>}
      {isTyping && <span>typing...</span>}
    </div>
  )
}

export default ChatHeader
