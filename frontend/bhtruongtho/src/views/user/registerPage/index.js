import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    Container,
    Paper,
    TextField,
    Button,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        role: "", // Thêm trường vai trò
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Thêm xử lý đăng ký ở đây
        console.log("Đăng ký thành công:", formData);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper
                elevation={3}
                style={{ padding: "20px", marginTop: "100px" }}
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
                    />
                    <FormControl fullWidth variant="outlined" margin="normal">
                        <InputLabel id="role-label">Vai trò</InputLabel>
                        <Select
                            labelId="role-label"
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            label="Vai trò"
                        >
                            <MenuItem value="Nhân viên">Nhân viên</MenuItem>
                            <MenuItem value="Khách hàng">Khách hàng</MenuItem>
                        </Select>
                    </FormControl>
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
        </Container>
    );
};

export default Register;
