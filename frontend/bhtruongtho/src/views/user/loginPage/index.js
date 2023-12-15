// Login.js

import React, { memo, useEffect, useState } from "react";
import "./index.scss";
import { logingettoken, getUserInfoByToken } from "../../../api/connect";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../context/UserContext";

const Login = () => {
    // Khai báo context để sử dụng lưu token và username vào biến toàn cục
    const { user, login, logout } = useUser();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const navigate = useNavigate();

    useEffect(() => {
        // Nếu người dùng đã đăng nhập, chuyển hướng đến trang chính
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Xử lí khi nhấn nút LOGIN
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await logingettoken(
                formData.username,
                formData.password
            );
            // console.log(res);
            if (res) {
                // Nếu API trả về token, lưu vào context
                login({
                    username: formData.username,
                    token: res.token,
                    auth: true,
                });
                localStorage.setItem("token", res.token);
                localStorage.setItem("username", formData.username);
                localStorage.setItem("auth", true);

                // const token = localStorage.getItem('token'); // Assuming you store the token in localStorage

                const fetchUserInfo = async () => {
                    try {
                        const response = await getUserInfoByToken(res.token);

                        // console.log(response);
                    } catch (error) {
                        console.log(error.message);
                    }
                };
                fetchUserInfo();
                console.log("Login successful.");
                navigate("/");
            } else {
                // Nếu không có token hoặc bất kỳ điều gì khác, xử lý theo yêu cầu của bạn
                console.log("Login failed. Please check your credentials.");
            }
        } catch (error) {
            // Xử lý lỗi khi gặp vấn đề kết nối hoặc lỗi server
            console.error("Error during login:", error.message);
        }
    };

    const handleCreateAccount = () => {
        // Thực hiện chuyển hướng đến trang đăng ký hoặc hiển thị modal đăng ký
        alert("Create New Account Clicked!");
    };

    const handleForgotPassword = () => {
        // Thực hiện chuyển hướng đến trang quên mật khẩu hoặc hiển thị modal quên mật khẩu
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
                    <span onClick={handleCreateAccount}>
                        Create New Account
                    </span>
                    <span onClick={handleForgotPassword}>Forgot Password</span>
                </div>
            </div>
        </div>
    );
};

export default memo(Login);
