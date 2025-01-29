import React, { useState } from "react";
import { signUp } from "../services/api";

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {

        try {
            console.log(`Email: ${username} Password: ${password}`, username, password);
            const sessionUuid = await signUp(username);
            document.cookie = `session_uuid=${sessionUuid};`;
            alert(sessionUuid);
        } catch (error) {
            console.error("Signup failed:", error);
        }

    };

    return (
        <div>
            <h1>Sign Up</h1>
            <form id="usernameForm">
                <input type="text" name="email" placeholder="email" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" name="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" onClick={handleLogin}>send</button>
            </form>
        </div>

    );
};

export default LoginPage;
