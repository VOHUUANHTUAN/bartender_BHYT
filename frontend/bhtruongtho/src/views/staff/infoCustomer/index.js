import React, { memo, useState, useEffect } from "react";
import { NV_getInfoCustomer } from "../../../api/connect";
import { useUser } from "../../../context/UserContext";
import { Container, Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import HistoryIcon from "@mui/icons-material/History";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { Link, useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import { GridToolbar } from "@mui/x-data-grid";

const InfoCustomer = () => {
    const { user } = useUser();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState([]);


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
        <Container component="main" maxWidth="md">
            <Paper
                elevation={3}
                style={{
                    padding: "20px",
                    marginTop: "40px",
                    marginBottom: "100px",
                }}
            >
                <div>
                    <Box>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: "16px",
                            }}
                        >
                            <Typography component="h1" variant="h5">
                                Danh sách khách hàng
                            </Typography>

                        </div>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            slots={{ toolbar: GridToolbar }}
                            slotProps={{
                                toolbar: {
                                    showQuickFilter: true,
                                },
                            }}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 10,
                                    },
                                },
                            }}
                            pageSizeOptions={[10]}
                            hideFooterSelectedRowCount
                            disableRowSelectionOnClick
                            getRowId={(row) => row.id}
                        />
                    </Box>
                </div>
            </Paper>
        </Container>
    );
};

export default memo(InfoCustomer);
