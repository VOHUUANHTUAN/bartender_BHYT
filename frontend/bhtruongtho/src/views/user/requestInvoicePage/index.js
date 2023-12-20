import React, { memo, useState, useEffect } from "react";
import { createRequest, getGoiBHByUsername, getBenhByMaGBH, getYCHTByUsername, getBenhVienAPI } from "../../../api/connect";
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
  InputAdornment,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Snackbar,
} from "@mui/material";

const RequestInvoice = () => {
  //user context
  const { user } = useUser();
  //error và loading
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  //khai báo các biến
  const [hospitalNameList, setHospitalNameList] = useState([]);
  const [refundAmount, setRefundAmount] = useState('');
  const [diseases, setDiseases] = useState([]);
  const [insurancePackages, setInsurancePackages] = useState([]);
  const [selectedHospitalName, setSelectedHospitalName] = useState('');
  const [selectedDisease, setSelectedDisease] = useState('');
  const [selectedInsurancePackage, setSelectedInsurancePackage] = useState('');
  const [requestList, setRequestList] = useState([]);

  //Cấu hình cho tab
  const [value, setValue] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  //Dữ liệu nhập cần validate
  const [formData, setFormData] = useState({
    invoiceCode: '',
    amount: '',
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

    //regex cho số tiền
    if (e.target.name === "amount") {
      const amountRegex = /^\d+(\.\d{0,2})?$/;
      setAmountError(!amountRegex.test(e.target.value));
    }
    //regex cho mã hóa đơn
    if (e.target.name === "invoiceCode") {
      const invoiceCodeRegex = /^[a-zA-Z0-9_@#&]+$/;
      setInvoiceCodeError(!invoiceCodeRegex.test(e.target.value));
    }
  };
  //validate cho các trường trong form
  const validateForm = () => {
    if (!formData.invoiceCode) {
      return "Mã hóa đơn không được để trống";
    }
    if (!selectedHospitalName) {
      return "Tên bệnh viện không được để trống";
    }
    if (!formData.amount) {
      return "Số tiền không được để trống";
    }
    if (!selectedDisease) {
      return "Tên bệnh không được để trống";
    }
    if (!selectedInsurancePackage) {
      return "Gói bảo hiểm không được để trống";
    }
    if(invoiceCodeError || amountError){
      return "Thông tin chưa hợp lệ";
    }   
    return null; // Validation passed
  };

  //xử lý gọi api
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        //API cho tab1
        // Gọi API để lấy dữ liệu về gói Bảo hiểm
        const goiBHByUs = await getGoiBHByUsername(user.username);
        setInsurancePackages(goiBHByUs);
        //gọi api lấy dữ liệu tất cả bệnh viện
        const benhVien = await getBenhVienAPI();
        setHospitalNameList(benhVien);

        //Nếu đã chọn gói bảo hiểm
        if (selectedInsurancePackage) {
          // Gọi API để lấy dữ liệu về bệnh dựa trên mã gói Bảo hiểm đã chọn
          const benhData = await getBenhByMaGBH(selectedInsurancePackage);
          setDiseases(benhData);
        }

        //API cho tab2
        //Gọi API để lấy yêu cầu hoàn trả theo username
        const yCHTByUs = await getYCHTByUsername(user.username);
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
    const foundPackage = insurancePackages.find((packageItem) => packageItem.maGoiBH === maGoiBHApDung);
    return foundPackage ? foundPackage.tenGoiBH : 'Unknown';
  };
  //hàm lấy tên bệnh dựa trên mã bệnh
  const getDiseaseName = (maBenh) => {
    const foundPackage = diseases.find((packageItem) => packageItem.maBenh === maBenh);
    return foundPackage.tenBenh;
  };
  //hàm lấy tên bệnh viện dựa trên mã bệnh viện
  const getHospitalName = (maBenhVien) => {
    const foundPackage = hospitalNameList.find((packageItem) => packageItem.maBV === maBenhVien);
    return foundPackage.tenBV;
  };

  //Xử lý tính số tiền hoàn trả
  //Dùng useEffect để bắt thay đổi ở bảo hiểm, tiền
  useEffect(() => {
    //lấy tỉ lệ hoàn tiền dựa trên mã bảo hiểm
    const selectedGoiBH = insurancePackages.find((packageItem) => packageItem.maGoiBH === selectedInsurancePackage);
    const refundRate = selectedGoiBH ? selectedGoiBH.tiLeHoanTien : 0;

    // Convert the amount to a float, defaulting to 0 if NaN
    const amountFloat = parseFloat(formData.amount) || 0;

    //Nếu nhập số bé hơn không thì gán số tiền hoàn trả = 0
    if(amountFloat < 0)
    {
      setRefundAmount(0)
      return
    }
    // Calculate the refund amount
    const calculatedRefundAmount = Math.round(amountFloat * (refundRate / 100));
    // Check if the calculated refund amount is a valid number
    const refundAmountValue = isNaN(calculatedRefundAmount) ? 0 : calculatedRefundAmount;
    // Set the calculated refund amount to the state
    setRefundAmount(refundAmountValue);
  }, [selectedInsurancePackage, insurancePackages, formData.amount]);

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
      soTienDaKham: formData.amount,
      benh: getDiseaseName(selectedDisease),
      maGoiBHApDung: selectedInsurancePackage,
      username: user.username,
      soTienHoanTra: refundAmount

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

  return (

    <Container component="main" maxWidth="md">
      <Paper
        elevation={3}
        style={{ padding: "20px", marginTop: "120px", marginBottom: "100px" }}
      >
        <div>
          <Tabs value={value} onChange={handleChangeTab}>
            <Tab label="Đơn yêu cầu" />
            <Tab label="Danh sách các đơn yêu cầu đã gửi" />
          </Tabs>
          {/* Nội dung tương ứng với từng tab */}
          {value === 0 && <div style={{ padding: "20px", marginTop: "20px" }}>
            <Typography component="h1" variant="h5">
              Đơn yêu cầu hoàn trả hóa đơn
            </Typography>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleRefundSubmit(e);
            }}>
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
              <FormControl style={{ width: '100%' }}>
                <InputLabel>Tên bệnh viện</InputLabel>
                <Select
                  value={selectedHospitalName}
                  onChange={(e) => setSelectedHospitalName(e.target.value)}
                >
                  {hospitalNameList.map((hos_name) => (
                    <MenuItem key={hos_name.maBV} value={hos_name.maBV}>
                      {hos_name.tenBV}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Số tiền"
                name="amount"
                value={formData.amount}
                onChange={handleChangeData}
                fullWidth
                required
                margin="normal"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                error={amountError}
                helperText={
                  amountError &&
                  "Số tiền không hợp lệ"
                }
              />
              <FormControl style={{ width: '40%', marginRight: '10px' }}>
                <InputLabel>Tên bệnh</InputLabel>
                <Select
                  value={selectedDisease}
                  onChange={(e) => setSelectedDisease(e.target.value)}
                >
                  {diseases.map((disease) => (
                    <MenuItem key={disease.maBenh} value={disease.maBenh}>
                      {disease.tenBenh}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>


              <FormControl style={{ width: '40%' }}>
                <InputLabel>Gói bảo hiểm</InputLabel>
                <Select
                  value={selectedInsurancePackage || ''}
                  onChange={handleInsurancePackageChange}
                >
                  {insurancePackages.map((packageItem) => (
                    <MenuItem key={packageItem.maGoiBH} value={packageItem.maGoiBH}>
                      {packageItem.tenGoiBH}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Số tiền hoàn trả"
                value={refundAmount}
                //onChange={(e) => setRefundAmount(e.target.value)}
                fullWidth
                margin="normal"
                InputProps={{ readOnly: true }}
              />
              <Button type="submit" variant="contained" color="primary" >
                Submit
              </Button>
            </form></div>}
          {value === 1 && <div style={{ padding: "20px", marginTop: "20px" }}>
            <Typography component="h1" variant="h5">
              Danh sách đơn yêu cầu
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Mã hóa đơn</TableCell>
                    <TableCell>Tên bệnh viện</TableCell>
                    <TableCell>Số tiền</TableCell>
                    <TableCell>Loại bệnh</TableCell>
                    <TableCell>Gói bảo hiểm</TableCell>
                    <TableCell>Số tiền hoàn trả</TableCell>
                    <TableCell>Tình trạng</TableCell>
                    <TableCell>Thời gian tạo</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {requestList && requestList.map((request, index) => (
                    <TableRow key={index}>
                      <TableCell>{request.maHDKhamBenh}</TableCell>
                      <TableCell>{request.tenBenhVien}</TableCell>
                      <TableCell>{request.soTienDaKham}</TableCell>
                      <TableCell>{request.benh}</TableCell>
                      <TableCell>{getInsurancePackageName(request.maGoiBHApDung)}</TableCell>
                      <TableCell>{request.soTienHoanTra}</TableCell>
                      <TableCell>{request.tinhTrang}</TableCell>
                      <TableCell>{request.thoiGianTao}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer></div>}
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
