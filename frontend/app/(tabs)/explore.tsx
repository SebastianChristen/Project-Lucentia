import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_URL = "http://localhost:8000/auth"; // Ändere das auf deine API-URL

export default function AuthScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState(null);
    
    useEffect(() => {
        const checkToken = async () => {
            const storedToken = await AsyncStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
            }
        };
        checkToken();
    }, []);

    const handleSignup = async () => {
        try {
            const response = await axios.post(`${API_URL}/signup`, new URLSearchParams({
                username,
                password
            }), {
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            });
            await AsyncStorage.setItem("token", response.data.access_token);
            setToken(response.data.access_token);
            Alert.alert("Registrierung erfolgreich");
        } catch (error) {
            Alert.alert("Fehler", error.response?.data?.detail || "Ein Fehler ist aufgetreten");
        }
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${API_URL}/login`, new URLSearchParams({
                username,
                password
            }), {
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            });
            await AsyncStorage.setItem("token", response.data.access_token);
            setToken(response.data.access_token);
            Alert.alert("Login erfolgreich");
        } catch (error) {
            Alert.alert("Fehler", error.response?.data?.detail || "Ein Fehler ist aufgetreten");
        }
    };

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`${API_URL}/me`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            Alert.alert("Benutzerinfo", `Angemeldet als: ${response.data.username}`);
        } catch (error) {
            Alert.alert("Fehler", "Nicht autorisiert");
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Text>Benutzername:</Text>
            <TextInput style={{ borderWidth: 1, padding: 5 }} value={username} onChangeText={setUsername} />
            <Text>Passwort:</Text>
            <TextInput style={{ borderWidth: 1, padding: 5 }} secureTextEntry value={password} onChangeText={setPassword} />
            <Button title="Registrieren" onPress={handleSignup} />
            <Button title="Login" onPress={handleLogin} />
            {token && <Button title="Meine Daten abrufen" onPress={fetchUserData} />}
        </View>
    );
}
