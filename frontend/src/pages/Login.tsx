import React, { useState } from "react";
import { signUp } from "../services/api";

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
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
            <form id="usernameForm" onSubmit={handleLogin} method="POST">
                <input type="text" name="email" placeholder="email" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" name="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" >send</button>
            </form>
        </div>

    );
};

export default LoginPage;
