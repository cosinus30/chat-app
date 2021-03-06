function MessagesReducer(state, action) {
  switch (action.type) {
    case 'NEW_MESSAGE': {
      const {messageText, socketId, author} = action.message
      const [verb, ...rest] = messageText.trim().split(' ')
      const isItMe = socketId === state.socket?.id
      if (verb === '/nick') {
        const authorChanged = state.messages.map(message => {
          return {...message, author: rest.join(' ')}
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
        return {
          ...state,
          messages: [
            ...state.messages,
            {...action.message, messageText: rest.join(' '), type: 'think'},
          ],
        }
      } else if (verb === '/oops') {
        const reversedArray = [...state.messages].reverse()
        let indexOfLastElement = reversedArray.findIndex(message => message.socketId === socketId)
        if (indexOfLastElement < 0) return state
        indexOfLastElement = state.messages.length - indexOfLastElement - 1
        return {
          ...state,
          messages: [
            ...state.messages.slice(0, indexOfLastElement),
            ...state.messages.slice(indexOfLastElement + 1),
          ],
        }
      } else if (verb === '/highlight') {
        return {
          ...state,
          messages: [
            ...state.messages,
            {...action.message, messageText: rest.join(' '), type: 'highlight'},
          ],
        }
      } else if (verb === '/fadelast') {
        const reversedArray = [...state.messages].reverse()
        let lastSentElement = reversedArray.find(message => message.socketId === socketId)
        lastSentElement.type = 'fadelast'
        return {
          ...state,
          messages: [...reversedArray.reverse()],
        }
      } else if (verb === '/countdown') {
        if (!isItMe) {
          const [waitTime, url] = rest
          setTimeout(() => {
            window.open(url, '_blank')
          }, waitTime)
        }
      } 
      return {
        ...state,
        messages: [...state.messages, {...action.message}],
      }
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

export default MessagesReducer
