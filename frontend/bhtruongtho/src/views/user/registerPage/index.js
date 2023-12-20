import React, { useState } from "react";
import {
    Container,
    Paper,
    TextField,
    Button,
    Typography,
    Snackbar,
} from "@mui/material";
import { KhachHang_DangKyTaiKhoan } from "../../../api/connect";
import { useNavigate, Link } from "react-router-dom";
import { TRUE } from "sass";

const Register = () => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    });
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

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
        // Check if passwords match when typing in the confirmation field
        if (e.target.name === "confirmPassword") {
            setConfirmPasswordError(e.target.value !== formData.password);
        }
    };

    const validateForm = () => {
        if (formData.password !== formData.confirmPassword) {
            return "Mật khẩu không khớp";
        }

        if (formData.username.length < 6) {
            return "Tên người dùng phải có ít nhất 6 ký tự";
        }
        if (usernameError || passwordError || confirmPasswordError) {
            return "Vui lòng kiểm tra lại thông tin";
            //   setSnackbarOpen(true);
            //   return false;
        }

        return null; // Validation passed
    };

    const fetchData = async () => {
        try {
            const user = {
                username: formData.username,
                password: formData.password,
                role: "Khách hàng",
            };
            console.log(user);
            const res = await KhachHang_DangKyTaiKhoan(user);
            // Initialize state variables from the fetched data
            return res;
        } catch (error) {
            console.error("Error fetching user information", error);
        }
    };

    // Khi nhấn nút đăng ký tài khoản
    const handleSubmit = (e) => {
        e.preventDefault();

        const validationError = validateForm();
        if (validationError) {
            setSnackbarMessage(validationError);
            setSnackbarOpen(true);
            return;
        }
        var res = fetchData();
        // console.log(res);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper
                elevation={3}
                style={{ padding: "20px", margin: "200px 0px 50px 0px" }}
            >
                <Typography component="h1" variant="h5">
                    Đăng ký
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Tên người dùng"
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
                        label="Mật khẩu"
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
                    <TextField
                        label="Xác nhận mật khẩu"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        error={confirmPasswordError}
                        helperText={
                            confirmPasswordError && "Mật khẩu không khớp"
                        }
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{ marginTop: "20px" }}
                    >
                        Đăng ký
                    </Button>
                    <Typography align="center" style={{ marginTop: "10px" }}>
                        <Link to="/login" variant="body2">
                            Đã có tài khoản? Đăng nhập
                        </Link>
                    </Typography>
                </form>
            </Paper>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={2000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            />
        </Container>
    );
};

export default Register;
