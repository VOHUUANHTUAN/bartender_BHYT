import React, { memo, useState, useEffect } from "react";
import { NV_getTongHopHoaDon } from "../../../api/connect";
import { Container, Paper, Snackbar } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

const FinancialReport = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    useEffect(() => {
        const fetchFinancialReport = async () => {
            try {
                setLoading(true);

                const financialReportData = await NV_getTongHopHoaDon(
                    localStorage.getItem("token")
                );
                console.log("Financial Report Data:", financialReportData);

                const updatedRows = financialReportData.map((row) => ({
                    ...row,
                    thoiGianGiaoDich: formatDateTime(row.thoiGianGiaoDich),
                    maHD: generateMaHD(row.maHD, row.loaiHoaDon),
                }));

                setRows(updatedRows);
            } catch (error) {
                try {
                    setSnackbarMessage("Có lỗi xảy ra khi kết nối với máy chủ");
                } catch {
                    setSnackbarMessage("Có lỗi xảy ra khi kết nối với máy chủ");
                }

                setSnackbarOpen(true);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchFinancialReport();
    }, []);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };
    // Hàm xử lý việc tạo mã hóa đơn mới dựa trên loại hóa đơn
    const generateMaHD = (stt, loaiHoaDon) => {
        if (loaiHoaDon === "Đơn đăng ký") {
            return `HDDK${stt}`;
        } else if (loaiHoaDon === "Hoàn trả") {
            return `HDHT${stt}`;
        } else {
            return ""; // Xử lý cho trường hợp loại hóa đơn khác nếu cần
        }
    };

    const formatDateTime = (dateTimeString) => {
        const options = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "numeric",
            minute: "numeric",
        };
        const date = new Date(dateTimeString);
        return date.toLocaleDateString("en-GB", options);
    };

    const columns = [
        { field: "stt", headerName: "STT", width: 100 },
        {
            field: "soTien",
            headerName: "Số Tiền",
            width: 150,
            renderCell: (params) => {
                // Xác định màu sắc và dấu + hoặc -
                const color =
                    params.row.loaiHoaDon === "Đơn đăng ký" ? "green" : "red";
                const sign =
                    params.row.loaiHoaDon === "Đơn đăng ký" ? "+" : "-";
                // Trả về giá trị của ô và áp dụng các thuộc tính style
                return (
                    <div style={{ textAlign: "right", color: color }}>
                        {sign} {params.value}
                    </div>
                );
            },
        },
        {
            field: "thoiGianGiaoDich",
            headerName: "Thời Gian Giao Dịch",
            width: 200,
        },
        { field: "loaiHoaDon", headerName: "Loại Hóa Đơn", width: 150 },
        { field: "maHD", headerName: "Mã Hóa Đơn", width: 150 },
    ];

    return (
        <Container component="main" maxWidth="md">
            <Paper
                elevation={3}
                style={{
                    padding: "20px",
                    marginTop: "20px",
                    flexGrow: 1,
                }}
            >
                <div style={{ padding: "20px", marginTop: "20px" }}>
                    <Box sx={{ height: 400, width: "100%" }}>
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
                            pageSizeOptions={[5]}
                            disableRowSelectionOnClick
                            getRowId={(row) => row.stt}
                        />
                    </Box>
                </div>
            </Paper>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={5000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            />
        </Container>
    );
};

export default memo(FinancialReport);
