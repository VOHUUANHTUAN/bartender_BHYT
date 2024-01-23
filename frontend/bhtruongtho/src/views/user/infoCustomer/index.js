import React, { memo, useState, useEffect } from "react";
import { NV_getInfoCustomer } from "../../../api/connect";
import { useUser } from "../../../context/UserContext";
import { Container, Paper, Snackbar, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";

const InfoCustomer = () => {
	const navigate = useNavigate();
	const { user } = useUser();
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [rows, setRows] = useState([]);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");

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
				console.log("Thông Tin Khách Hàng:", customerInfo);

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
		const detailLink = `InfoCustomer/detail/${rowData.id}`; // Sử dụng rowData.id thay vì id
		// Redirect tới trang detail với id tương ứng
		window.location.href = detailLink;
	};


	const handleAssignmentClick = (rowData) => {
		console.log("Assignment clicked for row with ID:", rowData.id);
		// Thực hiện các xử lý khi click vào nút Assignment
	};

	const handleMonetizationClick = (rowData) => {
		console.log("Monetization clicked for row with ID:", rowData.id);
		// Thực hiện các xử lý khi click vào nút Monetization
	};

	const handleCreditCardClick = (rowData) => {
		console.log("Credit Card clicked for row with ID:", rowData.id);
		const maKH = rowData.id;
		console.log(rowData.id);
		navigate(`/infoCustomer/Recharge/${maKH}`);
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
					<Tooltip title="Đơn đăng ký">
						<IconButton
							onClick={() => handleAssignmentClick(params.row)}
						>
							<AssignmentIcon />
						</IconButton>
					</Tooltip>
					<Tooltip title="Hoàn tiền">
						<IconButton
							onClick={() => handleMonetizationClick(params.row)}
						>
							<MonetizationOnIcon />
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
				<Typography
					variant="h5"
					style={{ fontWeight: "bold", marginBottom: "10px" }}
				>
					Danh sách khách hàng
				</Typography>
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
