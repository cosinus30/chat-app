import {useEffect, useReducer, useState} from 'react'
import {io} from 'socket.io-client'
import {v4 as uuidv4} from 'uuid'

import Classes from './App.module.css'
import ChatHeader from './components/ChatHeader'
import MessageContainer from './components/MessageContainer'
import TextInput from './components/TextInput'

const SERVER = 'http://localhost:3001'

function messagesReducer(state, action) {
  switch (action.type) {
    case 'NEW_MESSAGE': {
      const {messageText, socketId, author} = action.message
      const [verb, ...rest] = messageText.trim().split(' ')
      const isItMe = socketId === state.socket?.id;
      if (verb === '/nick') {
        const authorChanged = state.messages.map(message => {
          return {...message, author: rest}
        })
        const newNickname = isItMe ? rest : state.myNickname
        const newOpponentNickname = isItMe ? state.opponentNickname : rest.join(' ')
        return {
          ...state,
          messages: authorChanged,
          myNickname: newNickname,
          opponentNickname: newOpponentNickname,
        }
      } else if (verb === '/think') {
      } else if (verb === '/oops') {
      } else if (verb === '/highlight') {
      } else if (verb === '/fadelast') {
      } else if (verb === '/countdown') {
      } else {
        return {
          ...state,
          messages: [...state.messages, {...action.message}]
        }
      }
      break;
    }
    case 'INITIALIZE_SOCKET': {
      return {
        ...state,
        socket: action.socket,
      }
    }
    default: {
      break
    }
  }
}

function App() {
  const [messageText, setMessageText] = useState('')
  const [state, dispatch] = useReducer(messagesReducer, {
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
