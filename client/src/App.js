import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import LiveNotification from './LiveNotification';
import "./App.css";

const socket = io('ws://localhost:8080');

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('message', (message) => {
      console.log('Received message:', message);
      setMessage(message);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });
  }, []);

  function handleSend() {
    socket.emit('message', 'Hello, server!');
  }

  return (
    <div>
      <p>Received message: {message}</p>
      <LiveNotification></LiveNotification>
      <button onClick={handleSend}>Send message</button>
    </div>
  );
}

export default App; 

