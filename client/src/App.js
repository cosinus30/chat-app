import Classes from './App.module.css';
import ChatHeader from './components/ChatHeader';
import MessageContainer from './components/MessageContainer';

function App() {
  const messages = [{
    messageText: "Message 1",
    author: "Debra",
    id: "1",
    socketId: "user1",
    time: "23.56"
  },{
    messageText: "Message 2",
    author: "Dexter",
    id: "2",
    socketId: "user2",
    time: "23.56"
  },{
    messageText: "Message 3",
    author: "Debra",
    id: "3",
    socketId: "user1",
    time: "23.56"
  },{
    messageText: "Message 4",
    author: "Dexter",
    id: "4",
    socketId: "user2",
    time: "23.56"
  },{
    messageText: "Message 5",
    author: "Debra",
    id: "5",
    socketId: "user1",
    time: "23.56"
  }]

  const isTyping = true
  const usernameOfOpposite = "Dexter"

  return (
    <div className={Classes.appContainer}>
      <ChatHeader isTyping={isTyping} username={usernameOfOpposite} />
      <MessageContainer messages={messages}/>
    </div>
  );
}

export default App;
