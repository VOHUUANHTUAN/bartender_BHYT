import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InputAdornment from "@mui/material/InputAdornment";
import { getHoaDonDKDaThanhToanDetail } from "../../../api/connect";
import { useNavigate } from "react-router-dom";
const PaidDetail = () => {
    const params = useParams();
    const [detail, setDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [showReason, setShowReason] = useState(false);
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
    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const maHD = params.id;
                console.log(maHD);

                const HD = await getHoaDonDKDaThanhToanDetail(maHD);
                setDetail(HD);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetail();
    }, [params.id]);
    const navigate = useNavigate();

    const handleGoBack = () => {
        // Điều hướng quay lại trang "/pay"
        navigate("/pay");
    };
    const handleToggleDetails = () => {
        setShowDetails(!showDetails);
    };
    const handleToggleReason = () => {
        setShowReason(!showReason);
    };
    return (
        <Container component="main" maxWidth="md">
            <Paper elevation={3} style={{ padding: "20px", margin: "50px" }}>
                <Typography variant="h5" gutterBottom>
                    Chi tiết hóa đơn
                </Typography>
                {loading && <p>Loading...</p>}
                {!loading && detail && (
                    <>
                        <TextField
                            label="Tên gói bảo hiểm"
                            value={detail.tenGoiBH}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <ExpandMoreIcon
                                            style={{ cursor: "pointer" }}
                                            onClick={handleToggleDetails}
                                        />
                                    </InputAdornment>
                                ),
                            }}
                            style={{
                                marginTop: "20px",
                                cursor: "pointer",
                            }}
                            onClick={handleToggleDetails}
                        />

                        {showDetails && (
                            <div
                                style={{
                                    border: "2px solid #2196F3",
                                    padding: "10px",
                                    marginTop: "20px",
                                }}
                            >
                                {/* ... (other TextField components) */}
                                <TextField
                                    label="Mô tả gói bảo hiểm"
                                    value={detail.motaGoiBH}
                                    fullWidth
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    style={{ marginTop: "20px" }}
                                />
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <TextField
                                            label="Giá gói"
                                            value={`${detail.gia} VND`}
                                            fullWidth
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            style={{ marginTop: "20px" }}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            label="Tỉ lệ hoàn tiền"
                                            value={`${detail.tiLeHoanTien} %`}
                                            fullWidth
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            style={{ marginTop: "20px" }}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            label="Thời hạn bảo vệ"
                                            value={`${detail.thoiHanBaoVe} năm`}
                                            fullWidth
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            style={{ marginTop: "20px" }}
                                        />
                                    </Grid>
                                </Grid>
                                <hr
                                    style={{
                                        margin: "20px 0",
                                        borderColor: "#2196F3",
                                    }}
                                />
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <TextField
                                            label="Thời gian đăng ký"
                                            value={formatDateTime(
                                                detail.thoiGianDK
                                            )}
                                            fullWidth
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            style={{ marginTop: "20px" }}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            label="Thời gian bắt đầu"
                                            value={formatDateTime(
                                                detail.thoiGianBD
                                            )}
                                            fullWidth
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            style={{ marginTop: "20px" }}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            label="Thời gian hết hạn"
                                            value={formatDateTime(
                                                detail.thoiGianHetHan
                                            )}
                                            fullWidth
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            style={{ marginTop: "20px" }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <TextField
                                            label="Số kỳ hạn thanh toán/năm"
                                            value={detail.soKyHanThanhToan}
                                            fullWidth
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            style={{ marginTop: "20px" }}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            label="Tổng giá đơn"
                                            value={detail.tongGia}
                                            fullWidth
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            style={{ marginTop: "20px" }}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            label="Tình trạng gói bảo hiểm"
                                            value={detail.tinhTrang}
                                            fullWidth
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            style={{ marginTop: "20px" }}
                                        />
                                    </Grid>
                                </Grid>
                                {/* Đường kẻ giữa phần xổ ra và phần hiện sẵn */}

                                {/* Đường kẻ giữa phần xổ ra và phần hiện sẵn */}
                            </div>
                        )}

                        <TextField
                            label="Hạn kỳ"
                            value={detail.hanKy}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                            style={{ marginTop: "20px" }}
                        />
                        <TextField
                            label="Tình trạng thanh toán"
                            value={detail.tinhTrangThanhToan}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                                style: {
                                    color: "green",
                                },
                            }}
                            style={{ marginTop: "20px" }}
                        />
                        <TextField
                            label="Thời gian thanh toán"
                            value={formatDateTime(detail.thoiGianThanhToan)}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                            style={{ marginTop: "20px" }}
                        />
                        <TextField
                            label="Số tiền thanh toán"
                            value={`${detail.soTien} VND`}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                            style={{ marginTop: "20px" }}
                        />
                        {/* Thêm điều kiện để hiển thị "Lí do phạt" khi bấm vào "Tiền phạt" */}
                        <TextField
                            label="Tiền phạt"
                            value={`${detail.tienPhat || 0} VND`}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                                style: {
                                    color:
                                        detail.tienPhat !== 0
                                            ? "red"
                                            : "inherit",
                                    cursor:
                                        detail.tienPhat !== 0
                                            ? "pointer"
                                            : "auto",
                                },
                                onClick:
                                    detail.tienPhat !== 0
                                        ? handleToggleReason
                                        : undefined,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <ExpandMoreIcon
                                            color="primary" // Thêm màu cho icon
                                            style={{ cursor: "pointer" }} // Tùy chỉnh kiểu cursor
                                            onClick={handleToggleReason}
                                        />
                                    </InputAdornment>
                                ),
                            }}
                            style={{ marginTop: "20px" }}
                        />

                        {showReason && (
                            <div
                                style={{
                                    marginTop: "20px",
                                    padding: "10px",
                                    border: "2px solid #2196F3",
                                }}
                            >
                                <TextField
                                    label="Lí do phạt"
                                    value={detail.liDoPhat || "Không có"}
                                    fullWidth
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    style={{ marginTop: "20px" }}
                                />
                            </div>
                        )}

                        {/* Điều kiện màu xanh lá cho "Tổng tiền" */}
                        <TextField
                            label="Tổng tiền"
                            value={`${detail.tongTien || 0} VND`}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                                style: {
                                    color: "green",
                                },
                            }}
                            style={{ marginTop: "20px" }}
                        />

                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<ArrowBackIcon />}
                            onClick={handleGoBack}
                            style={{ marginTop: "20px" }}
                        >
                            Quay lại
                        </Button>
                    </>
                )}
            </Paper>
        </Container>
    );
};

export default PaidDetail;
