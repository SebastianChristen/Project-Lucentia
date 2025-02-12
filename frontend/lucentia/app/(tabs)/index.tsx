import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import styles from './styles'; // Import styles

const App = () => {
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedChatId, setSelectedChatId] = useState(null); // New state for selected chat ID

  // Replace with your backend URL and API Key
  const API_KEY = "your-secret-key";
  const backendUrl = `http://localhost:8000/chats/`;
  const backendUrlUser = `http://localhost:8000/users/`;

  useEffect(() => {
    async function loadData() {
      // const username = await loadUsername();
      // setUsername(username);
      loadMessages(selectedChatId);
      getAllChats();
    }

    loadData();
    const interval = setInterval(() => {
      if (selectedChatId) {
        loadMessages(selectedChatId); // Update messages every 5 seconds for the selected chat
      }
    }, 5000); // Update messages every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, [selectedChatId]); // Only re-run the effect if selectedChatId changes

  const loadUsername = async () => {
    const response = await fetch(backendUrlUser, {
      method: "GET",
      headers: { "Content-Type": "application/json", "X-API-KEY": API_KEY },
    });
    const user = await response.json();
    return user.username;
  };

  const loadMessages = async (chatId) => {
    if (!chatId) return;
    try {
      const response = await fetch(`${backendUrl}${chatId}`, {  // Use the selected chatId
        method: "GET",
        headers: { "Content-Type": "application/json", "X-API-KEY": API_KEY },
      });
  
      const json = await response.json();
      setMessages(Array.isArray(json.messages) ? json.messages : []);
    } catch (error) {
      console.error("Error loading messages:", error);
      setMessages([]); // Fallback, falls ein Fehler auftritt
    }
  };

  const getAllChats = async () => {
    const response = await fetch("http://localhost:8000/chats/", {
      method: "GET",
      headers: { "Content-Type": "application/json", "X-API-KEY": API_KEY },
    });
    const chatsData = await response.json();
    setChats(chatsData);
  };

  const handleSubmit = async () => {
    const sessionUuid = document.cookie.split("; ").find(row => row.startsWith("session_uuid="))?.split("=")[1];
    const data = {
      sender: sessionUuid,
      message: message,
    };

    await fetch(`${backendUrl}${selectedChatId}`, {  // Send the message to the selected chatId
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY,
      },
      body: JSON.stringify(data),
    });

    setMessage(""); // Reset input field
    loadMessages(selectedChatId); // Reload messages for the selected chat
  };

  const logoff = () => {
    document.cookie = "session_uuid=;"; // Remove session cookie
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lucentia</Text>
      <View style={styles.account}>
        <Text>Angemeldet als: {username}</Text>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.link}>Anmelden</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={logoff}>
          <Text style={styles.link}>Abmelden</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.chatsList}>
          {chats.map((chat) => (
            <TouchableOpacity key={chat.id} onPress={() => { setSelectedChatId(chat.id); loadMessages(chat.id); }}>
              <Text style={styles.chat}>{chat.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.messageWrapper}>
        <ScrollView style={styles.messagesList}>
          {messages.map((message, index) => (
            <Text key={index} style={{ color: '#696' }}>
              {message.sender}: {message.message}
            </Text>
          ))}
        </ScrollView>

        <View style={styles.messageForm}>
          <TextInput
            style={styles.messageInput}
            placeholder="Message"
            value={message}
            onChangeText={setMessage}
          />
          <Button title="Send" onPress={handleSubmit} style={styles.sendButton} />
        </View>
      </View>
    </View>
  );
};

export default App;
