import React, { memo, useState, useEffect } from "react";
import {

    createRequest,
    getGoiBHByCus,
    getBenhByMaGBH,
    getYCHTByCus,
    getBenhVienAPI,
    getSoTienKhamByCus,
} from "../../../api/connect";
import { useUser } from "../../../context/UserContext";
import {
    Container,
    Paper,
    TextField,
    Button,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Tabs,
    Tab,
    Snackbar,
} from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
const RequestInvoice = () => {

    //user context
    const { user } = useUser();
    //error và loading
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    //khai báo các biến
    const [amount, setAmount] = useState("");
    const [hospitalNameList, setHospitalNameList] = useState([]);
    const [refundAmount, setRefundAmount] = useState("");
    const [diseases, setDiseases] = useState([]);
    const [insurancePackages, setInsurancePackages] = useState([]);
    const [selectedHospitalName, setSelectedHospitalName] = useState("");
    const [selectedDisease, setSelectedDisease] = useState("");
    const [selectedInsurancePackage, setSelectedInsurancePackage] =
        useState("");
    const [requestList, setRequestList] = useState([]);

	//Cấu hình cho tab
	const [value, setValue] = useState(0);

	const handleChangeTab = (event, newValue) => {
		setValue(newValue);
	};

    //Dữ liệu nhập cần validate
    const [formData, setFormData] = useState({
        invoiceCode: "",
        //amount: "",
        // ... other fields
    });

	//thông báo lỗi
	const [invoiceCodeError, setInvoiceCodeError] = useState(false);
	const [amountError, setAmountError] = useState(false);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");

	//handle tab thông báo
	const handleSnackbarClose = () => {
		setSnackbarOpen(false);
	};

    //handle cho dữ liệu thay đổi
    const handleChangeData = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        //regex cho mã hóa đơn
        if (e.target.name === "invoiceCode") {
            const invoiceCodeRegex = /^[a-zA-Z0-9_@#&-]+$/;
            setInvoiceCodeError(!invoiceCodeRegex.test(e.target.value));
        }
    };
    //validate cho các trường trong form
    const validateForm = () => {
        if (!formData.invoiceCode) {
            return "Mã hóa đơn không được để trống";
        }
        if (!amount) {
            return "Thông tin chưa hợp lệ";
        }
        if (!selectedHospitalName) {
            return "Tên bệnh viện không được để trống";
        }
        if (!selectedDisease) {
            return "Tên bệnh không được để trống";
        }
        if (!selectedInsurancePackage) {
            return "Gói bảo hiểm không được để trống";
        }
        if (invoiceCodeError) {
            return "Thông tin chưa hợp lệ";
        }
        return null; // Validation passed
    };
    //xử lí api số tiền khám
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                //Nếu đã chọn bệnh viện và nhập mã hóa đơn
                if (selectedHospitalName && formData.invoiceCode !== "") {
                    // Gọi API
                    try {
                        const soTienKhamBenh = await getSoTienKhamByCus(localStorage.getItem("token"), formData.invoiceCode, selectedHospitalName);
                        // Gọi API thành công, thiết lập giá trị cho amount
                        setAmount(soTienKhamBenh);
                    } catch (error) {
                        // Xử lý lỗi khi không thể gọi được API
                        setSnackbarMessage(error.response.data);
                        setSnackbarOpen(true);
                        setAmount("");
                    }

                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [user, selectedHospitalName, formData.invoiceCode]);
    //xử lý gọi api
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                //API cho tab1
                // Gọi API để lấy dữ liệu về gói Bảo hiểm
                const goiBHByUs = await getGoiBHByCus(localStorage.getItem("token"));
                setInsurancePackages(goiBHByUs);
                //gọi api lấy dữ liệu tất cả bệnh viện
                const benhVien = await getBenhVienAPI();
                setHospitalNameList(benhVien);

                //Nếu đã chọn gói bảo hiểm
                if (selectedInsurancePackage) {
                    // Gọi API để lấy dữ liệu về bệnh dựa trên mã gói Bảo hiểm đã chọn
                    const benhData = await getBenhByMaGBH(
                        selectedInsurancePackage
                    );
                    setDiseases(benhData);
                }
                //API cho tab2
                //Gọi API để lấy yêu cầu hoàn trả theo username
                const yCHTByUs = await getYCHTByCus(localStorage.getItem("token"));
                setRequestList(yCHTByUs);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [user, selectedInsurancePackage, value]); //những thuộc tính nếu thay đôi sẽ gọi lại useEffect

	const handleInsurancePackageChange = (e) => {
		setSelectedInsurancePackage(e.target.value);
	};
	// Hàm để lấy tên gói bảo hiểm dựa trên MaGoiBH
	const getInsurancePackageName = (maGoiBHApDung) => {
		const foundPackage = insurancePackages.find(
			(packageItem) => packageItem.maGoiBH === maGoiBHApDung
		);
		return foundPackage ? foundPackage.tenGoiBH : "Unknown";
	};
	//hàm lấy tên bệnh dựa trên mã bệnh
	const getDiseaseName = (maBenh) => {
		const foundPackage = diseases.find(
			(packageItem) => packageItem.maBenh === maBenh
		);
		return foundPackage.tenBenh;
	};
	//hàm lấy tên bệnh viện dựa trên mã bệnh viện
	const getHospitalName = (maBenhVien) => {
		const foundPackage = hospitalNameList.find(
			(packageItem) => packageItem.maBV === maBenhVien
		);
		return foundPackage.tenBV;
	};

	//Xử lý tính số tiền hoàn trả
	//Dùng useEffect để bắt thay đổi ở bảo hiểm, tiền
	useEffect(() => {
		//lấy tỉ lệ hoàn tiền dựa trên mã bảo hiểm
		const selectedGoiBH = insurancePackages.find(
			(packageItem) => packageItem.maGoiBH === selectedInsurancePackage
		);
		const refundRate = selectedGoiBH ? selectedGoiBH.tiLeHoanTien : 0;


        // Convert the amount to a float, defaulting to 0 if NaN
        const amountFloat = parseFloat(amount) || 0;

        //Nếu nhập số bé hơn không thì gán số tiền hoàn trả = 0
        if (amountFloat < 0) {
            setRefundAmount(0);
            return;
        }
        // Calculate the refund amount
        const calculatedRefundAmount = Math.round(
            amountFloat * (refundRate / 100)
        );
        // Check if the calculated refund amount is a valid number
        const refundAmountValue = isNaN(calculatedRefundAmount)
            ? 0
            : calculatedRefundAmount;
        // Set the calculated refund amount to the state
        setRefundAmount(refundAmountValue);
    }, [selectedInsurancePackage, insurancePackages, amount]);

    //handle cho nút Tạo yêu cầu
    const handleRefundSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        //gọi hàm validate
        const validationError = validateForm();
        if (validationError) {
            setSnackbarMessage(validationError);
            setSnackbarOpen(true);
            return;
        }
        // Handle form submission logic here
        setLoading(true);
        const yeuCauData = {
            // Populate with the necessary data
            maHDKhamBenh: formData.invoiceCode,
            tenBenhVien: getHospitalName(selectedHospitalName),
            soTienDaKham: amount,
            benh: getDiseaseName(selectedDisease),
            maGoiBHApDung: selectedInsurancePackage,
            username: user.username,
            soTienHoanTra: refundAmount,
        };
        try {
            //gọi api post
            const responseData = await createRequest(yeuCauData);
            //thông báo thành công
            setSnackbarMessage(responseData);
            setSnackbarOpen(true);
        } catch (error) {
            // Xử lý các lỗi khác (ví dụ: mất kết nối)
            //thông báo lỗi
            setSnackbarMessage(error.response.data);
            setSnackbarOpen(true);
        } finally {
            setLoading(false);
        }
    };

	//Số thứ tự cho đơn yêu cầu
	let idCounter = 1; // Initialize a counter
	// Function to generate unique ids
	const generateUniqueId = () => {
		return idCounter++;
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
	//đổ dữ liệu vào rows trong datagrid
	const rows = requestList.map((row) => ({
		id: generateUniqueId(),
		maHDKhamBenh: row.maHDKhamBenh,
		tenBenhVien: row.tenBenhVien,
		soTienDaKham: row.soTienDaKham,
		benh: row.benh,
		thoiGianTao: formatDateTime(row.thoiGianTao),
		tinhTrang: row.tinhTrang,
		tenGoiBHApDung: getInsurancePackageName(row.maGoiBHApDung),
		soTienHoanTra: row.soTienHoanTra,
	}));

	//tạo columnn cho datagrid
	const columns = [
		{ field: "id", headerName: "STT", width: 50 },
		{ field: "maHDKhamBenh", headerName: "Mã HĐ Khám Bệnh", width: 150 },
		{ field: "tenBenhVien", headerName: "Tên Bệnh Viện", width: 250 },
		{ field: "benh", headerName: "Bệnh", width: 150 },
		{ field: "tenGoiBHApDung", headerName: "Gói BH Áp Dụng", width: 200 },
		{
			field: "soTienDaKham",
			headerName: "Số Tiền Đã Khám",
			type: "number",
			width: 150,
		},
		{
			field: "soTienHoanTra",
			headerName: "Số Tiền Hoàn Trả",
			type: "number",
			width: 150,
		},
		{
			//một chút màu sắc cho cột tình trạng
			field: "tinhTrang",
			headerName: "Tình Trạng",
			width: 100,
			renderCell: (params) => {
				const tinhTrangValue = params.value;
				let cellColor;
				// Set colors based on tinhTrangValue
				switch (tinhTrangValue) {
					case "Đã hoàn tiền":
						cellColor = "green";
						break;
					case "Chờ duyệt":
						cellColor = "orange";
						break;
					case "Không đủ điều kiện":
						cellColor = "red";
						break;
					// Add more cases as needed
					default:
						cellColor = "black";
				}
				return <div style={{ color: cellColor }}>{tinhTrangValue}</div>;
			},
		},
		{ field: "thoiGianTao", headerName: "Thời Gian Tạo", width: 200 },
	];


    return (
        <Container component="main" maxWidth="md">
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
                        <Tab label="Đơn yêu cầu" />
                        <Tab label="Danh sách các đơn yêu cầu đã gửi" />
                    </Tabs>
                    {/* Nội dung tương ứng với từng tab */}
                    {value === 0 && (
                        <div style={{ padding: "20px", marginTop: "20px" }}>
                            <Typography component="h1" variant="h5">
                                Đơn yêu cầu hoàn trả hóa đơn
                            </Typography>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleRefundSubmit(e);
                                }}
                            >
                                <TextField
                                    label="Mã hóa đơn"
                                    name="invoiceCode"
                                    value={formData.invoiceCode}
                                    onChange={handleChangeData}
                                    fullWidth
                                    required
                                    margin="normal"
                                    error={invoiceCodeError}
                                    helperText={
                                        invoiceCodeError &&
                                        "Mã hóa đơn bắt đầu bằng chữ cái hoặc số và có ít nhất 6 kí tự"
                                    }
                                />
                                <FormControl style={{ width: "100%" }}>
                                    <InputLabel>Tên bệnh viện</InputLabel>
                                    <Select
                                        value={selectedHospitalName}
                                        label="Tên bệnh viện"
                                        onChange={(e) =>
                                            setSelectedHospitalName(
                                                e.target.value
                                            )
                                        }
                                    >
                                        {hospitalNameList.map((hos_name) => (
                                            <MenuItem
                                                key={hos_name.maBV}
                                                value={hos_name.maBV}
                                            >
                                                {hos_name.tenBV}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <TextField
                                    label="Số tiền"
                                    name="amount"
                                    value={amount}
                                    //onChange={handleChangeData}
                                    fullWidth
                                    required
                                    margin="normal"
                                    InputProps={{ readOnly: true }}
                                />
                                <FormControl
                                    style={{
                                        width: "40%",
                                        marginRight: "10px",
                                    }}
                                >
                                    <InputLabel>Tên bệnh</InputLabel>
                                    <Select
                                        value={selectedDisease}
                                        label="Tên bệnh"
                                        onChange={(e) =>
                                            setSelectedDisease(e.target.value)
                                        }
                                    >
                                        {diseases.map((disease) => (
                                            <MenuItem
                                                key={disease.maBenh}
                                                value={disease.maBenh}
                                            >
                                                {disease.tenBenh}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl style={{ width: "40%" }}>
                                    <InputLabel>Gói bảo hiểm</InputLabel>
                                    <Select
                                        value={selectedInsurancePackage || ""}
                                        label="Gói bảo hiểm"
                                        onChange={handleInsurancePackageChange}
                                    >
                                        {insurancePackages.map(
                                            (packageItem) => (
                                                <MenuItem
                                                    key={packageItem.maGoiBH}
                                                    value={packageItem.maGoiBH}
                                                >
                                                    {packageItem.tenGoiBH}
                                                </MenuItem>
                                            )
                                        )}
                                    </Select>
                                </FormControl>
                                <TextField
                                    label="Số tiền hoàn trả"
                                    value={refundAmount}
                                    fullWidth
                                    margin="normal"
                                    InputProps={{ readOnly: true }}
                                />
                                <Button
                                    type="submit"
                                    variant="outlined"
                                    color="primary"
                                >
                                    Tạo yêu cầu hoàn trả
                                </Button>
                            </form>
                        </div>
                    )}
                    {value === 1 && (
                        <div style={{ padding: "20px", marginTop: "20px" }}>
                            <Box sx={{ height: 400, width: "100%" }}>
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
                    )}
                </div>
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

export default memo(RequestInvoice);
