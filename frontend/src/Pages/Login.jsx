import React, { useState } from "react";
import "./Login.css"; // Import external CSS

const LoginForm = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (isSignup) {
      console.log("Signing up with", { name, email, password });
      // Add signup logic here
    } else {
      console.log("Logging in with", { email, password });
      // Add login logic here
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">{isSignup ? "Sign Up" : "Login"}</h1>

      {isSignup && (
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="login-input"
        />
      )}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="login-input"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="login-input"
      />

      <button onClick={handleSubmit} className="login-button">
        {isSignup ? "Sign Up" : "Login"}
      </button>

      <p className="toggle-text" onClick={() => setIsSignup(!isSignup)}>
        {isSignup ? "Already have an account? Login" : "Don't have an account? Sign Up"}
      </p>
    </div>
  );
};

export default LoginForm;
