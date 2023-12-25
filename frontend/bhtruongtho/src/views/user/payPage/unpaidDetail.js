import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PaymentIcon from "@mui/icons-material/Payment"; // Import PaymentIcon from Material-UI
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InputAdornment from "@mui/material/InputAdornment";
import { Snackbar } from "@mui/material";
import {
	getHoaDonDKDaThanhToanDetail,
	getKhachHangInformation,
	postUpdateHoaDon,
} from "../../../api/connect";
import { useNavigate } from "react-router-dom";
const UnPaidDetail = () => {
	const params = useParams();
	const [detail, setDetail] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [showDetails, setShowDetails] = useState(false);
	const [soDu, setSoDu] = useState(null);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");

	function formatDateTime(dateTimeString) {
		const options = { year: "numeric", month: "2-digit", day: "2-digit" };
		const date = new Date(dateTimeString);
		const formattedDate = date.toLocaleDateString("en-GB", options);
		const hours = date.getHours().toString().padStart(2, "0");
		const minutes = date.getMinutes().toString().padStart(2, "0");
		const formattedTime = `${hours}:${minutes}`;
		return `${formattedDate} ${formattedTime}`;
	}

	const handleSnackbarClose = () => {
		setSnackbarOpen(false);
	};

	useEffect(() => {
		const fetchDetail = async () => {
			try {
				const maHD = params.id;
				const HD = await getHoaDonDKDaThanhToanDetail(maHD);
				setDetail(HD);
			} catch (error) {
				setSnackbarMessage("Error fetching detail");
				setSnackbarOpen(true);
				setError(error);
			} finally {
				setLoading(false);
			}
		};

		fetchDetail();
	}, [params.id]);

	useEffect(() => {
		const fetchSoDu = async () => {
			try {
				const infoKH = await getKhachHangInformation(
					localStorage.getItem("token")
				);
				setSoDu(infoKH.soDu);
				setSnackbarMessage("Customer information fetched successfully");
				setSnackbarOpen(true);
			} catch (error) {
				setSnackbarMessage("Error fetching customer information");
				setSnackbarOpen(true);
				setError(error);
			} finally {
				setLoading(false);
			}
		};

		fetchSoDu();
	}, []);

	const navigate = useNavigate();

	const handleGoBack = () => {
		navigate("/pay");
	};

	const handleToggleDetails = () => {
		setShowDetails(!showDetails);
	};

	const handleThanhToan = async () => {
		try {
			const userConfirmed = window.confirm(
				"Bạn có muốn thanh toán hay không?"
			);

			if (userConfirmed) {
				const response = await postUpdateHoaDon(
					localStorage.getItem("token"),
					detail.maHD
				);

				// Show Snackbar message for successful payment
				setSnackbarMessage("Đã thanh toán thành công");
				setSnackbarOpen(true);

				// Navigate back to the /pay page after a successful payment
				navigate("/pay");

				navigate("/pay");
			}
		} catch (error) {
			setSnackbarMessage(error.response?.data || "Error during payment");
			setSnackbarOpen(true);
			setError(error);
		}
	};

	return (
		<Container component="main" maxWidth="md">
			<Paper
				elevation={3}
				style={{ padding: "20px", marginTop: "150px" }}
			>
				<Grid
					container
					justifyContent="space-between"
					alignItems="center"
				>
					<Grid item>
						<Typography variant="h5" gutterBottom>
							Chi tiết hóa đơn
						</Typography>
					</Grid>
					<Grid item>
						{soDu !== null && (
							<Typography
								variant="subtitle1"
								style={{
									marginBottom: "20px",
									textAlign: "right",
									fontWeight: "bold",
								}}
							>
								Số dư: {soDu} VNĐ
							</Typography>
						)}
					</Grid>
				</Grid>
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
											label="Tổng giá"
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
								<TextField
									label="Lựa chọn thanh toán"
									value={detail.luaChonThanhToan}
									fullWidth
									InputProps={{
										readOnly: true,
									}}
									style={{ marginTop: "20px" }}
								/>
								<TextField
									label="Tình trạng gói bảo hiểm"
									value={detail.tinhTrang}
									fullWidth
									InputProps={{
										readOnly: true,
									}}
									style={{ marginTop: "20px" }}
								/>
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
							}}
							style={{ marginTop: "20px" }}
						/>
						<TextField
							label="Thời gian hết hạn thanh toán"
							value={formatDateTime(
								detail.thoiGianHetHanThanhToan
							)}
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
						<Button
							variant="contained"
							color="primary"
							startIcon={<ArrowBackIcon />}
							onClick={handleGoBack}
							style={{
								marginTop: "20px",
								marginRight: "10px",
								flex: 1,
							}}
						>
							Quay lại
						</Button>
						<Button
							variant="contained"
							color="primary"
							startIcon={<PaymentIcon />}
							onClick={handleThanhToan}
							style={{ marginTop: "20px", flex: 1 }}
						>
							Thanh toán
						</Button>
					</>
				)}
			</Paper>
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={2000}
				onClose={handleSnackbarClose}
				message={snackbarMessage}
				anchorOrigin={{ vertical: "top", horizontal: "right" }}
			/>
		</Container>
	);
};
export default UnPaidDetail;
