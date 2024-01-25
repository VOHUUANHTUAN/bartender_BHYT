import React, { memo, useState } from "react";
import { postNhanVien } from "../../../api/connect";
import { useSnackbar } from "../../../context/SnackbarContext";
import { Container, Paper, TextField, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom"; // Import Link

const AddEmployeeForm = () => {
    const { openSnackbar } = useSnackbar();

    const [employeeData, setEmployeeData] = useState({
        hoTen: "",
        diaChi: "",
        sdt: "",
        email: "",
        username: "",
        password: "",
        role: "Nhân viên", //mặc định là Nhân viên
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const { hoTen, sdt, email, password, username } = employeeData;
    
        // Kiểm tra tên không được trống
        const nameRegex = /^[a-zA-Z]+$/;
        if (!nameRegex.test(hoTen)) {
            openSnackbar("Định dạng họ tên không đúng", "warning");
            return false;
        }
    
        // Kiểm tra định dạng số điện thoại
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(sdt)) {
            openSnackbar("Định dạng số điện thoại không đúng", "warning");
            return false;
        }
    
        // Kiểm tra định dạng email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            openSnackbar("Định dạng email không đúng", "warning");
            return false;
        }
    
        // Kiểm tra định dạng mật khẩu
        if (!isValidPassword(password)) {
            openSnackbar("Mật khẩu không đúng định dạng. Yêu cầu ít nhất 8 ký tự đặc biệt, có ít nhất một ký tự hoa, một ký tự thường và một số.", "warning");
            return false;
        }
    
        // Kiểm tra định dạng username
        const usernameRegex = /^[a-zA-Z0-9_@#&]+$/;
        if (!usernameRegex.test(username)) {
            openSnackbar("Username chỉ được chứa chữ cái và số, dấu _ @ # &", "warning");
            return false;
        }
    
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const response = await postNhanVien(
                employeeData,
                localStorage.getItem("token")
            );
            console.log(response);
            if (response) {
                openSnackbar("Thêm nhân viên thành công", "success");
            } else {
                openSnackbar("Thêm nhân viên không thành công", "error");
            }
        } catch (error) {
            try {
                openSnackbar(error.response.data, "warning");
            } catch {
                openSnackbar(
                    "Có lỗi xảy ra khi kết nối với máy chủ",
                    "error"
                );
            }
        }
    };

    const isValidPassword = (newPassword) => {
        // Add your password validation logic here
        // Example: at least 8 characters, one uppercase, one lowercase, one number
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return passwordRegex.test(newPassword);
    };

    return (
        <Container component="main" maxWidth="md">
            <Paper
                elevation={3}
                style={{ padding: "20px", margin: "50px 0px" }}
            >
                <Typography component="h2" variant="h5">
                    Thêm nhân viên mới{" "}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Họ Tên"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        name="hoTen"
                        value={employeeData.hoTen}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Địa chỉ"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        name="diaChi"
                        value={employeeData.diaChi}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Số điện thoại"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        name="sdt"
                        value={employeeData.sdt}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        name="email"
                        value={employeeData.email}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Username"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        name="username"
                        value={employeeData.username}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        name="password"
                        value={employeeData.password}
                        onChange={handleInputChange}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{ marginTop: "20px" }}
                    >
                        Thêm mới{" "}
                    </Button>
                    <Button
                        variant="contained"
                        style={{
                            backgroundColor: "#96B6C5",
                            marginTop: "20px",
                        }}
                        fullWidth
                        component={Link}
                        to="/admin"
                    >
                        Quay lại
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default memo(AddEmployeeForm);