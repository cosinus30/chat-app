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
        let indexOfLastElement = state.messages
          .reverse()
          .findIndex(message => message.socketId === socketId)
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
      } else if (verb === '/fadelast') {
      } else if (verb === '/countdown') {
      } else {
        return {
          ...state,
          messages: [...state.messages, {...action.message}],
        }
      }
      break
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