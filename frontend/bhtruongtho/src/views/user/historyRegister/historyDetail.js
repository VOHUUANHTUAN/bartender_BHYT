import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {Paper, Typography, Button, Grid, Snackbar} from "@mui/material";
import { getGoiBHByMaGBH, getDonDangKyByID,} from "../../../api/connect";


const historyDetail = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [goibh, setGoiBH] = useState(null);
    const [dondk, setDonDK] = useState(null);
    //Bảng thông báo
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const fetchDataGoiBH = async () => {
        try {
            const response = await getGoiBHByMaGBH(params.maGoiBH);
            setGoiBH(response);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const fetchDataDonDK = async () => {
        try {
            const response = await getDonDangKyByID(params.maDonDK);
            setDonDK(response);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    useEffect(() => {
        fetchDataGoiBH();
        fetchDataDonDK
    }, [params.maGoiBH, params.maDonDK]);

    const troVe = () => {
        navigate(`/historyRegister`);
    }
    return (
        <>
            {loading ? (
                <p>Loading...</p>
            ) : (

                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} sm={7}>
                        <Paper elevation={3} style={{ padding: 16 }}>
                            <Typography variant="h4" style={{ paddingBottom: '10px', color: 'rgb(25, 118, 210)' }}>Thông tin đăng ký </Typography>

                            <Typography variant="subtitle1">
                                Thông tin gói bảo hiểm đã chọn:
                            </Typography>
                            <Typography variant="body1">
                                Tên gói bảo hiểm: {goibh.tenGoiBH}
                            </Typography>
                            <Typography variant="body1">
                                Mô tả: {goibh.motaGoiBH}
                            </Typography>
                            <Typography variant="body1">
                                Giá cơ bản: {goibh.gia}đ
                            </Typography>
                            <Typography variant="body1">
                                Tỉ lệ hoàn tiền: {goibh.tiLeHoanTien}%
                            </Typography>

                            <div style={{ marginBottom: '10px', backgroundColor: '#f0f0f0', padding: '8px', borderRadius: '4px' }}>
                                <Typography variant="body1">Thời hạn: {dondk.thoiGianBD} </Typography>
                            </div>

                            <div style={{ marginBottom: '10px', backgroundColor: '#f0f0f0', padding: '8px', borderRadius: '4px' }}>
                                <Typography variant="body1">Ngày bắt đầu: {new Date(dondk.thoiGianBD).toLocaleDateString()}</Typography>
                            </div>

                            <div style={{ marginBottom: '10px', backgroundColor: '#f0f0f0', padding: '8px', borderRadius: '4px' }}>
                                <Typography variant="body1">Ngày kết thúc: {new Date(dondk.thoiGianHetHan).toLocaleDateString()}</Typography>
                            </div>

                            <div style={{ marginBottom: '10px', backgroundColor: '#f0f0f0', padding: '8px', borderRadius: '4px' }}>
                                <Typography variant="body1">Số kỳ hạn: {dondk.soKyHanThanhToan}</Typography>
                            </div>

                            <div style={{ marginBottom: '10px', backgroundColor: '#f0f0f0', padding: '8px', borderRadius: '4px' }}>
                                <Typography variant="body1">Tổng giá: {dondk.tongGia}</Typography>
                            </div>

                            <div style={{ marginBottom: '10px', backgroundColor: '#f0f0f0', padding: '8px', borderRadius: '4px' }}>
                                <Typography variant="body1">Tình trạng: {dondk.tinhTrang}</Typography>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid container spacing={2} style={{ padding: 16 }}>
                        <Grid item xs={6} >
                            <Button variant="contained" style={{ marginLeft: "350px", marginBottom: "10px", backgroundColor: 'rgb(25, 118, 210)' }} onClick={troVe}>Trở về</Button>
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

export default memo(historyDetail);
