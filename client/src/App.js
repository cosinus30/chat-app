import {useEffect, useReducer, useState} from 'react'
import {io} from 'socket.io-client'
import {v4 as uuidv4} from 'uuid'

import Classes from './App.module.css'
import MessagesReducer from './reducer/MessageReducer'

const SERVER = 'http://localhost:3001'



function App() {
  const [messageText, setMessageText] = useState('')
  const [state, dispatch] = useReducer(MessagesReducer, {
    messages: [],
    socket: null,
    myNickname: '',
    opponentNickname: '',
  })
  const {messages, socket, myNickname, opponentNickname} = state

  const isTyping = true

  useEffect(() => {
    const newSocket = io(SERVER)
    dispatch({type: 'INITIALIZE_SOCKET', socket: newSocket})
    newSocket.on('chat message', msg => {
      dispatch({type: 'NEW_MESSAGE', message: msg})
    })
    return () => newSocket.close()
  }, [])

  const handleMessage = event => {
    if (event.key === 'Enter' && event.shiftKey === false) {
      if (messageText.trim() === '') {
        event.preventDefault()
        return
      }
      const message = {
        messageText: messageText,
        socketId: socket.id,
        sentTime: new Date(),
        author: myNickname,
        id: uuidv4(),
      }
      dispatch({type: 'NEW_MESSAGE', message})
      setMessageText('')
      event.preventDefault()
      socket.emit('chat message', message)
    }
  }

  return (
    <div className={Classes.appContainer}>
      <ChatHeader isTyping={isTyping} username={opponentNickname} />
      <MessageContainer messages={messages} socketId={socket?.id} />
      <TextInput
        value={messageText}
        onChange={event => setMessageText(event.target.value)}
        onEnter={handleMessage}
      />
    </div>
  )
}

export default App
