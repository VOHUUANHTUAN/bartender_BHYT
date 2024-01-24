import React, { memo, useState, useEffect } from "react";
import {
    getHoaDonDKbyTinhTrang,
    phatThanhToanTreHan,
} from "../../../api/connect";
import { useUser } from "../../../context/UserContext";
import {
    Container,
    Paper,
    TextField,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    InputAdornment,
    Tabs,
    Tab,
} from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import PaymentIcon from "@mui/icons-material/Payment";
import VisibilityIcon from "@mui/icons-material/Visibility";
// Import useNavigate
import { useSnackbar } from "../../../context/SnackbarContext";
import { useNavigate } from "react-router-dom";
const Pay = () => {
    const { openSnackbar } = useSnackbar();
    // Sử dụng useNavigate để chuyển hướng
    const navigate = useNavigate();
    //user context
    const { user } = useUser();
    //error và loading
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState(0);
    const [rows1, setRows1] = useState([]); // State để lưu dữ liệu từ API
    const [rows2, setRows2] = useState([]); // State để lưu dữ liệu từ API
    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };

    //hàm format định dạng thời gian Output: 04/10/2023 08:30
    function formatDateTime(dateTimeString) {
        const options = { year: "numeric", month: "2-digit", day: "2-digit" };
        const date = new Date(dateTimeString);
        const formattedDate = date.toLocaleDateString("en-GB", options);
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const formattedTime = `${hours}:${minutes}`;
        return `${formattedDate} ${formattedTime}`;
    }
    // Số thứ tự cho đơn yêu cầu
    let idCounter1 = 1; // Initialize a counter for Tab 1
    let idCounter2 = 1; // Initialize a counter for Tab 2
    const formatCurrency = (amount) => {
        const formattedAmount = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount);

        return formattedAmount;
    };
    useEffect(() => {
        const fetchChuaThanhToan = async () => {
            try {
                setLoading(true);
                // Gọi API phatThanhToanTreHan trước
                // const phatThanhToanTreHanResult = await phatThanhToanTreHan(
                // 	localStorage.getItem("token")
                // );
                // console.log(
                // 	"Phat thanh toan tre han API called successfully:",
                // 	phatThanhToanTreHanResult
                // );
                const hoadonChuaTT = await getHoaDonDKbyTinhTrang(
                    localStorage.getItem("token"),
                    "Chưa thanh toán"
                );

                setRows1(
                    hoadonChuaTT.map((row) => ({
                        id: idCounter1++,
                        tenGoiBH: row.tenGoiBH,
                        hanKy: row.hanKy,
                        thoiGianHetHan: formatDateTime(row.thoiGianHetHan),
                        tinhTrangThanhToan: row.tinhTrangThanhToan,
                        soTien: formatCurrency(row.soTien),
                        tienPhat: formatCurrency(row.tienPhat),
                        tongTien: formatCurrency(row.tongTien),
                        maHD: row.maHD,
                    }))
                );
            } catch (error) {
                try {
                } catch {
                    openSnackbar(
                        "Có lỗi xảy ra khi kết nối với máy chủ",
                        "error"
                    );
                }

                setError(error);
            } finally {
                setLoading(false);
            }
        };

        if (value === 0) {
            fetchChuaThanhToan();
        }
    }, [value]);

    useEffect(() => {
        const fetchDaThanhToan = async () => {
            try {
                setLoading(true);

                const hoadonTT = await getHoaDonDKbyTinhTrang(
                    localStorage.getItem("token"),
                    "Đã thanh toán"
                );

                setRows2(
                    hoadonTT.map((row) => ({
                        id: idCounter2++,
                        tenGoiBH: row.tenGoiBH,
                        hanKy: row.hanKy,
                        thoiGianHetHan: formatDateTime(row.thoiGianHetHan),
                        thoiGianThanhToan: formatDateTime(
                            row.thoiGianThanhToan
                        ),
                        tinhTrangThanhToan: row.tinhTrangThanhToan,
                        soTien: row.soTien,
                        tienPhat: row.tienPhat,
                        tongTien: row.tongTien,
                        maHD: row.maHD,
                    }))
                );
            } catch (error) {
                try {
                } catch {
                    openSnackbar(
                        "Có lỗi xảy ra khi kết nối với máy chủ",
                        "error"
                    );
                }

                setError(error);
            } finally {
                setLoading(false);
            }
        };

        if (value === 1) {
            fetchDaThanhToan();
        }
    }, [value]);

    const columnsChuaThanhToan = [
        { field: "id", headerName: "STT", width: 50 },
        { field: "tenGoiBH", headerName: "Tên gói BH", width: 200 },
        { field: "hanKy", headerName: "Hạn kỳ", width: 120 },
        { field: "thoiGianHetHan", headerName: "Ngày hết hạn", width: 150 },
        {
            field: "tinhTrangThanhToan",
            headerName: "Tình Trạng",
            width: 150,
            renderCell: (params) => {
                const tinhTrangValue = params.value;
                let cellColor;
                switch (tinhTrangValue) {
                    case "Đã thanh toán":
                        cellColor = "green";
                        break;
                    case "Chưa thanh toán":
                        cellColor = "red";
                        break;
                    default:
                        cellColor = "black";
                }
                return <div style={{ color: cellColor }}>{tinhTrangValue}</div>;
            },
        },
        {
            field: "maHD",
            headerName: "Mã hóa đơn",
            width: 120,
            flex: 0,
            hide: true,
        },
        { field: "soTien", headerName: "Số tiền (VND)", width: 120 },
        { field: "tienPhat", headerName: "Tiền phạt (VND)", width: 120 },
        { field: "tongTien", headerName: "Tổng tiền (VND)", width: 120 },
        {
            field: "thanhToan",
            headerName: "Thanh toán",
            width: 170,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleThanhToanClick(params.row)}
                    startIcon={<PaymentIcon />}
                    style={{ marginRight: "8px" }}
                >
                    Thanh toán
                </Button>
            ),
        },
    ];
    const handleThanhToanClick = (rowData) => {
        // Lấy maHD từ rowData
        const maHD = rowData.maHD;
        console.log(maHD);

        // Chuyển hướng đến trang chi tiết với maHD tương ứng
        navigate(`/pay/detailUnpaid/${maHD}`);
    };
    const columnsDaThanhToan = [
        { field: "id", headerName: "STT", width: 50 },
        { field: "tenGoiBH", headerName: "Tên gói BH", width: 200 },
        { field: "hanKy", headerName: "Hạn kỳ", width: 120 },
        { field: "thoiGianHetHan", headerName: "Ngày hết hạn", width: 150 },
        {
            field: "thoiGianThanhToan",
            headerName: "Ngày thanh toán",
            width: 150,
        },
        {
            field: "tinhTrangThanhToan",
            headerName: "Tình Trạng",
            width: 120,
            renderCell: (params) => {
                const tinhTrangValue = params.value;
                let cellColor;
                switch (tinhTrangValue) {
                    case "Đã thanh toán":
                        cellColor = "green";
                        break;
                    case "Chưa thanh toán":
                        cellColor = "red";
                        break;
                    default:
                        cellColor = "black";
                }
                return <div style={{ color: cellColor }}>{tinhTrangValue}</div>;
            },
        },
        { field: "soTien", headerName: "Số tiền (VND)", width: 120 },
        { field: "tienPhat", headerName: "Tiền phạt (VND)", width: 120 },
        { field: "tongTien", headerName: "Tổng tiền (VND)", width: 120 },
        {
            field: "maHD",
            headerName: "Mã hóa đơn",
            width: 120,
            flex: 0,
            hide: true,
        },
        {
            field: "chiTiet",
            headerName: "Chi tiết",
            width: 150,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleChiTietClick(params.row)}
                    startIcon={<VisibilityIcon />}
                    style={{ marginRight: "8px" }}
                >
                    Chi tiết
                </Button>
            ),
        },
    ];
    const handleChiTietClick = (rowData) => {
        // Lấy maHD từ rowData
        const maHD = rowData.maHD;
        console.log(maHD);

        // Chuyển hướng đến trang chi tiết với maHD tương ứng
        navigate(`/pay/detailPaid/${maHD}`);
    };
    return (
        <Container component="main" maxWidth="xl">
            <Paper
                elevation={3}
                style={{
                    padding: "20px",
                    marginTop: "120px",
                    marginBottom: "100px",
                }}
            >
                <div>
                    <Tabs value={value} onChange={handleChangeTab}>
                        <Tab label="Hóa đơn chưa thanh toán" />
                        <Tab label="Hóa đơn đã thanh toán" />
                    </Tabs>

                    {value === 0 && (
                        <div style={{ padding: "20px", marginTop: "20px" }}>
                            <Box sx={{ height: 400, width: "100%" }}>
                                <DataGrid
                                    rows={rows1}
                                    columns={columnsChuaThanhToan}
                                    pageSize={5}
                                    disableRowSelectionOnClick
                                    hideFooterPagination
                                    hideFooterSelectedRowCount
                                    getRowId={(row) => row.id}
                                />
                            </Box>
                        </div>
                    )}

                    {value === 1 && (
                        <div style={{ padding: "20px", marginTop: "20px" }}>
                            <Box sx={{ height: 400, width: "100%" }}>
                                <DataGrid
                                    rows={rows2}
                                    columns={columnsDaThanhToan}
                                    pageSize={5}
                                    disableRowSelectionOnClick
                                    hideFooterPagination
                                    hideFooterSelectedRowCount
                                    getRowId={(row) => row.id}
                                />
                            </Box>
                        </div>
                    )}
                </div>
            </Paper>
        </Container>
    );
};

export default memo(Pay);
