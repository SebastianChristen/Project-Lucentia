import React, { useState } from "react";
import "../styles/styles.css";
import { createUser } from "../services/api.js";

const Signup = () => {
  const [username, setUsername] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const responseData = await createUser(username);

      console.log("User signed up successfully:", responseData);
    } catch (error) {
    
      alert("Error during sign up. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
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