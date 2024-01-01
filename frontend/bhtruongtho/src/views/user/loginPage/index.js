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
    Snackbar,
} from "@mui/material";

import { useSnackbar } from "../../../context/SnackbarContext";

const Login = () => {
    const { openSnackbar } = useSnackbar();
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const { user, login } = useUser();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [loginError, setLoginError] = useState(null); // Thêm state để theo dõi lỗi đăng nhập
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        if (e.target.name === "username") {
            const usernameRegex = /^[a-zA-Z0-9_@#&]+$/;
            setUsernameError(!usernameRegex.test(e.target.value));
        }
        if (e.target.name === "password") {
            const usernameRegex = /^[a-zA-Z0-9_@#&]+$/;
            setPasswordError(!usernameRegex.test(e.target.value));
        }
    };

    const validateForm = () => {
        if (usernameError || passwordError) {
            return "Vui lòng kiểm tra lại thông tin";
        }
        return null; // Validation passed
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const validationError = validateForm();

            if (validationError) {
                openSnackbar(validationError);

                return;
            }
            const res = await logingettoken(
                formData.username,
                formData.password
            );

            // setSnackbarMessage("Đăng nhập thành công");
            // setSnackbarOpen(true);

            if (res) {
                login({
                    username: formData.username,
                    token: res.token,
                    firstLogin: res.firstLogin,
                    auth: true,
                    role: res.role,
                });
                localStorage.setItem("token", res.token);

                console.log("Login successful.");

                if (localStorage.getItem("firstLogin") == "true") {
                    navigate("/PersonalInfo");
                    return;
                }
                openSnackbar("Đăng nhập thành công");
                navigate("/");
            }
        } catch (error) {
            try {
                openSnackbar(error.response.data);
            } catch {
                openSnackbar("Có lỗi xảy ra khi kết nối với máy chủ");
            }
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
                        error={usernameError}
                        helperText={
                            usernameError &&
                            "Username chỉ được chứa chữ cái và số, dấu _ @ # &"
                        }
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
                        error={passwordError}
                        helperText={
                            passwordError &&
                            "Password chỉ được chứa chữ cái và số, dấu _ @ # &"
                        }
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
