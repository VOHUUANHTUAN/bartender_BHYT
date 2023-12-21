// Login.js
import React, { memo, useEffect, useState } from "react";
import { logingettoken, getUserInfoByToken } from "../../../api/connect";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../../../context/UserContext";
import {
    Container,
    Paper,
    TextField,
    Button,
    Grid,
    Typography,
} from "@mui/material";

const Login = () => {
    const { user, login } = useUser();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [loginError, setLoginError] = useState(null); // Thêm state để theo dõi lỗi đăng nhập
    const navigate = useNavigate();

    useEffect(() => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await logingettoken(
                formData.username,
                formData.password
            );
            if (res) {
                login({
                    username: formData.username,
                    token: res.token,
                    auth: true,
                });
                localStorage.setItem("token", res.token);
                localStorage.setItem("username", formData.username);
                localStorage.setItem("auth", true);

                const fetchUserInfo = async () => {
                    try {
                        const response = await getUserInfoByToken(res.token);
                        console.log(response);
                    } catch (error) {
                        console.log(error.message);
                    }
                };
                fetchUserInfo();
                console.log("Login successful.");

                navigate("/");
            } else {
                setLoginError(
                    "Đăng nhập thất bại. Vui lòng kiểm tra thông tin đăng nhập của bạn."
                );
            }
        } catch (error) {
            setLoginError(
                "Đã xảy ra lỗi trong quá trình đăng nhập. Vui lòng thử lại sau."
            );
            console.error("Error during login:", error.message);
        }
    };

    return (
        <Container maxWidth="xs">
            <Paper
                elevation={3}
                style={{ padding: "20px", margin: "150px 0px 50px 0px" }}
            >
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {loginError && (
                        <Typography
                            color="error"
                            variant="body2"
                            style={{ marginBottom: "10px" }}
                        >
                            {loginError}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{ marginTop: "20px" }}
                    >
                        Login
                    </Button>
                    <Grid
                        container
                        justifyContent="space-between"
                        style={{ marginTop: "10px" }}
                    >
                        <Grid item>
                            <Link to="/register" variant="body2">
                                Đăng ký
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link variant="body2">Quên mật khẩu</Link>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Login;
