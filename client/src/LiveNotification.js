import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:8080'); 
function App() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Listen for incoming notifications from the server
    socket.on('notification', (notification) => {
      setNotifications([...notifications, notification]);
    });

    // Clean up event listeners on unmount
    return () => {
      socket.off('notification');
    };
  }, [notifications]);

  return (
    <div>
      <h1>Live Notifications</h1>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

