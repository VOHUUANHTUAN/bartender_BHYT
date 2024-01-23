import React, { memo, useState } from 'react';
import { postNhanVien } from '../../../api/connect';
import { useSnackbar } from "../../../context/SnackbarContext";
import { Container, Paper, TextField, Button, Typography } from "@mui/material";
import { Link } from 'react-router-dom'; // Import Link

const AddEmployeeForm = () => {
    const { openSnackbar } = useSnackbar();

    const [employeeData, setEmployeeData] = useState({
        hoTen: '',
        diaChi: '',
        sdt: '',
        email: '',
        username: '',
        password: '',
        role: 'Nhân viên', //mặc định là Nhân viên
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await postNhanVien(employeeData, localStorage.getItem("token"));
            console.log(response)
            if (response) {
                openSnackbar('Đăng kí nhân viên thành công', 'success');

            } else {
                openSnackbar('Đăng kí nhân viên không thành công', 'error');
            }
        } catch (error) {
            openSnackbar('Lỗi kết nối với server', 'error');
        }
    };



    return (
        <Container component="main" maxWidth="xl">
            <Paper elevation={3} style={{ padding: "20px", margin: "100px 0px 50px 0px" }}>
                <Typography component="h2" variant="h5">
                    Thêm nhân viên mới                 </Typography>
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
                    <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: "20px" }}>
                        Thêm mới                     </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        component={Link} // Use Link component
                        to="/admin"    // Specify the target route
                        style={{ marginTop: "20px" }}
                    >
                        Quay lại
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default memo(AddEmployeeForm);
