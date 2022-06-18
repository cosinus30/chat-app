import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import Classes from './App.module.css'
import ChatHeader from './components/ChatHeader'
import MessageContainer from './components/MessageContainer'
import TextInput from './components/TextInput'

const SERVER = 'http://localhost:3001'

function App() {
  const messages = [
    {
      messageText: 'Message 1',
      author: 'Debra',
      id: '1',
      socketId: 'user1',
      time: '23.56',
    },
    {
      messageText: 'Message 2',
      author: 'Dexter',
      id: '2',
      socketId: 'user2',
      time: '23.56',
    },
    {
      messageText: 'Message 3',
      author: 'Debra',
      id: '3',
      socketId: 'user1',
      time: '23.56',
    },
    {
      messageText: 'Message 4',
      author: 'Dexter',
      id: '4',
      socketId: 'user2',
      time: '23.56',
    },
    {
      messageText: 'Message 5',
      author: 'Debra',
      id: '5',
      socketId: 'user1',
      time: '23.56',
    },
    {
      messageText: 'Message 6',
      author: 'Debra',
      id: '6',
      socketId: 'user1',
      time: '23.56',
    },
  ]
  const isTyping = true
  const usernameOfOpposite = 'Dexter'

  const [messageText, setMessageText] = useState("")

  useEffect(() => {
    const newSocket = io(SERVER)
    return () => newSocket.close()
  }, [])

  return (
    <div className={Classes.appContainer}>
      <ChatHeader isTyping={isTyping} username={usernameOfOpposite} />
      <MessageContainer messages={messages} socketId={'user1'} />
      <TextInput value={messageText} onChange={setMessageText}/>
    </div>
  )
}

export default App
