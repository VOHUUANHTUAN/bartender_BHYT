import { Button, Container, Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getGoiBHByNV } from "../../../api/connect";
import "./style.scss";

const InsurancePack = () => {
    const [loading, setLoading] = useState(true);
    const [goiBaoHiemList, setGoiBaoHiemList] = useState([]);
    const [selectedId, setSelectedId] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getGoiBHByNV(localStorage.getItem("token"));
                setGoiBaoHiemList(data);
            } catch (error) {
                console.error("Error fetching data:", error);
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

    const rows = goiBaoHiemList.map((item, index) => ({
        id: index + 1,
        maGoiBH: item.maGoiBH,
        tenGoiBH: item.tenGoiBH,
        motaGoiBH: item.motaGoiBH,
        gia: formatCurrency(item.gia),
        tiLeHoanTien: item.tiLeHoanTien + "%",
        thoiHanBaoVe: item.thoiHanBaoVe + " năm",
        tinhTrang: item.tinhTrang,
    }));

    const columns = [
        { field: "maGoiBH", headerName: "Mã Gói BH", width: 100 },
        { field: "tenGoiBH", headerName: "Tên Gói BH", width: 200 },
        { field: "motaGoiBH", headerName: "Mô Tả Gói BH", width: 350 },
        { field: "gia", headerName: "Giá", width: 150 },
        { field: "tiLeHoanTien", headerName: "Tỉ lệ Hoàn Tiền", width: 150 },
        { field: "thoiHanBaoVe", headerName: "Thời Hạn Bảo Vệ", width: 150 },
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
                                Danh sách gói bảo hiểm
                            </Typography>
                            <Button
                                variant="outlined"
                                component={Link}
                                to={`add`}
                                style={{ marginLeft: "auto" }}
                            >
                                Thêm gói bảo hiểm
                            </Button>
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
                            onRowSelectionModelChange={(
                                newRowSelectionModel
                            ) => {
                                setSelectedId(newRowSelectionModel);
                            }}
                            rowSelectionModel={selectedId}
                        />
                        <div>
                            {selectedId.length > 0 && (
                                <Button
                                    component={Link}
                                    to={`detail/${selectedId}`}
                                    variant="contained"
                                    color="primary"
                                >
                                    Xem chi tiết
                                </Button>
                            )}
                        </div>
                    </Box>
                </div>
            </Paper>
        </Container>
    );
};

export default memo(InsurancePack);
