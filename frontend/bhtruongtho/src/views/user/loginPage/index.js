// Login.js
import {
    Button,
    Container,
    Grid,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import bcrypt from "bcryptjs";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logingettoken } from "../../../api/connect";
import { useSnackbar } from "../../../context/SnackbarContext";
import { useUser } from "../../../context/UserContext";

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

            // const hashedPassword = await bcrypt.hash(
            //     formData.password,
            //     formData.username
            // );
            const res = await logingettoken(
                formData.username,
                formData.password
            );
            // const res = await logingettoken(formData.username, hashedPassword);

            if (res) {
                login({
                    username: res.username,
                    token: res.token,
                    firstLogin: res.firstLogin,
                    role: res.role,
                });
                localStorage.setItem("token", res.token);
                localStorage.setItem("username", res.username);

                console.log("Login successful.");

                openSnackbar("Đăng nhập thành công", "success");
                if (res.role == "Nhân viên") {
                    navigate("/staff");
                    console.log(res.role);
                    return;
                }

                navigate("/");
            }
        } catch (error) {
            try {
                openSnackbar(error.response.data, "error");
            } catch {
                openSnackbar("Có lỗi xảy ra khi kết nối với máy chủ", "error");
            }
        }
        // openSnackbar("đmm", "error");
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
