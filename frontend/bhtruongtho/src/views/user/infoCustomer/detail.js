import React, { memo, useState, useEffect } from 'react';
import { getKhachHangInformationByID } from '../../../api/connect';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, TextField, Grid, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";



const DetailCustomer = () => {
    const { id } = useParams(); // Sử dụng destructuring để lấy id từ params
    const [dataKhachHang, setDataKhachHang] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState('');
    const [hoTen, setHoTen] = useState('');
    const [CCCD, setCCCD] = useState('');
    const [gioiTinh, setGioiTinh] = useState('');
    const [ngaySinh, setNgaySinh] = useState(null);
    const [diaChi, setDiaChi] = useState('');
    const [email, setEmail] = useState('');
    const [soDienThoai, setSoDienThoai] = useState('');
    const [soDu, setSoDu] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const khachHangData = await getKhachHangInformationByID(localStorage.getItem("token"), id);
                setDataKhachHang(khachHangData);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]); // Thêm id vào dependency array để useEffect được gọi lại khi id thay đổi
    useEffect(() => {
        if (dataKhachHang) {
            setUsername(dataKhachHang.username || '');
            setHoTen(dataKhachHang.hoTen || '');
            setCCCD(dataKhachHang.cccd || '');
            setGioiTinh(dataKhachHang.gioiTinh || '');
            setNgaySinh(dayjs(dataKhachHang.ngaySinh) || null);
            setDiaChi(dataKhachHang.diaChi || '');
            setEmail(dataKhachHang.email || '');
            setSoDienThoai(dataKhachHang.soDienThoai || '');
            setSoDu(formatCurrency(dataKhachHang.soDu) || "");
        }
    }, [dataKhachHang]);
    const formatCurrency = (amount) => {
        const formattedAmount = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount);

        return formattedAmount;
    };
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }


    return (
        <Container component="main" maxWidth="md">
            <Paper elevation={3} style={{ padding: "20px", margin: "30px 0px " }}>
                <Typography component="h1" variant="h5">
                    Thông tin cá nhân
                </Typography>
                <form>
                    <TextField
                        label="Username"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                        value={username}
                    />

                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                label="Họ tên"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                disabled
                                value={hoTen}
                            />
                        </Grid>
                        <Grid item xs={6} dateAdapter={AdapterDayjs}>
                            <TextField
                                label="CCCD"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                disabled
                                value={CCCD}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <FormControl
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                required
                            >
                                <InputLabel id="gioiTinh-label">
                                    Giới tính
                                </InputLabel>
                                <Select
                                    labelId="gioiTinh-label"
                                    id="gioiTinh"
                                    value={gioiTinh}
                                    label="Giới tính"
                                    disabled                                >
                                    <MenuItem value="Nam">Nam</MenuItem>
                                    <MenuItem value="Nữ">Nữ</MenuItem>
                                    {/* Add more options as needed */}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} dateAdapter={AdapterDayjs}>
                            <FormControl
                                fullWidth
                                style={{ marginTop: "15px" }}
                            >
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                >
                                    <DatePicker
                                        label="Ngày sinh"
                                        value={ngaySinh}
                                        disabled
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                fullWidth
                                                variant="outlined"
                                                margin="normal"
                                            />
                                        )}
                                        format="DD/MM/YYYY"
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>

                        <TextField
                            label="Địa chỉ"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            value={diaChi}
                            disabled />
                        <TextField
                            label="Email"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            value={email}
                            disabled />
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    label="Số điện thoại"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    required
                                    value={soDienThoai}
                                    disabled />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Số dư"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    value={soDu}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{ marginTop: "20px" }}
                        onClick={() => navigate(-1)} // Navigate back to previous page

                    >
                        quay lại                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default memo(DetailCustomer);