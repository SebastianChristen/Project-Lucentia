import React, { useState, useEffect } from "react";
import "../styles/styles.css";

const ChatApp = () => {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const sessionUuid = document.cookie
    .split("; ")
    .find((row) => row.startsWith("session_uuid="))
    ?.split("=")[1];
  const currentUrl = new URL(window.location.href);
  const chatId = currentUrl.searchParams.get("id");

  const backendUrl = `http://localhost:8069/chats/${chatId}`;
  const backendUrlUser = `http://localhost:8069/users/${sessionUuid}`;
  const backendChatsUrl = "http://localhost:8069/chats/";

  // Load all chats
  useEffect(() => {
    const getAllChats = async () => {
      const response = await fetch(backendChatsUrl);
      const chatsData = await response.json();
      setChats(chatsData);
    };
    getAllChats();
  }, []);

  // Load username
  useEffect(() => {
    const fetchUsername = async () => {
      const response = await fetch(backendUrlUser);
      const user = await response.json();
      setUsername(user.username);
    };
    fetchUsername();
  }, [backendUrlUser]);

  // Load messages for the current chat
  useEffect(() => {
    const loadMessages = async () => {
      const response = await fetch(backendUrl);
      const json = await response.json();
      setMessages(json.messages);
    };
    loadMessages();
  }, [backendUrl]);

  // Scroll to the bottom of the messages list
  useEffect(() => {
    const list = document.getElementById("messages-list");
    if (list) {
      list.scrollTop = list.scrollHeight;
    }
  }, [messages]);

  // Handle logoff
  const handleLogoff = () => {
    document.cookie = "session_uuid=;";
    window.location.reload(); // Redirect or refresh
  };

  // Handle form submission to post a message
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      sender: username,
      message,
    };

    await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    setMessage(""); // Reset message input
    const response = await fetch(backendUrl);
    const json = await response.json();
    setMessages(json.messages); // Reload messages
  };

  return (
    <div className="chat-app">
      <header>
        <h1>Chat App</h1>
        <button onClick={handleLogoff}>Log Off</button>
      </header>

      <section className="chat-list">
        <h2>Available Chats</h2>
        <ul>
          {chats.map((chat) => (
            <li key={chat.id}>
              <a href={`?id=${chat.id}`} className="chat-link">
                {chat.name}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="messages-section">
        <h2>Messages</h2>
        <div id="messages-list" className="messages-list">
          {messages.map((msg, index) => (
            <p key={index}>
              <strong>{msg.sender}:</strong> {msg.message}
            </p>
          ))}
        </div>
        <form id="messageForm" onSubmit={handleSubmit}>
          <input
            type="text"
            name="message"
            placeholder="Write your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <button type="submit">Send</button>
        </form>
      </section>
    </div>
  );
};

export default ChatApp;
