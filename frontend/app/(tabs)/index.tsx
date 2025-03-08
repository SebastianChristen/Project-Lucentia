import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const App = () => {
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedChatId, setSelectedChatId] = useState(null);
  const navigation = useNavigation();

  const API_KEY = "your-secret-key";
  const backendUrl = `http://localhost:8000/chats/`;
  const backendUrlUser = `http://localhost:8000/auth/me`;
  const [token, setToken] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
        const storedToken = await AsyncStorage.getItem("token");
        if (storedToken !== token) {
            setToken(storedToken);
        }
    };
    checkToken();
    const interval = setInterval(checkToken, 3000);
    return () => clearInterval(interval);
  }, [token]);

  useEffect(() => {
      if (token) {
          loadUsername();
          getAllChats();
      }
  }, [token]);

  useEffect(() => {
    async function loadData() {
      loadMessages(selectedChatId);
      getAllChats();
      loadUsername();
    }
    loadData();
    const interval = setInterval(() => {
      if (selectedChatId) {
        loadMessages(selectedChatId);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [selectedChatId]);

  const loadUsername = async () => {
    const response = await fetch(backendUrlUser, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY,
        "Authorization": `Bearer ${token}`}
    });
    const user = await response.json();
    setUsername(user.username);
  };

  const loadMessages = async (chatId) => {
    if (!chatId) return;
    try {
      const response = await fetch(`${backendUrl}${chatId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "X-API-KEY": API_KEY },
      });
      const json = await response.json();
      setMessages(Array.isArray(json.messages) ? json.messages : []);
    } catch (error) {
      console.error("Error loading messages:", error);
      setMessages([]);
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
    const data = { sender: sessionUuid, message: message };

    await fetch(`${backendUrl}${selectedChatId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY,
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });

    setMessage("");
    loadMessages(selectedChatId);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bubble</Text>
      <Text style={styles.username}>Connected as: {username}</Text>

      <View style={styles.chatWrapper}>
        <ScrollView style={styles.chatList}>
          {chats.map((chat) => (
            <TouchableOpacity key={chat.id} onPress={() => { setSelectedChatId(chat.id); loadMessages(chat.id); }}>
              <Text style={styles.chat}>{chat.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView style={styles.messagesList}>
          {messages.map((msg, index) => (
            <View key={index} style={styles.messageBubble}>
              <Text style={styles.messageSender}>
            {msg.sender} - {new Date(Number(msg.sent_at)).toLocaleString()}
          </Text>
              <Text style={styles.messageText}>{msg.message}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.messageForm}>
        <TextInput
          style={styles.messageInput}
          placeholder="Send a signal..."
          value={message}
          onChangeText={setMessage}
          onSubmitEditing={handleSubmit}
          blurOnSubmit={false}
          returnKeyType="send"
        />
        <Button title="Transmit" onPress={handleSubmit} color="#39FF14" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#0A0A23" },
  header: { fontSize: 28, fontWeight: "bold", textAlign: "center", color: "#39FF14" },
  username: { textAlign: "center", marginBottom: 10, color: "#A6FFFD" },
  chatWrapper: { flexDirection: "row", flex: 1 },
  chatList: { maxWidth: 120, backgroundColor: "#112233", padding: 10, borderRadius: 10 },
  chat: { fontSize: 16, marginBottom: 8, color: "#39FF14" },
  messagesList: { flex: 1, padding: 10 },
  messageBubble: { marginBottom: 10, padding: 10, backgroundColor: "#222244", borderRadius: 8 },
  messageSender: { fontWeight: "bold", color: "#39FF14" },
  messageText: { color: "#A6FFFD" },
  messageForm: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  messageInput: { flex: 1, borderWidth: 1, borderColor: "#39FF14", padding: 10, borderRadius: 5, color: "#A6FFFD" },
});

export default App;
