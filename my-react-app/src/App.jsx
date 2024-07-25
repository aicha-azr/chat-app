import { useEffect, useState } from 'react';
import './App.css';
import io from 'socket.io-client';

function App() {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [socket, setSocket] = useState(null);
  const [userMessages, setUserMessages] = useState([]); // Renamed to userMessages for consistency

  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    const name = prompt('What is your name?');
    newSocket.emit('new-user', name);

    newSocket.on('user-connection', (name) => {
      setUserName(name);
    });

    newSocket.on('display-message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    newSocket.on('user-message', (message) => {
      setUserMessages((prevUserMessages) => [...prevUserMessages, message]);
    });

    return () => newSocket.close();
  }, []);

  const sendMessage = () => {
    if (currentMessage) {
      socket.emit('message', currentMessage);
      setCurrentMessage('');
    }
  };

  return (
    <>
      <div className="App">
        <h2 className='font-bold'>WebSocket React App</h2>
        <div className='grid grid-rows-10 gap-1'>
          <div id="messages" className='border border-black row-span-9 bg-white-100 flex flex-col gap-1'>
            {messages.map((message, index) => (
              <div key={index} className="rounded-xl bg-green-200 w-fit h-fit p-3">
                <h3 className='text-start text-red-300'>{userName}</h3>
                {message}
              </div>
            ))}
            {userMessages.map((message, index) => (
              <div key={index} className="rounded-xl bg-gray-200 w-fit h-fit p-3">
                <h3 className='text-start text-red-300'>{userName}</h3>
                {message}
              </div>
            ))}
          </div>
          <div id="msgForm" className='grid grid-cols-3 gap-4 row-span-1'>
            <input
              id="inputBox"
              type="text"
              className='col-span-2 rounded-xl shadow shadow-md focus:outline-none p-2 bg-gray-300 text-black'
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
            />
            <button type="submit" onClick={sendMessage} className='rounded-xl shadow shadow-md bg-blue-600 text-white font-bold'>
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
