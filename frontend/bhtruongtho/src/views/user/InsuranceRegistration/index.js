import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import { getGoiBHByMaGBH } from "../../../api/connect";

const InsuranceRegistration_ = () => {
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [duration, setDuration] = useState("");
    const [paymentFrequency, setPaymentFrequency] = useState("");
    const [insuranceAmount, setInsuranceAmount] = useState("");
    const [diseaseList, setDiseaseList] = useState("");
    const { id } = 1;
    useEffect(() => {
        const fetchDataById = async () => {
            try {
                const response = await getGoiBHByMaGBH(id);
                setSelectedPackage(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchDataById();
    }, [id]); // Chắc chắn rằng bạn đã thêm 'id' vào dependency array

    useEffect(() => {
        if (selectedPackage && duration && paymentFrequency) {
            const calculatedAmount =
                selectedPackage.gia * duration * paymentFrequency;
            setInsuranceAmount(calculatedAmount);
        }
    }, [selectedPackage, duration, paymentFrequency]);

    const handleRegistrationSubmit = (e) => {
        e.preventDefault();
        console.log("Thông tin đăng ký:", {
            maGoiBH: selectedPackage.maGoiBH,
            tenGoiBH: selectedPackage.tenGoiBH,
            motaGoiBH: selectedPackage.motaGoiBH,
            gia: selectedPackage.gia,
            tiLeHoanTien: selectedPackage.tiLeHoanTien,
            thoiHan: duration,
            tanSuatThanhToan: paymentFrequency,
            soTienBaoHiem: insuranceAmount,
            danhSachBenh: diseaseList,
        });
        // Gọi API hoặc thực hiện các xử lý khác tại đây
    };

    return (
        <Container component="main" maxWidth="md">
            <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
                <Typography component="h1" variant="h5">
                    Đăng ký gói bảo hiểm
                </Typography>
                <form onSubmit={handleRegistrationSubmit}>
                    {selectedPackage ? (
                        <>
                            <Typography variant="subtitle1">
                                Thông tin gói bảo hiểm đã chọn:
                            </Typography>
                            <Typography variant="body1">
                                Tên gói bảo hiểm: {selectedPackage.tenGoiBH}
                            </Typography>
                            <Typography variant="body1">
                                Mô tả: {selectedPackage.motaGoiBH}
                            </Typography>
                            <Typography variant="body1">
                                Giá cơ bản: {selectedPackage.gia}đ
                            </Typography>
                            <Typography variant="body1">
                                Tỉ lệ hoàn tiền: {selectedPackage.tiLeHoanTien}%
                            </Typography>

                            <FormControl
                                fullWidth
                                style={{ marginTop: "20px" }}
                            >
                                <InputLabel id="duration-label">
                                    Thời hạn (năm)
                                </InputLabel>
                                <Select
                                    labelId="duration-label"
                                    id="duration"
                                    value={duration}
                                    onChange={(e) =>
                                        setDuration(e.target.value)
                                    }
                                    required
                                >
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    {/* Thêm các giá trị khác nếu cần */}
                                </Select>
                            </FormControl>

                            <FormControl
                                fullWidth
                                style={{ marginTop: "20px" }}
                            >
                                <InputLabel id="payment-frequency-label">
                                    Số lần thanh toán
                                </InputLabel>
                                <Select
                                    labelId="payment-frequency-label"
                                    id="payment-frequency"
                                    value={paymentFrequency}
                                    onChange={(e) =>
                                        setPaymentFrequency(e.target.value)
                                    }
                                    required
                                >
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    {/* Thêm các giá trị khác nếu cần */}
                                </Select>
                            </FormControl>

                            <TextField
                                label="Giá mỗi kỳ hạn (đ)"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                required
                                value={insuranceAmount}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                style={{ marginTop: "20px" }}
                            >
                                Đăng ký
                            </Button>
                        </>
                    ) : (
                        <Typography variant="body1">
                            Đang tải thông tin gói bảo hiểm...
                        </Typography>
                    )}
                </form>
            </Paper>
        </Container>
    );
};

export default InsuranceRegistration_;
