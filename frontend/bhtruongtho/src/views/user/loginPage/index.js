// Login.js

import React, { memo, useState } from "react";
import "./index.scss";
import { getTaiKhoanByUsername } from "../../../api/connect";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await getTaiKhoanByUsername(formData.username);

      if (user && user.password === formData.password) {
        // Đăng nhập thành công
        console.log("Login successful!");
        alert("Login successful!");
        // navigate("/home");
      } else {
        // Đăng nhập không thành công
        console.log("Login failed. Please check your credentials.");
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
      alert("An error occurred during login. Please try again.");
    }
  };

  const handleCreateAccount = () => {
    // Thực hiện chuyển hướng đến trang đăng ký hoặc hiển thị modal đăng ký
    console.log("Create New Account Clicked");
    alert("Create New Account Clicked!");
  };

  const handleForgotPassword = () => {
    // Thực hiện chuyển hướng đến trang quên mật khẩu hoặc hiển thị modal quên mật khẩu
    console.log("Forgot Password Clicked");
    alert("Forgot Password Clicked!");
  };

  return (
    <div className="login__container">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username or Email:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Login</button>
        </form>

        <div className="additional-options">
          <span onClick={handleCreateAccount}>Create New Account</span>
          <span onClick={handleForgotPassword}>Forgot Password</span>
        </div>
      </div>
    </div>

  );
};

export default memo(Login);
