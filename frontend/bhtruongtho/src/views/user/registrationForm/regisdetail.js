import React, { memo, useState, useEffect } from 'react';
import { getDonDangKyByID, getNhanVienByID, putDonDangKyByID } from '../../../api/connect';
import { useParams } from 'react-router-dom';
import { useUser } from "../../../context/UserContext";
import { Grid, Paper, Typography, Select, MenuItem, Button } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const DetailPage = () => {
    const [loading, setLoading] = useState(true);
    const [donDangKy, setDonDangKy] = useState([]);
    const [nhanVien, setNhanVien] = useState([]);
    const [maNV, SetmaNV] = useState('');
    const [thoiGianBD, setThoiGianBD] = useState('');
    const [thoiGianHetHan, setThoiGianHetHan] = useState('')
    const [diaChi, SetDiaChi] = useState('');
    const [hoTen, SetHoTen] = useState('')
    const [email, SetEmail] = useState('')
    const [sdt, setSdt] = useState('')
    const today = new Date()
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('error'); // 'error', 'success', 'warning', 'info'

    const params = useParams();
    const { user } = useUser();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (params.id) {
                    const data = await getDonDangKyByID(params.id);
                    setDonDangKy(data);

                } else {
                    console.error('No selected ID found.');
                }
            } catch (error) {
                console.error('Error fetching Don Dang Ky data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [params.id]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (user.username) {
                    const data = await getNhanVienByID(user.username);
                    setNhanVien(data);
                    SetmaNV(data.maNV);
                    setThoiGianBD(today);
                    const oneYearLater = new Date(today);
                    oneYearLater.setFullYear(today.getFullYear() + 1);
                    setThoiGianHetHan(oneYearLater);
                    SetDiaChi(data.diaChi);
                    SetEmail(data.email);
                    SetHoTen(data.hoTen);
                    setSdt(data.sdt)
                } else {
                    console.error('No username found.');
                }
            } catch (error) {
                console.error('Error fetching Nhan Vien data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [user]);

    const updateStatus = async () => {
        console.log('donDangKy.tinhTrang:', donDangKy.tinhTrang);

        try {
            if (donDangKy.tinhTrang === 'Chờ duyệt') {
                await putDonDangKyByID(params.id, {
                    tinhTrang: 'Đã kích hoạt',
                    maNV,
                    thoiGianBD,
                    diaChi,
                    email,
                    hoTen,
                    sdt,
                    thoiGianHetHan,

                });
                openSnackbar('Cập nhật thành công!', 'success');
            }
            else {
                openSnackbar('Trạng thái này không thể kích hoạt', 'warning');

            }
        } catch (error) {
            console.error('Error updating status:', error);
            openSnackbar('Có lỗi xảy ra khi cập nhật!', 'error');

        }
    };
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
    return (
        <div className="container__body">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Grid container spacing={2} justifyContent="flex-end">
                    <Grid item xs={12} sm={5}>
                        <Paper elevation={3} style={{ padding: 16 }}>
                            <Typography variant="h4" style={{ paddingBottom: '10px', color: 'rgb(25, 118, 210)' }}>Thông tin gói bảo hiểm</Typography>
                            {donDangKy.goiBaoHiem ? (
                                <>
                                    <Typography variant="body1">Tên gói bảo hiểm: {donDangKy.goiBaoHiem.tenGoiBH}</Typography>
                                    <Typography variant="body1">Mô tả gói bảo hiểm: {donDangKy.goiBaoHiem.motaGoiBH}</Typography>
                                    <Typography variant="body1">Giá: {donDangKy.goiBaoHiem.gia}</Typography>

                                </>
                            ) : (
                                <Typography variant="body1">Goi Bao Hiem information not available.</Typography>
                            )}
                        </Paper>
                        <Paper elevation={3} style={{ marginTop: 16, padding: 16 }}>


                            <Typography variant="h4" style={{ paddingBottom: '10px', color: 'rgb(25, 118, 210)' }}>Thông tin khách hàng</Typography>
                            {donDangKy.khachHang ? (
                                <>
                                    <Typography variant="body1">Họ Tên: {donDangKy.khachHang.hoTen}</Typography>
                                    <Typography variant="body1">Địa Chỉ: {donDangKy.khachHang.diaChi}</Typography>
                                    <Typography variant="body1">Số điện thoại: {donDangKy.khachHang.sdt}</Typography>
                                    <Typography variant="body1">Email: {donDangKy.khachHang.email}</Typography>

                                    {/* Add more properties as needed */}
                                </>
                            ) : (
                                <Typography variant="body1">Khach Hang information not available.</Typography>
                            )}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={7}>
                        <Paper elevation={3} style={{ padding: 16 }}>
                            <Typography variant="h4" style={{ paddingBottom: '10px', color: 'rgb(25, 118, 210)' }}>Thông tin đơn đăng kí {params.id} </Typography>

                            <div style={{ marginBottom: '10px', backgroundColor: '#f0f0f0', padding: '8px', borderRadius: '4px' }}>
                                <Typography variant="body1">Thời gian đăng ký: {new Date(donDangKy.thoiGianDK).toLocaleTimeString()} {new Date(donDangKy.thoiGianDK).toLocaleDateString()}</Typography>
                            </div>

                            <div style={{ marginBottom: '10px', backgroundColor: '#f0f0f0', padding: '8px', borderRadius: '4px' }}>
                                <Typography variant="body1">Thời gian bắt đầu: {donDangKy.thoiGianBD ? new Date(donDangKy.thoiGianBD).toLocaleTimeString() + ' ' + new Date(donDangKy.thoiGianBD).toLocaleDateString() : 'Chưa kích hoạt'}</Typography>
                            </div>

                            <div style={{ marginBottom: '10px', backgroundColor: '#f0f0f0', padding: '8px', borderRadius: '4px' }}>
                                <Typography variant="body1">Thời gian hết hạn: {donDangKy.thoiGianHetHan ? new Date(donDangKy.thoiGianHetHan).toLocaleTimeString() + ' ' + new Date(donDangKy.thoiGianHetHan).toLocaleDateString() : 'Chưa kích hoạt'}</Typography>
                            </div>

                            <div style={{ marginBottom: '10px', backgroundColor: '#f0f0f0', padding: '8px', borderRadius: '4px' }}>
                                <Typography variant="body1">Lựa chọn thanh toán: {donDangKy.luaChonThanhToan}</Typography>
                            </div>

                            <div style={{ marginBottom: '10px', backgroundColor: '#f0f0f0', padding: '8px', borderRadius: '4px' }}>
                                <Typography variant="body1">Tổng giá: {donDangKy.tongGia}</Typography>
                            </div>

                            <div style={{ backgroundColor: '#f0f0f0', padding: '8px', borderRadius: '4px' }}>
                                <Typography variant="body1">Tình trạng hiện tại: {donDangKy.tinhTrang}</Typography>
                            </div>
                        </Paper>

                    </Grid>


                    <Grid item xs={12} justifyContent="flex-end">
                        <Button variant="contained" style={{ marginBottom: "10px", backgroundColor: 'rgb(25, 118, 210)' }} onClick={updateStatus}>Duyệt đơn</Button>
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
        </div >
    );
};

export default memo(DetailPage);
