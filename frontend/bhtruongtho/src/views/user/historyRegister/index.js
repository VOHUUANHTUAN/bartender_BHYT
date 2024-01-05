import React, { memo, useState, useEffect } from "react";
import { getLichSuDK, getDSDonDK } from "../../../api/connect";
import { Container, Paper, Snackbar, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "../../../context/SnackbarContext";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";



const HistoryRegister = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [TrangThai, setTrangThai] = useState("Tất cả");
    const [donDKs, setdonDKs] = useState([])

    useEffect(() => {
        if (TrangThai == "Tất cả") {
            const fetchDataByUser = async () => {
                try {
                    setdonDKs(await getDSDonDK(localStorage.getItem("token")));
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
                    setdonDKs(await getLichSuDK(
                        localStorage.getItem("token"),
                        TrangThai)
                    );
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
    }, [TrangThai]);


    const rows = donDKs.map((row, index) => {

        const locale = "vi-VN";
        const numberFormat = new Intl.NumberFormat(locale, {
            currency: "VND",
            minimumFractionDigits: 0,
        });
        return {
            id: index + 1,
            tenGoiBH: row.tenGoiBH,
            thoiGianDK: dayjs(row.thoiGianDK).format(
                "HH:mm:ss DD/MM/YYYY"
            ),
            thoiGianBD: dayjs(row.thoiGianBD).format(
                "HH:mm:ss DD/MM/YYYY"
            ),
            thoiGianHetHan: dayjs(row.thoiGianHetHan).format(
                "HH:mm:ss DD/MM/YYYY"
            ),
            soKyHanThanhToan: row.soKyHanThanhToan,
            tongGia: numberFormat.format(row.tongGia),
        };
    });

    const columns = [
        { field: "id", headerName: "STT", flex: 1 },
        {
            field: "tenGoiBH",
            headerName: "Gói Bảo Hiểm",
            minWidth: 100,
            flex: 1.5,
        },
        {
            field: "thoiGianDK",
            headerName: "Thời Gian Đăng Ký",
            minWidth: 200,
            flex: 2,
        },
        {
            field: "thoiGianBD",
            headerName: "Thời Gian Bắt Đầu",
            minWidth: 200,
            flex: 2,
        },
        {
            field: "thoiGianHetHan",
            headerName: "Thời Gian Hết Hạn",
            minWidth: 200,
            flex: 2,
        },
        {
            field: "soKyHanThanhToan",
            headerName: "Số Kỳ Hạn",
            minWidth: 100,
            flex: 1,
        },
        {
            field: "tongGia",
            headerName: "Tổng Giá",
            minWidth: 100,
            flex: 1.5,
        },
    ];

    return (<>
        <FormControl autoWidth
            style={{ margin: "20px 40px" }}
        >
            <InputLabel id="demo-simple-select-label">Tình trạng</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={TrangThai}
                label="Tình trạng"
                onChange={(event) => setTrangThai(event.target.value)}
            >
                <MenuItem value={"Tất cả"}>Tất cả</MenuItem>
                <MenuItem value={"Đã kích hoạt"}>Đã kích hoạt</MenuItem>
                <MenuItem value={"Chờ thanh toán"}>Chờ thanh toán</MenuItem>
                <MenuItem value={"Bị từ chối"}>Bị từ chối</MenuItem>
                <MenuItem value={"Chờ duyệt"}>Chờ duyệt</MenuItem>
                <MenuItem value={"Hết hạn"}>Hết hạn</MenuItem>
            </Select>
        </FormControl>
        <Container component="main" maxWidth="xl">
            <Paper
                elevation={3}
                style={{ padding: "20px", margin: "30px 0px " }}
            >
                <div style={{ padding: "20px", marginTop: "20px" }}>
                    <Typography component="h1" variant="h5">
                        Lịch sử đăng ký
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

export default memo(HistoryRegister);