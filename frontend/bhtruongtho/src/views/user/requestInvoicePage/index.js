import React, { memo, useState, useEffect } from "react";
import { createRefund } from "../../../api/connect";
import { getAllBenh, getGoiBHByUsername, getBenhByMaGBH } from "../../../api/connect";
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
  InputAdornment
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

  const isButtonDisabled = !invoiceCode || !hospitalName || !amount || !selectedDisease || !selectedInsurancePackage;

  useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          // Gọi API để lấy dữ liệu về gói Bảo hiểm
          const goiBHByUs = await getGoiBHByUsername(user.username);
          setInsurancePackages(goiBHByUs);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [user]); // Include dependencies in the dependency array

    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
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
    }, [selectedInsurancePackage]); // Include dependencies in the dependency array


  const handleInsurancePackageChange = (e) => {
    setSelectedInsurancePackage(e.target.value);

  };

  const handleRefundSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (isButtonDisabled) {
        return;
    }
    // Handle form submission logic here
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper
        elevation={3}
        style={{ padding: "20px", marginTop: "120px", marginBottom: "100px" }}
      >
        <Typography component="h1" variant="h5">
          Đơn yêu cầu hoàn trả hóa đơn
        </Typography>
        <form onSubmit={(e) => {
          e.preventDefault();
          handleRefundSubmit(e);
        }}>
          <TextField
            label="Mã hóa đơn"
            //value={invoiceCode}
            onChange={(e) => setInvoiceCode(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Tên bệnh viện"
            //value={hospitalName}
            onChange={(e) => setHospitalName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Số tiền"
            //value={amount}
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
          />
          <Button type="submit" variant="contained" color="primary" >
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default memo(RequestInvoice);
