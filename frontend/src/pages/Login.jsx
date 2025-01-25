import React, { useState } from "react";
import "../styles/styles.css";

const Signup = () => {
  const [username, setUsername] = useState("");

  const backendUrl = "http://localhost:8000/users/";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { username };

    try {
      const response = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to sign up");
      }

      const responseData = await response.json();
      document.cookie = `session_uuid=${responseData.id};`;
      window.location.href = "index.html";
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          name="username"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Signup;
