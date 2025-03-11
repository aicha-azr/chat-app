// Room.js
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
// import socket from "./Socket";

const Room = () => {
  const location = useLocation();
  const [currentMessage, setCurrentMessage] = useState('');
  const [enterMessage, setEnterMessage] = useState('');
  const [theMessages, setTheMessages] = useState([]);
  const [users, setUsers] = useState(new Map());

  const userName = location.state.name;
  const messagesEndRef = useRef(null);

  // useEffect(() => {
  //   socket.on('user-connection', (name) => {
  //     setEnterMessage(`${name} connected`);
  //     setUsers((prevUsers) => new Map(prevUsers).set(name, name));
  //   });
  //   socket.on('user-disconnected', name => {
  //     setEnterMessage(`${name} disconnected`);
  //     setUsers((prevUsers) => {
  //       const newUsers = new Map(prevUsers);
  //       newUsers.delete(name);
  //       return newUsers;
  //     });
  //   });
  //   socket.on('display-message', (message) => {
  //     setTheMessages((prevMessages) => [...prevMessages, message]);
  //   });
  //   socket.on('users', (user) => {
  //     setUsers((prevUsers) => new Map(prevUsers).set(user, user));
  //   });
  //   socket.on('user-message', (message) => {
  //     setTheMessages((prevMessages) => [...prevMessages, message]);
  //   });

  //   return () => {
  //     socket.off('user-connection');
  //     socket.off('user-disconnected');
  //     socket.off('display-message');
  //     socket.off('user-message');
  //     socket.off('users');
  //   };
  // }, []);

  const sendMessage = () => {
    if (currentMessage) {
      // socket.emit('message', currentMessage);
      setCurrentMessage('');
    }
  };

  return (
    <div className="App flex flex-col justify-center items-center w-screen">
      <h2 className='font-bold'>The Room</h2>
      <div className="flex gap-2 w-fit border border-blue-300">
        <div className="bg-gray-300 h-[500px] w-[200px] px-1 overflow-y-auto">
          <h2 className="font-bold">Users connected:</h2>
          {Array.from(users.values()).map((user, index) => (
            <p key={index}>{user} connected</p>
          ))}
        </div>
        <div className='grid grid-rows-10 gap-1'>
          <div id="messages" className='border border-black row-span-9 bg-white-100 flex flex-col gap-1 overflow-y-auto h-[500px] w-[500px] p-3'>
            {theMessages.map((message, index) => (
              <div key={index} className="rounded-xl bg-green-200 w-fit h-fit p-2 py-1 ">
                <h3 className='text-start text-red-300'>{message.name}</h3>
                <p className="font-light">{message.message}</p>
              </div>
            ))}
            <div ref={messagesEndRef} />
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
    </div>
  );
};

export default Room;
