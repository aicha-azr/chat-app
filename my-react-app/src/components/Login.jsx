// Login.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "./Socket";


const Login = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleEnter = (e) => {
    e.preventDefault();
    socket.emit('new-user', name); // Emit the new-user event
    navigate('/room', { state: { name } });
  };

  return (
    <div className="flex flex-col justify-center items-center border border-black h-screen w-screen">
      <h2 className="font-medium">Welcome to the Chat App</h2>
      <form onSubmit={handleEnter} className="flex flex-col rounded-lg shadow-md p-2 bg-blue-600 gap-3">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-white">Name:</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="rounded-md p-2 focus:outline-none"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button type="submit" className="font-medium bg-gray-300">Login</button>
      </form>
    </div>
  );
};

export default Login;
