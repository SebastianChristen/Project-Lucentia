import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from '@react-navigation/native'

const API_URL = "http://localhost:8000/auth"; // Ändere das auf deine API-URL

export default function AuthScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState(null);
    const [error, setError] = useState("");

    const navigation = useNavigation();

    useEffect(() => {
        const checkToken = async () => {
            const storedToken = await AsyncStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
            }
        };
        checkToken();
    }, []);

    // const handleSignup = async () => {
    //     setError(""); // Reset error message
    //     try {
    //         const response = await axios.post(`${API_URL}/signup`, new URLSearchParams({
    //             username,
    //             password
    //         }), {
    //             headers: { "Content-Type": "application/x-www-form-urlencoded" }
    //         });
    //         await AsyncStorage.setItem("token", response.data.access_token);
    //         setToken(response.data.access_token);
    //     } catch (error) {
    //         setError(error.response?.data?.detail || "Ein Fehler ist aufgetreten");
    //     }
    // };

    const handleLogin = async () => {
        setError(""); // Reset error message
        try {
            const response = await axios.post(`${API_URL}/login`, new URLSearchParams({
                username,
                password
            }), {
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            });
            await AsyncStorage.setItem("token", response.data.access_token);
            setToken(response.data.access_token);
            navigation.navigate('index');
        } catch (error) {
            setError(error.response?.data?.detail || "Ein Fehler ist aufgetreten");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput 
                style={styles.input} 
                placeholder="Benutzername" 
                value={username} 
                onChangeText={setUsername} 
            />
            <TextInput 
                style={styles.input} 
                placeholder="Passwort" 
                secureTextEntry 
                value={password} 
                onChangeText={setPassword} 
            />
            <Text onPress={handleSignup} style={{ color: "blue", marginTop: 10 }}>
                Not signed up?
            </Text>

            <Button title="Login" onPress={handleLogin} />
            {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        width: "80%",
        borderWidth: 1,
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
    },
    error: {
        color: "red",
        marginTop: 10,
    }
});
