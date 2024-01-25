import CreditCardIcon from "@mui/icons-material/CreditCard";
import HistoryIcon from "@mui/icons-material/History";
import InfoIcon from "@mui/icons-material/Info";
import { Container, Paper, Snackbar } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { DataGrid } from "@mui/x-data-grid";
import React, { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NV_getInfoCustomer } from "../../../api/connect";
import { useUser } from "../../../context/UserContext";
const InfoCustomer = () => {
    const { user } = useUser();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const navigate = useNavigate();
    // Function to format date time without hours and minutes
    function formatDateTime(dateTimeString) {
        const options = { year: "numeric", month: "2-digit", day: "2-digit" };
        const date = new Date(dateTimeString);
        const formattedDate = date.toLocaleDateString("en-GB", options);
        return formattedDate;
    }

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                setLoading(true);

                const customerInfo = await NV_getInfoCustomer(
                    localStorage.getItem("token")
                );
                // console.log("Thông Tin Khách Hàng:", customerInfo);

                // Trực tiếp cập nhật rows bằng dữ liệu từ customerInfo
                setRows(
                    customerInfo.map((row) => ({
                        id: row.maKH, // Đảm bảo mỗi row có một id duy nhất
                        maKH: row.maKH,
                        hoTen: row.hoTen,
                        ngaySinh: formatDateTime(row.ngaySinh),
                        gioiTinh: row.gioiTinh,
                        // cccd: row.cccd,
                        // diaChi: row.diaChi,
                        // sdt: row.sdt,
                        // email: row.email,
                        // soDu: row.soDu,
                        // username: row.username,
                    }))
                );
            } catch (error) {
                try {
                    setSnackbarMessage(error.response.data);
                } catch {
                    setSnackbarMessage("Có lỗi xảy ra khi kết nối với máy chủ");
                }

                setSnackbarOpen(true);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchInfo();
    }, []);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };
    const handleInfoClick = (rowData) => {
        navigate(`../staff/InfoCustomer/detail/${rowData.id}`); // Sử dụng rowData.id thay vì id
    };

    const handleHistoryClick = (rowData) => {
        navigate(`../staff/InfoCustomer/historyPay/${rowData.id}`); // Sử dụng rowData.id thay vì id
        console.log("Assignment clicked for row with ID:", rowData.id);
    };

    const handleCreditCardClick = (rowData) => {
        navigate(`../staff/infoCustomer/recharge/${rowData.id}`); // Sử dụng rowData.id thay vì id
    };
    const columns = [
        { field: "maKH", headerName: "Mã KH", width: 100 },
        { field: "hoTen", headerName: "Họ và tên", width: 220 },
        { field: "ngaySinh", headerName: "Ngày sinh", width: 120 },
        { field: "gioiTinh", headerName: "Giới tính", width: 120 },
        // { field: "cccd", headerName: "CCCD", width: 150 },
        // { field: "diaChi", headerName: "Địa chỉ", width: 200 },
        // { field: "sdt", headerName: "Số điện thoại", width: 150 },
        // { field: "email", headerName: "Email", width: 200 },
        // { field: "soDu", headerName: "Số dư", width: 120 },
        // { field: "username", headerName: "Username", width: 120 },
        {
            field: "actions",
            headerName: "Actions",
            width: 400,
            renderCell: (params) => (
                <div>
                    <Tooltip title="Chi tiết">
                        <IconButton onClick={() => handleInfoClick(params.row)}>
                            <InfoIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Lịch sử thanh toán">
                        <IconButton
                            onClick={() => handleHistoryClick(params.row)}
                        >
                            <HistoryIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Nạp tiền">
                        <IconButton
                            onClick={() => handleCreditCardClick(params.row)}
                        >
                            <CreditCardIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            ),
        },
    ];

    useEffect(() => {
        console.log("Rows:", rows);
    }, [rows]);

    return (
        <Container
            component="main"
            maxWidth="md"
            style={{
                display: "flex",
                flexDirection: "column",
                height: "100vh",
            }}
        >
            <Paper
                elevation={3}
                style={{
                    padding: "20px",
                    marginTop: "20px",
                    flexGrow: 1, // Đảm bảo chiều dài của Paper mở rộng theo chiều dài của Container
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
                            getRowId={(row) => row.id}
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

export default memo(InfoCustomer);
