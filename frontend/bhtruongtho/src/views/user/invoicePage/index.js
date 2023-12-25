import React, { useState, useEffect } from "react";
import { KH_getBillList } from "../../../api/connect";
import { useUser } from "../../../context/UserContext";
import { Container, Paper, Typography, Button } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { Link, Navigate } from "react-router-dom";

const BillList = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [billList, setBillList] = useState([]);

    useEffect(() => {
        const fetchBillList = async () => {
            try {
                setLoading(true);
                const billData = await KH_getBillList(
                    localStorage.getItem("token")
                );
                console.log(billData);
                setBillList(billData);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchBillList();
    }, []);

    const rows = billList.map((row, index) => {
        const isHoaDonThanhToan = row.loaiHoaDon === "Thanh toán";
        const isHoaDonHoanTra = row.loaiHoaDon === "Hoàn trả";

        const formattedSoTien = isHoaDonThanhToan
            ? `- ${row.soTien.toLocaleString()}`
            : isHoaDonHoanTra
            ? `+ ${row.soTien.toLocaleString()}`
            : row.soTien.toLocaleString();

        const textColor = isHoaDonThanhToan
            ? "red"
            : isHoaDonHoanTra
            ? "green"
            : "black";

        return {
            id: index + 1,
            maHD: row.maHD,
            soTien: row.soTien,
            thoiGianThanhToan: dayjs(row.thoiGianThanhToan).format(
                "HH:mm:ss DD/MM/YYYY"
            ),
            maDon: row.maDon,
            loaiHoaDon: row.loaiHoaDon,
            formattedSoTien, // Include formatted amount in rows
            textColor,
        };
    });

    const columns = [
        { field: "id", headerName: "STT", width: 100 },
        { field: "maHD", headerName: "Mã Hóa Đơn" },
        {
            field: "soTien",
            headerName: "Số Tiền",
            type: "number",
            renderCell: (params) => (
                <span style={{ color: params.row.textColor }}>
                    {params.row.formattedSoTien}
                </span>
            ),
        },
        {
            field: "thoiGianThanhToan",
            headerName: "Thời Gian Thanh Toán",
            width: 200,
        },
        { field: "maDon", headerName: "Mã Đơn " },
        { field: "loaiHoaDon", headerName: "Loại hoá đơn " },
        {
            field: "action",
            headerName: "Xem chi tiết",
            sortable: false,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                        handleViewDetail(params.row.maHD, params.row.loaiHoaDon)
                    }
                >
                    Xem
                </Button>
            ),
        },
    ];
    const handleViewDetail = (maHD, loaiHoaDon) => {
        // Handle navigation based on loaiHoaDon
        // You can use React Router or any other navigation mechanism here
        // Example with React Router:
        if (loaiHoaDon === "Thanh toán") {
            console.log("chuyển đến chi tiết hoá đơn thanh toán ", maHD);

            // Navigate to a page for "ThanhToanDK" with maHD
            // You need to define the route in your application
            // Example: history.push(`/thanh-toan-dk/${maHD}`);
        } else if (loaiHoaDon === "Hoàn trả") {
            console.log("chuyển đến chi tiết hoá đơn Hoàn trả ", maHD);
            // Navigate to a page for "HoanTra" with maHD
            // Example: history.push(`/hoan-tra/${maHD}`);
        }
    };

    return (
        <Container
            component="main"
            style={{
                padding: "20px",
                marginTop: "150px",
                marginBottom: "50px",
            }}
        >
            <Paper
                elevation={3}
                style={{
                    padding: "20px",
                }}
            >
                <div style={{ padding: "20px", marginTop: "20px" }}>
                    <Typography component="h1" variant="h5">
                        Danh sách hóa đơn
                    </Typography>
                    <Box sx={{ height: 400, width: "100%" }}>
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
    );
};

export default BillList;
