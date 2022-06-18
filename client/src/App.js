import {useEffect, useState} from 'react'
import {io} from 'socket.io-client'
import { v4 as uuidv4 } from 'uuid';

import Classes from './App.module.css'
import ChatHeader from './components/ChatHeader'
import MessageContainer from './components/MessageContainer'
import TextInput from './components/TextInput'

const SERVER = 'http://localhost:3001'

function App() {
  const [messages, setMessages] = useState([])
  const [socket, setSocket] = useState(null)
  const [messageText, setMessageText] = useState('')
  const [nickname, setNickname] = useState('')

  const isTyping = true
  const usernameOfOpposite = 'Dexter'

  useEffect(() => {
    const newSocket = io(SERVER)
    newSocket.on('chat message', msg => {
      setMessages(prevMessages => [...prevMessages, msg])
    })
    setSocket(newSocket)
    return () => newSocket.close()
  }, [])

  const handleMessage = event => {
    if (event.key === 'Enter' && event.shiftKey === false) {
      const message = {
        messageText: messageText,
        socketId: socket.id,
        sentTime: new Date(),
        author: nickname,
        id: uuidv4()
      }
      setMessages(previousMessages => [...previousMessages, message])
      setMessageText('')
      event.preventDefault()
      socket.emit('chat message', message)
    }
  }

  return (
    <div className={Classes.appContainer}>
      <ChatHeader isTyping={isTyping} username={usernameOfOpposite} />
      <MessageContainer messages={messages} socketId={'user1'} />
      <TextInput value={messageText} onChange={(event) => setMessageText(event.target.value)} onEnter={handleMessage} />
    </div>
  )
}

export default App
