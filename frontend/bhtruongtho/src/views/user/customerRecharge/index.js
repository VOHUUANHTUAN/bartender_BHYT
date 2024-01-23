import React, { memo, useState, useEffect } from "react";
import { NV_getInfoCustomer, getInfoUser, customerRecharge } from "../../../api/connect";
import { Paper, Typography, FormControl, InputLabel, Select, MenuItem, Grid, Button, Input, FormLabel } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Link, useNavigate } from "react-router-dom";



const CustomerRecharge = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);     //gọi api lấy danh sách người dùng
    const [now_user, setNow_User] = useState("Tất cả")      //lấy ra người dùng hiện tại đang chọn
    const [info, setInfo] = useState('')
    const [sotien, setSoTien] = useState('')    //số tiền nạp
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('error'); // 'error', 'success', 'warning', 'info'

    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                setUsers(await NV_getInfoCustomer(localStorage.getItem("token")));
                setInfo(await getInfoUser(now_user, localStorage.getItem("token")));
            }
            catch (error) {
                setError(error);
            }
            finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [now_user, snackbarOpen]);

    const napTienVaoTK = async () => {
        try {
            // Kiểm tra đã nhập số tiền chưa
            if (sotien.trim() === '') {
                openSnackbar('Vui lòng nhập số tiền!', 'warning');
                return;
            }
            // Kiểm tra xem dữ liệu nhập vào form số tiền có phải là số không
            else if (isNaN(sotien)) {
                // Nếu không phải là số, hiển thị thông báo lỗi
                openSnackbar('Vui lòng nhập số!', 'warning');
                return;
            }
            // Kiểm tra số tiền là số dương
            else if (sotien <= 0) {
                openSnackbar('Vui lòng nhập số tiền là số dương', 'warning');
                return;
            }
            // Kiểm tra số tiền là số nguyên
            else if (Number.isInteger(sotien)) {
                openSnackbar('Vui lòng nhập số tiền là số nguyên', 'warning');
                return;
            }
            else {
                const userConfirmed = window.confirm(
                    "Bạn có chắc chắn nạp tiền?"
                );

                if (userConfirmed) {
                    await customerRecharge(now_user, sotien, localStorage.getItem("token"));
                    openSnackbar('Nạp tiền thành công!', 'success');
                    return;
                }
            }
        }
        catch (error) {
            console.error('Error updating status:', error);
            // openSnackbar('Có lỗi xảy ra khi cập nhật!', 'error');
            openSnackbar('Vui lòng nhập số tiền là số nguyên', 'warning');

        }
    };

    const troVe = () => {
        navigate(`/staff`);
    }

    const openSnackbar = (message, severity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    return (<>
        <FormControl
            style={{ margin: "20px 40px" }}
            sx={{ m: 1, minWidth: 125 }}
        >
            <InputLabel id="demo-simple-select-label"  >Mã khách hàng</InputLabel>
            <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select"
                value={now_user}
                label="Age"
                onChange={(event) => setNow_User(event.target.value)}
            >
                {users.map((user, index) => (
                    <MenuItem value={user.username}>{user.maKH}</MenuItem>
                ))}
            </Select>
        </FormControl>
        {loading ? (
            <p>Loading...</p>
        ) : (

            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={7}>
                    <Paper elevation={3} style={{ padding: 16 }}>
                        <Typography variant="h4" style={{ paddingBottom: '10px', color: 'rgb(25, 118, 210)' }}>Thông tin khách hàng </Typography>

                        <div style={{ marginBottom: '10px', backgroundColor: '#f0f0f0', padding: '8px', borderRadius: '4px' }}>
                            <Typography variant="body1">Họ tên khách hàng: {info.hoTen} </Typography>
                        </div>

                        <div style={{ marginBottom: '10px', backgroundColor: '#f0f0f0', padding: '8px', borderRadius: '4px' }}>
                            <Typography variant="body1">Ngày sinh: {new Date(info.ngaySinh).toLocaleDateString()}</Typography>
                        </div>

                        <div style={{ marginBottom: '10px', backgroundColor: '#f0f0f0', padding: '8px', borderRadius: '4px' }}>
                            <Typography variant="body1">Giới tính: {info.gioiTinh}</Typography>
                        </div>

                        <div style={{ marginBottom: '10px', backgroundColor: '#f0f0f0', padding: '8px', borderRadius: '4px' }}>
                            <Typography variant="body1">CCCD: {info.cccd}</Typography>
                        </div>

                        <div style={{ marginBottom: '10px', backgroundColor: '#f0f0f0', padding: '8px', borderRadius: '4px' }}>
                            <Typography variant="body1">Địa chỉ: {info.diaChi}</Typography>
                        </div>

                        <div style={{ marginBottom: '10px', backgroundColor: '#f0f0f0', padding: '8px', borderRadius: '4px' }}>
                            <Typography variant="body1">Số điện thoại: {info.sdt}</Typography>
                        </div>

                        <div style={{ marginBottom: '10px', backgroundColor: '#f0f0f0', padding: '8px', borderRadius: '4px' }}>
                            <Typography variant="body1">Email: {info.email}</Typography>
                        </div>

                        <div style={{ marginBottom: '10px', backgroundColor: '#f0f0f0', padding: '8px', borderRadius: '4px' }}>
                            <Typography variant="body1">Tên tài khoản: {info.username}</Typography>
                        </div>

                        <div style={{ marginBottom: '10px', backgroundColor: '#f0f0f0', padding: '8px', borderRadius: '4px' }}>
                            <Typography variant="body1">Mã khách hàng: {info.maKH}</Typography>
                        </div>

                        <div style={{ marginBottom: '10px', backgroundColor: '#f0f0f0', padding: '8px', borderRadius: '4px' }}>
                            <Typography variant="body1">Số dư: {info.soDu}</Typography>
                        </div>

                        <Typography variant="body1">

                            <div style={{ backgroundColor: '#f0f0f0', padding: '8px', borderRadius: '4px', marginTop: '10px', display: 'flex', flexDirection: 'column' }}>
                                <FormLabel htmlFor="denialReason" style={{ marginBottom: '4px' }}>Số tiền nạp:</FormLabel>
                                <Input
                                    type="integer"
                                    id="denialReason"
                                    value={sotien}
                                    onChange={(e) => setSoTien(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '8px',
                                        boxSizing: 'border-box',
                                        borderRadius: '4px',
                                        border: '1px solid #ccc',
                                    }}
                                />
                            </div>

                        </Typography>
                    </Paper>
                </Grid>
                <Grid container spacing={2} style={{ padding: 16 }}>
                    <Grid item xs={6} >
                        <Button variant="contained" style={{ marginLeft: "350px", marginBottom: "10px", backgroundColor: 'rgb(25, 118, 210)' }} onClick={troVe}>Trở về</Button>
                    </Grid>
                    <Grid style={{ display: 'flex', justifyContent: 'flex-end' }} item xs={6} >
                        <Button variant="contained" style={{ marginRight: "350px", marginBottom: "10px", backgroundColor: 'rgb(25, 118, 210)' }} onClick={napTienVaoTK}>Nạp tiền</Button>
                    </Grid>
                </Grid>
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <MuiAlert
                        elevation={6}
                        variant="filled"
                        severity={snackbarSeverity}
                        onClose={handleCloseSnackbar}
                    >
                        {snackbarMessage}
                    </MuiAlert>
                </Snackbar>
            </Grid>
        )
        }
    </>
    );
};

export default memo(CustomerRecharge);