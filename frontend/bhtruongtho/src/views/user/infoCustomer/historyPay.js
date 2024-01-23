import React, { memo, useState, useEffect } from "react";
import { getLichSuThanhToan } from "../../../api/connect";
import { Container, Paper, Typography, Grid, Button } from "@mui/material";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import { DataGrid } from "@mui/x-data-grid";
import { useParams, useNavigate } from "react-router-dom";




const HistoryPay = () => {
    const params = useParams();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hoadons, setHoaDons] = useState([])
    const [maKH, setMaKH] = useState(params.id);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDataByUser = async () => {
            try {
                // setMaKH = params.id;
                const api = await getLichSuThanhToan(maKH, localStorage.getItem("token"));
                setHoaDons(api);
                console.log(hoadons);
            }
            catch (error) {
                setError(error);
            }
            finally {
                setLoading(false);
            }
        }
        fetchDataByUser();

    }, [maKH]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const rows = hoadons.map((row, index) => {

        const locale = "vi-VN";
        const numberFormat = new Intl.NumberFormat(locale, {
            currency: "VND",
            minimumFractionDigits: 0,
        });
        return {
            id: index + 1,
            maHD: row.maHD,
            thoiGianHetHan: dayjs(row.thoiGianHetHan).format(
                "DD/MM/YYYY"
            ),
            hanKy: row.hanKy,
            tinhTrangThanhToan: row.tinhTrangThanhToan,
            tongTien: numberFormat.format(row.tongTien),
            thoiGianThanhToan: row.thoiGianThanhToan === null ? "" : dayjs(row.thoiGianThanhToan).format(
                "DD/MM/YYYY HH:mm:ss"
            ),
            maDonDK: row.maDonDK,
        };
    });

    const columns = [
        { field: "id", headerName: "STT", flex: 1 },
        {
            field: "maHD",
            headerName: "Hóa Đơn",
            minWidth: 50,
            flex: 1,
        },
        {
            field: "thoiGianHetHan",
            headerName: "Thời Gian Hết Hạn",
            minWidth: 200,
            flex: 2,
        },
        {
            field: "hanKy",
            headerName: "Hạn Kỳ",
            minWidth: 100,
            flex: 1,
        },
        {
            field: "tinhTrangThanhToan",
            headerName: "Tình Trạng Thanh Toán",
            minWidth: 200,
            flex: 2,
            renderCell: (params) => {
                // Xác định màu sắc và dấu + hoặc -
                const color =
                    params.row.tinhTrangThanhToan === "Đã thanh toán" ? "green" : "red";
                return (
                    <div style={{ textAlign: "right", color: color }}>
                        {params.value}
                    </div>
                );
            },
        },
        {
            field: "tongTien",
            headerName: "Tổng Tiền",
            minWidth: 100,
            flex: 1.5,
        },
        {
            field: "thoiGianThanhToan",
            headerName: "Thời Gian Thanh Toán",
            minWidth: 100,
            flex: 2,
        },
        {
            field: "maDonDK",
            headerName: "Đơn Đăng Ký",
            minWidth: 100,
            flex: 1,
        },
    ];

    const troVe = () => {
        navigate(`/infoCustomer`);
    }


    return (<>
        <Container component="main" maxWidth="xl">
            <Paper
                elevation={3}
                style={{ padding: "20px", margin: "30px 0px " }}
            >
                <div style={{ padding: "20px", marginTop: "20px" }}>
                    <Typography component="h1" variant="h5">
                        Lịch sử thanh toán
                    </Typography>
                    <Box sx={{ height: 400, width: "100%", flexGrow: 1 }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            initialState={{
								pagination: {
									paginationModel: {
										pageSize: 5,
									},
								},
							}}
                            autoWidth
                            disableRowSelectionOnClick
                            pageSizeOptions={[5]}
                            getRowId={(row) => row.id}
                        />
                    </Box>
                </div>
            </Paper>
        </Container>
        <Grid item xs={6} textAlign = 'center' >
            <Button variant="contained" style={{ backgroundColor: 'rgb(25, 118, 210)' }} onClick={troVe}>Trở về</Button>
        </Grid>
    </>
    );
};

export default memo(HistoryPay);