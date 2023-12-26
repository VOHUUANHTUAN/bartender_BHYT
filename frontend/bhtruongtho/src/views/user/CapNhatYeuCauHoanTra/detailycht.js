import React, { memo, useState, useEffect } from 'react';
import { putYeuCauHoanTraByID, getNhanVienByID, getAllYeuCauHoanTraBYID } from '../../../api/connect';
import { useParams } from 'react-router-dom';
import { useUser } from "../../../context/UserContext";
import { Grid, Paper, Typography, Select, MenuItem, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
const DetailPage = () => {
    const [loading, setLoading] = useState(true);
    const [yeuCauHoanTra, setYeuCauHoanTra] = useState({});
    const [selectedStatus, setSelectedStatus] = useState('');
    const [maNV, setMaNV] = useState('');
    const [nhanVien, setNhanVien] = useState('');
    const [thoiGianDuyet, setThoiGianDuyet] = useState('');
    const today = new Date();

    const params = useParams();
    const { user } = useUser();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('error');


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (user.username) {
                    const data = await getNhanVienByID(user.username);
                    setNhanVien(data);
                    setMaNV(data.maNV);
                    setThoiGianDuyet(today);
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
        try {
            if (yeuCauHoanTra.tinhTrang === 'Chờ duyệt') {
                // Send a request to the backend to update the status to "Đã hoàn tiền"
                await putYeuCauHoanTraByID(params.id, {
                    tinhTrang: "Đã hoàn tiền",
                    maNV,
                    thoiGianDuyet,
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
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (params.id) {
                    // Fetch updated data after updating the status
                    const updatedData = await getAllYeuCauHoanTraBYID(params.id);
                    setYeuCauHoanTra(updatedData);
                    console.log("ok")
                } else {
                    console.error('No selected ID found.');
                }
            } catch (error) {
                console.error('Error fetching Yeu Cau Hoan Tra data:', error);
            } finally {
                setLoading(false);
            }
        };

        // Trigger data fetching when yeuCauHoanTra or params.id changes
        fetchData();
    }, [params.id, yeuCauHoanTra]);
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
    // Vietnamese names for keys
    const allrows = {
        maYC: <strong>Mã YC</strong>,
        maHDKhamBenh: <strong>Mã HĐ Khám Bệnh</strong>,
        tenBenhVien: <strong>Tên Bệnh Viện</strong>,
        soTienDaKham: <strong>Số Tiền Đã Khám</strong>,
        benh: <strong>Bệnh</strong>,
        thoiGianTao: <strong>Thời Gian Tạo</strong>,
        tinhTrang: <strong>Tình Trạng</strong>,
        maGoiBHApDung: <strong>Mã Gói Bảo Hiểm Áp Dụng</strong>,
        soTienHoanTra: <strong>Số Tiền Hoàn Trả</strong>,
        maKH: <strong>Mã Khách Hàng</strong>,
        maNV: <strong>Mã Nhân Viên</strong>,
        thoiGianDuyet: <strong>Thời Gian Duyệt</strong>,
    };

    return (
        <div className="container__body">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper style={{ margin: "20px" }}>

                        <TableContainer component={Paper} style={{ borderCollapse: 'collapse', border: '1px solid #ddd', padding: "20px" }}>
                            <Typography variant="h5" gutterBottom style={{ color: 'rgb(25, 118, 210)' }}>
                                Yêu cầu hoàn trả                        </Typography>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell><strong>Thuộc Tính</strong></TableCell>
                                        <TableCell>Giá Trị</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Object.entries(yeuCauHoanTra).map(([key, value]) => (
                                        <TableRow key={key} >
                                            <TableCell >{allrows[key]}</TableCell>
                                            <TableCell>{value}</TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow>
                                        <TableCell style={{ textAlign: 'left' }}>
                                            <Button variant="contained" color="primary" onClick={updateStatus}>
                                                Duyệt
                                            </Button>
                                        </TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </Paper>
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
        </div >
    );
};

export default memo(DetailPage);
