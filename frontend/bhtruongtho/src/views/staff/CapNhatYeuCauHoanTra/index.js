import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllYeuCauHoanTra } from "../../../api/connect";
import { useUser } from "../../../context/UserContext";
import "./style.scss";

const ListYeuCauHoanTra = () => {
    const [yeuCauHoanTraList, setYeuCauHoanTraList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedId, setSelectedId] = useState("");
    const { user } = useUser();
    console.log(user);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllYeuCauHoanTra(
                    localStorage.getItem("token")
                );

                const formattedData = data.map((item) => ({
                    ...item,
                    id: item.maYC.toString(),
                }));

                setYeuCauHoanTraList(formattedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    const formatDate = (date) =>
        dayjs(date).isValid() ? dayjs(date).format("DD/MM/YYYY") : "";
    const formatRelativeTime = (date) =>
        dayjs(date).isValid() ? dayjs(date).fromNow() : "";
    const formatCurrency = (amount) => {
        const formattedAmount = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount);

        return formattedAmount;
    };

    const columns = [
        { field: "maYC", headerName: "Mã Yêu Cầu", width: 120 },
        { field: "maHDKhamBenh", headerName: "Mã Hồ Sơ Khám Bệnh", width: 120 },
        { field: "maGoiBHApDung", headerName: "Mã Gói BH Áp Dụng", width: 120 },
        { field: "maKH", headerName: "Mã Khách Hàng", width: 120 },
        { field: "maNV", headerName: "Mã NV", width: 120 },
        { field: "tenBenhVien", headerName: "Tên Bệnh Viện", width: 120 },
        {
            field: "soTienDaKham",
            headerName: "Số Tiền Đã Khám",
            valueFormatter: (params) => formatCurrency(params.value),
            width: 120,
        },
        { field: "benh", headerName: "Bệnh", width: 120 },
        {
            field: "thoiGianTao",
            headerName: "Thời Gian Tạo",
            width: 120,
            valueFormatter: (params) => formatDate(params.value),
        },
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
        {
            field: "soTienHoanTra",
            headerName: "Số Tiền Hoàn Trả",
            width: 120,

            valueFormatter: (params) => formatCurrency(params.value),
        },
        {
            field: "thoiGianDuyet",
            headerName: "Thời Gian Duyệt",
            width: 120,
            valueFormatter: (params) => formatDate(params.value),
        },
    ];

    return (
        <>
            {user && user.role == "Nhân viên" ? (
                <>
                    <Box sx={{ padding: "100px", height: 800, width: "100%" }}>
                        <DataGrid
                            rows={yeuCauHoanTraList}
                            columns={columns}
                            pageSize={5}
                            onRowSelectionModelChange={(
                                newRowSelectionModel
                            ) => {
                                setSelectedId(newRowSelectionModel);
                            }}
                            rowSelectionModel={selectedId}
                            showFooter={false}
                            hideFooterSelectedRowCount
                            hideFooterPagination
                        />
                        <div>
                            <Button
                                component={Link}
                                to={`detail/${selectedId}`}
                                variant="contained"
                                color="primary"
                                style={{ marginTop: "10px" }}
                            >
                                Xem
                            </Button>
                        </div>
                    </Box>{" "}
                </>
            ) : (
                <>
                    <h2>404 - Page Not Found</h2>
                    <p>The requested page does not exist.</p>
                </>
            )}
        </>
    );
};

export default ListYeuCauHoanTra;
