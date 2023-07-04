import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { login } from "../api/api";
import { useAuth } from "../auth/AuthProvider";

import "./login.css";

function Login() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const auth = useAuth();

  /* if (auth.isAuthenticated) {
    return <Navigate to={"/dashboard"} />;
  } */

  const handleLogin = async () => {
    try {
      const token = await login(userName, password);
      if (token) {
        auth.saveToken(token);
        navigate("/dashboard");
      }
    } catch (error) {
      navigate("/unauthorized");
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={userName}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
