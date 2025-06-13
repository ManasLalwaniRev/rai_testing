import React, { useRef } from 'react';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const handleLogin = () => {
    navigate("/dashboard");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Login</h2>
        <input
          type="text"
          placeholder="Username"
          className="w-full mb-3 p-2 border rounded"
          ref={usernameRef}
          onKeyDown={handleKeyDown}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          ref={passwordRef}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded cursor-pointer"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;