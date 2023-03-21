
import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const ChatRoom = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // connect to WebSocket server
    const newSocket = io("http://localhost:8080");
    setSocket(newSocket);

    // set up event listeners for incoming messages
    newSocket.on("connect", () => console.log("Connected to WebSocket"));
    newSocket.on("disconnect", () => console.log("Disconnected from WebSocket"));
    newSocket.on("message", (data) => {
      setMessages((msgs) => [...msgs, data]);
    });

    // clean up on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      // send message to WebSocket server
      socket.emit("message", message);
      setMessage("");
    }
  };

  return (
    <div>
      <h1>Chat Room</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <form onSubmit={handleSend}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatRoom;




