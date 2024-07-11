// src/WebSocketComponent.jsx

import React, { useEffect, useState } from 'react';

const WebSocketComponent = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const ws = new WebSocket(`ws://${window.location.host}`);
    ws.binaryType = "blob";

    ws.addEventListener("open", () => {
      console.log("Websocket connection opened");
    });

    ws.addEventListener("close", () => {
      console.log("Websocket connection closed");
    });

    ws.onmessage = (event) => {
      const msgDiv = document.createElement('div');
      msgDiv.classList.add('msgCtn');
      if (event.data instanceof Blob) {
        const reader = new FileReader();
        reader.onload = () => {
          setMessages(prevMessages => [...prevMessages, reader.result]);
        };
        reader.readAsText(event.data);
      } else {
        console.log("Result2: " + event.data);
        setMessages(prevMessages => [...prevMessages, event.data]);
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const ws = new WebSocket(`ws://${window.location.host}`);
    ws.send(message);
    setMessage('');
  };

  return (
    <div className='mt-[5rem] flex flex-col w-[30%] h-[70vh]'>
      <form id="msgForm" onSubmit={handleSubmit} className='flex flex-row'>
        <input
          id="inputBox"
          type="text"
          className='h-[100%] flex-4 mr-[2rem] border-none rounded-[.5rem] p-2 text-[1.5rem] bg-blue-300 focus:bg-white'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className='h-[5rem] flex-1 flex justify-center items-center rounded-[.5rem] bg-blue-500 text-white-200 border-none text-[1.6rem]'>Send</button>
      </form>
      <div id="messages">
        {messages.map((msg, index) => (
          <div key={index} className="msgCtn m-1 text-white p-1 bg-blue-500 rounder-[6px] text-[2rem]">{msg}</div>
        ))}
      </div>
    </div>
  );
};

export default WebSocketComponent;
