import React, { memo, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { Container, Paper, Typography, Button } from "@mui/material";

import { getDonDangKyList } from "../../../api/connect";

import "./style.scss";

const ListDonDangKy = () => {
    const [loading, setLoading] = useState(true);
    const [donDangKyList, setDonDangKyList] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [error, setError] = useState(null); // New state for handling errors

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getDonDangKyList(
                    localStorage.getItem("token")
                );
                setDonDangKyList(data);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Error fetching data. Please try again."); // Set error state
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    const formatCurrency = (amount) => {
        const formattedAmount = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount);

        return formattedAmount;
    };
    const formatDate = (date) => {
        const formattedDate = dayjs(date).format("DD/MM/YYYY");
        return formattedDate === "01/01/1901" ? "" : formattedDate;
    };

    const rows = donDangKyList.map((item, index) => ({
        id: index + 1,
        maDonDK: item.maDonDK,
        maGoiBH: item.maGoiBH,
        thoiGianDK: formatDate(item.thoiGianDK),
        thoiGianBD: formatDate(item.thoiGianBD),
        thoiGianHetHan: formatDate(item.thoiGianHetHan),
        thoiGianDuyet: item.thoiGianDuyet ? formatDate(item.thoiGianDuyet) : "",
        tinhTrang: item.tinhTrang,
        soKyHanThanhToan: item.soKyHanThanhToan,
        tongGia: formatCurrency(item.tongGia),
        maKH: item.maKH,
        maNV: item.maNV,
        liDoTuChoi: item.liDoTuChoi,
    }));

    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "maDonDK", headerName: "Mã Đơn ", width: 70 },
        { field: "maGoiBH", headerName: "Mã Gói BH", width: 80 },
        { field: "thoiGianDK", headerName: "Thời Gian Đăng Kí", width: 130 },
        { field: "thoiGianBD", headerName: "Thời Gian Bắt Đầu", width: 130 },
        {
            field: "thoiGianHetHan",
            headerName: "Thời Gian Hết Hạn",
            width: 130,
        },
        { field: "thoiGianDuyet", headerName: "Thời Gian Duyệt", width: 120 },
        { field: "soKyHanThanhToan", headerName: "Số kỳ hạn", width: 160 },
        { field: "tongGia", headerName: "Tổng Giá" },
        { field: "maKH", headerName: "Mã KH", width: 80 },
        { field: "maNV", headerName: "Mã NV", width: 80 },
        { field: "liDoTuChoi", headerName: "Lí do từ chối", width: 100 },
        {
            field: "tinhTrang",
            headerName: "Tình Trạng",
            width: 160,
            cellClassName: (params) =>
                `status-cell ${params.value.replace(/\s/g, "").toLowerCase()}`,
            renderCell: (params) => (
                <div
                    className={`bordered-cell ${params.value
                        .replace(/\s/g, "")
                        .toLowerCase()}`}
                >
                    {params.value}
                </div>
            ),
        },
    ];

    return (
        <Container component="main" maxWidth="xl">
            <Paper
                elevation={3}
                style={{
                    padding: "20px 20px 70px 20px ",
                    margin: "30px 0px 100px 0px",
                }}
            >
                <Box
                    sx={{
                        height: 700,
                        width: "100%",
                        flexGrow: 1,
                    }}
                >
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        hideFooterPagination
                        hideFooterSelectedRowCount
                        onRowSelectionModelChange={(newRowSelectionModel) => {
                            setSelectedIds(newRowSelectionModel);
                        }}
                        rowSelectionModel={selectedIds}
                    />
                    <div>
                        {selectedIds.length > 0 && (
                            <Button
                                component={Link}
                                to={`detail/${selectedIds[0]}`}
                                variant="contained"
                                color="primary"
                                style={{ marginTop: "10px" }}
                            >
                                Xem
                            </Button>
                        )}
                    </div>
                </Box>
            </Paper>
        </Container>
    );
};

export default memo(ListDonDangKy);
