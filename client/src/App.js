import {useEffect, useReducer, useRef, useState} from 'react'
import {io} from 'socket.io-client'
import {v4 as uuidv4} from 'uuid'

import Classes from './App.module.css'
import ChatHeader, {Avatar, ChatInfo, Option, Options} from './components/Header/ChatHeader'
import MessageContainer from './components/Message/MessageContainer'
import TextInput from './components/Form/TextInput'
import MessagesReducer from './reducer/MessageReducer'

const SERVER = 'http://localhost:3001'

function App() {
  const messageTextRef = useRef('')
  const [isTyping, setIsTyping] = useState(false)
  const [doIStillTpye, setDoIStillType] = useState(null)

  const [state, dispatch] = useReducer(MessagesReducer, {
    messages: [],
    socket: null,
    myNickname: '',
    opponentNickname: '',
  })
  const {messages, socket, myNickname, opponentNickname} = state

  useEffect(() => {
    const newSocket = io(SERVER)
    dispatch({type: 'INITIALIZE_SOCKET', socket: newSocket})
    newSocket.on('chat message', msg => {
      dispatch({type: 'NEW_MESSAGE', message: msg})
    })
    newSocket.on('typing', isTyping => {
      setIsTyping(isTyping)
    })

    return () => {
      newSocket.close()
    }
  }, [])

  const handleMessage = event => {
    if (event.key === 'Enter' && event.shiftKey === false) {
      const messageText = messageTextRef.current?.value
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
      messageTextRef.current.value = ''
      event.preventDefault()
      socket.emit('chat message', message)
    } else {
      socket.emit('typing', true)
      if (doIStillTpye) {
        clearTimeout(doIStillTpye)
      }
      const timeout = setTimeout(() => {
        socket.emit('typing', false)
      }, 1000)
      setDoIStillType(timeout)
    }
  }

  return (
    <div className={Classes.appContainer}>
      <ChatHeader isTyping={isTyping} username={opponentNickname}>
        <Avatar image={{url: 'https://www.w3schools.com/howto/img_avatar2.png', desc: 'avatar'}} />
        <ChatInfo>
          {opponentNickname && <span>{opponentNickname}</span>}
          {isTyping && <span>typing...</span>}
        </ChatInfo>
        <Options>
          <Option>Search</Option>
          <Option>Mute this conversation</Option>
        </Options>
      </ChatHeader>
      <MessageContainer messages={messages} socketId={socket?.id} />
      <TextInput
        ref={messageTextRef}
        onEnter={handleMessage}
      />
    </div>
  )
}

export default App
