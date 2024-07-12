import React, { useEffect, useState, useRef } from 'react';

const WebSocketComponent = () => {
 



  return (
    <>
    <div className='mt-[5rem] flex flex-col w-[30%] h-[70vh]'>
      <form id="msgForm" className='flex flex-row'>
        <input
          id="inputBox"
          type="text"
          className='h-[100%] flex-4 mr-[2rem] border-none rounded-[.5rem] p-2 text-[1.5rem] bg-blue-300 focus:bg-white'
         
       
        />
        <button type="submit" className='h-[5rem] flex-1 flex justify-center items-center rounded-[.5rem] bg-blue-500 text-white-200 border-none text-[1.6rem]'>Send</button>
      </form>
      <div id="messages">
        {/*messages.map((msg, index) => (
          <div key={index} className="msgCtn m-1 text-white p-1 bg-blue-500 rounder-[6px] text-[2rem]">{msg}</div>
        ))*/}
      </div>
    </div>
    <script defer src='http://localhost:3000/socket.io/socket.io.js'></script>
    <script defer src='script.js'></script>

    </>
  )

}

export default WebSocketComponent;
