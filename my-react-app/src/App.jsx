import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import WebSocketComponent from "./WebSocketComponent"


function App() {


  return (
    <>
          <div className="App">
      <h1>WebSocket React App</h1>
      <WebSocketComponent />
    </div>

    </>
  )
}

export default App
