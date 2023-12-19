import React, { memo, useState, useEffect } from "react";
import { createRequest, getGoiBHByUsername, getBenhByMaGBH, getYCHTByUsername } from "../../../api/connect";
import { Link } from "react-router-dom";
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

} from "@mui/material";

import { useNavigate } from "react-router-dom";

const RequestInvoice = () => {
  const { user } = useUser();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [invoiceCode, setInvoiceCode] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [amount, setAmount] = useState('');
  const [refundAmount, setRefundAmount] = useState('');
  const [diseases, setDiseases] = useState([]);
  const [insurancePackages, setInsurancePackages] = useState([]);
  const [selectedDisease, setSelectedDisease] = useState('');
  const [selectedInsurancePackage, setSelectedInsurancePackage] = useState('');
  const [requestList, setRequestList] = useState([]);

  const isButtonDisabled = !invoiceCode || !hospitalName || !amount || !selectedDisease || !selectedInsurancePackage;

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Gọi API để lấy dữ liệu về gói Bảo hiểm
        const goiBHByUs = await getGoiBHByUsername(user.username);
        setInsurancePackages(goiBHByUs);

        //Gọi API để lấy yêu cầu hoàn trả theo username
        const yCHTByUs = await getYCHTByUsername(user.username);
        setRequestList(yCHTByUs);

        // Check if a package is selected before making the API call
        if (selectedInsurancePackage) {
          // Gọi API để lấy dữ liệu về bệnh dựa trên mã gói Bảo hiểm đã chọn
          const benhData = await getBenhByMaGBH(selectedInsurancePackage);
          setDiseases(benhData);
        }

      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, selectedInsurancePackage, value]); // Include dependencies in the dependency array

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);
  //       // Check if a package is selected before making the API call
  //       if (selectedInsurancePackage) {
  //         // Gọi API để lấy dữ liệu về bệnh dựa trên mã gói Bảo hiểm đã chọn
  //         const benhData = await getBenhByMaGBH(selectedInsurancePackage);
  //         setDiseases(benhData);
  //       }
  //     } catch (error) {
  //       setError(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [selectedInsurancePackage]); // Include dependencies in the dependency array


  const handleInsurancePackageChange = (e) => {
    setSelectedInsurancePackage(e.target.value);

  };
  // Hàm để lấy tên gói bảo hiểm dựa trên MaGoiBH
  const getInsurancePackageName = (maGoiBHApDung) => {
    const foundPackage = insurancePackages.find((packageItem) => packageItem.maGoiBH === maGoiBHApDung);
    return foundPackage ? foundPackage.tenGoiBH : 'Unknown';
  };
  const getDiseaseName = (maBenh) => {
    const foundPackage = diseases.find((packageItem) => packageItem.maBenh === maBenh);
    return foundPackage.tenBenh;
  };
  useEffect(() => {
    const selectedGoiBH = insurancePackages.find((packageItem) => packageItem.maGoiBH === selectedInsurancePackage);

    const refundRate = selectedGoiBH ? selectedGoiBH.tiLeHoanTien : 0;
    // Convert the amount to a float, defaulting to 0 if NaN
    const amountFloat = parseFloat(amount) || 0;
    // Calculate the refund amount
    const calculatedRefundAmount = Math.round(amountFloat * (refundRate / 100));

    // Check if the calculated refund amount is a valid number
    const refundAmountValue = isNaN(calculatedRefundAmount) ? 0 : calculatedRefundAmount;
   
    // Set the calculated refund amount to the state
    setRefundAmount(refundAmountValue);
  }, [selectedInsurancePackage, insurancePackages, amount]);


  const handleRefundSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (isButtonDisabled) {
      return;
    }
    // Handle form submission logic here
    setLoading(true);
const yeuCauData = {
    // Populate with the necessary data
      maHDKhamBenh: invoiceCode,
            tenBenhVien: hospitalName,
            soTienDaKham: amount,
            benh: getDiseaseName(selectedDisease),
            maGoiBHApDung: selectedInsurancePackage,
            username: user.username
};
console.log(yeuCauData)
    try {
      const responseData = await createRequest(yeuCauData);
      console.log('Response Data:', responseData);
        alert("successfully!");
    } catch (error) {
        alert(`Error: ${error.message}`);
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
          <Tabs value={value} onChange={handleChange}>
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
                value={invoiceCode}
                onChange={(e) => setInvoiceCode(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Tên bệnh viện"
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Số tiền"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                fullWidth
                margin="normal"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />
              <FormControl style={{ width: '40%', marginRight: '10px' }}>
                <InputLabel>Diseases</InputLabel>
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
                <InputLabel>Insurance Packages</InputLabel>
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
    </Container>
  );
};

export default memo(RequestInvoice);
