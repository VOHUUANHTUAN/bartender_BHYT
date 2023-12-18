import React, { memo, useState } from "react";
import { Link } from "react-router-dom";
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
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        role: "", // Thêm trường vai trò
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };



    const [invoiceCode, setInvoiceCode] = useState('');
    const [hospitalName, setHospitalName] = useState('');
    const [amount, setAmount] = useState('');
    const [disease, setDisease] = useState('');
    const [insurancePackage, setInsurancePackage] = useState('');
    const [refundAmount, setRefundAmount] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
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
                <form onSubmit={handleSubmit}>
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
                        <InputLabel>Bệnh</InputLabel>
                        <Select //value={disease} 
                            onChange={(e) => setDisease(e.target.value)}>
                            <MenuItem value="disease1">Bệnh 1</MenuItem>
                            <MenuItem value="disease2">Bệnh 2</MenuItem>
                            {/* Add more diseases as needed */}
                        </Select>
                    </FormControl>
                    <FormControl style={{ width: '40%'}}>
                        <InputLabel>Gói bảo hiểm</InputLabel>
                        <Select //value={insurancePackage} 
                            onChange={(e) => setInsurancePackage(e.target.value)}>
                            <MenuItem value="package1">Gói 1</MenuItem>
                            <MenuItem value="package2">Gói 2</MenuItem>
                            {/* Add more insurance packages as needed */}
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
