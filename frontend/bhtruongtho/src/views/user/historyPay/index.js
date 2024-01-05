import React, { memo, useState, useEffect } from "react";
import { getLichSuDaThanhToan, getAllLichSuDaThanhToan, NV_getInfoCustomer } from "../../../api/connect";
import { Container, Paper, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import { DataGrid } from "@mui/x-data-grid";



const HistoryPay = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);     //gọi api lấy danh sách người dùng
    const [now_user, setNow_User] = useState("Tất cả")      //lấy ra người dùng hiện tại đang chọn
    const [hoadons, setHoaDons] = useState([])

    useEffect(() => {
        // Nếu đang chọn "Tất cả" thì gọi api lấy tất cả các hóa đơn thanh toán của tất cả khách hàng
        if (now_user == "Tất cả") {
            const fetchDataByUser = async () => {
                try {
                    setHoaDons(await getAllLichSuDaThanhToan());
                    setUsers(await NV_getInfoCustomer(localStorage.getItem("token")));
                }
                catch (error) {
                    setError(error);
                }
                finally {
                    setLoading(false);
                }
            }
            fetchDataByUser();
        }
        else {
            const fetchDataByUser = async () => {
                try {
                    setHoaDons(await getLichSuDaThanhToan(now_user));
                    setUsers(await NV_getInfoCustomer(localStorage.getItem("token")));
                }
                catch (error) {
                    setError(error);
                }
                finally {
                    setLoading(false);
                }
            }
            fetchDataByUser();
        }
    }, [now_user]);


    const rows = hoadons.map((row, index) => {

        const locale = "vi-VN";
        const numberFormat = new Intl.NumberFormat(locale, {
            currency: "VND",
            minimumFractionDigits: 0,
        });
        return {
            // id: index + 1,
            // tenGoiBH: row.tenGoiBH,
            // thoiGianDK: dayjs(row.thoiGianDK).format(
            //     "HH:mm:ss DD/MM/YYYY"
            // ),
            // thoiGianBD: dayjs(row.thoiGianBD).format(
            //     "HH:mm:ss DD/MM/YYYY"
            // ),
            // thoiGianHetHan: dayjs(row.thoiGianHetHan).format(
            //     "HH:mm:ss DD/MM/YYYY"
            // ),
            // soKyHanThanhToan: row.soKyHanThanhToan,
            // tongGia: numberFormat.format(row.tongGia),
            id: index + 1,
            maHD: row.maHD,
            thoiGianHetHan: dayjs(row.thoiGianHetHan).format(
                "HH:mm:ss DD/MM/YYYY"
            ),
            hanKy: row.hanKy,
            tinhTrangThanhToan: row.tinhTrangThanhToan,
            tongTien: numberFormat.format(row.tongTien),
            thoiGianThanhToan: dayjs(row.thoiGianThanhToan).format(
                "HH:mm:ss DD/MM/YYYY"
            ),
            maDonDK: row.maDonDK,
            maKH: row.maKH,
        };
    });

    const columns = [
        { field: "id", headerName: "STT", flex: 1 },
        {
            field: "maHD",
            headerName: "Hợp Đồng",
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
        {
            field: "maKH",
            headerName: "Khách Hàng",
            minWidth: 100,
            flex: 1,
        },
    ];

    return (<>
        <FormControl 
            style={{ margin: "20px 40px" }}
        >
            <InputLabel id="demo-simple-select-label" fullWidth >Mã khách hàng</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={now_user}
                label="Age"
                onChange={(event) => setNow_User(event.target.value)}
                
            >
                <MenuItem value={"Tất cả"}>Tất cả</MenuItem>
                {users.map((user, index) => (
                    <MenuItem value={user.username}>{user.maKH}</MenuItem>
                ))}
            </Select>
        </FormControl>
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
                            pageSize={5}
                            autoWidth
                            disableRowSelectionOnClick
                            getRowId={(row) => row.id}
                        />
                    </Box>
                </div>
            </Paper>
        </Container>
    </>
    );
};

export default memo(HistoryPay);