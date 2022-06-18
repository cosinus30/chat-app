import Message from "./Message";

function MessageContainer({messages = []}) {
  return (
    <div>
      {messages.map(message => (
        <Message key={message.id} message={message}/>
      ))}
    </div>
  )
}


export default MessageContainer
