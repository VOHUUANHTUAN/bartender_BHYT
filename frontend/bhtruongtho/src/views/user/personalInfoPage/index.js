import React, { memo, useEffect, useState } from "react";
import {
    updateKhachHangInformation,
    getKhachHangInformation,
    getUserInfoByToken,
} from "../../../api/connect";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../../../context/UserContext";
import {
    Typography,
    Container,
    TextField,
    Button,
    Paper,
    Snackbar,
} from "@mui/material";

// ... (imports)

const ChangeInformation = () => {
    const { user, login, setUser } = useUser(); // Assuming this provides the user data

    // Initialize SoDu and username from user data
    const [soDu, setSoDu] = useState(user ? user.soDu : 0);
    const [username, setUsername] = useState(
        localStorage.getItem("username") || ""
    );
    const [hoTen, setHoTen] = useState("");
    const [diaChi, setDiaChi] = useState("");
    const [soDienThoai, setSoDienThoai] = useState("");
    const [email, setEmail] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const callAsyncFunction = async (khachHangData) => {
        try {
            const token = localStorage.getItem("token");
            var response = await updateKhachHangInformation(
                token,
                khachHangData
            );
            setSnackbarMessage(response);
            setSnackbarOpen(true);
        } catch (error) {
            setSnackbarMessage(error.response.data);
            setSnackbarOpen(true);
        }
    };

    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");
            const khachHangData = await getKhachHangInformation(token);
            // Initialize state variables from the fetched data
            if (khachHangData) {
                setHoTen(khachHangData.hoTen || "");
                setDiaChi(khachHangData.diaChi || "");
                setSoDienThoai(khachHangData.sdt || "");
                setEmail(khachHangData.email || "");
                setSoDu(khachHangData.soDu || "");
                setUsername(localStorage.getItem("username") || "");
                // Do not update SoDu and username as they should remain constant
            }
            const res = await getUserInfoByToken(token);
            if (res) {
                localStorage.setItem("firstLogin", res.firstLogin);
            }
            login({
                username: res.username,
                token: token,
                firstLogin: res.firstLogin,
                auth: true,
                role: res.role,
            });
        } catch (error) {
            console.error("Error fetching user information", error);
        }
    };
    useEffect(() => {
        fetchData();
    }, [username]); // Empty dependency array ensures the effect runs only once on mount

    const handleSaveInformation = () => {
        // Kiểm tra định dạng
        if (!validateFormat()) {
            // Hiển thị thông báo nếu có lỗi định dạng
            setSnackbarOpen(true);
            return;
        }
        // Tạo đối tượng chứa thông tin để gửi xuống API
        const informationData = {
            hoTen: hoTen,
            diaChi: diaChi,
            SDT: soDienThoai,
            email: email,
            soDu: soDu, // Include SoDu from the state
            username: username, // Include username from the state
        };
        // console.log(informationData);
        callAsyncFunction(informationData);
        fetchData();
    };

    const validateFormat = () => {
        // Kiểm tra định dạng email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            // Hiển thị thông báo hoặc thực hiện xử lý khi định dạng không đúng
            setSnackbarMessage("Định dạng email không đúng");
            return false;
        }

        // Kiểm tra định dạng số điện thoại
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(soDienThoai)) {
            // Hiển thị thông báo hoặc thực hiện xử lý khi định dạng không đúng
            setSnackbarMessage("Định dạng số điện thoại không đúng");
            return false;
        }

        // Kiểm tra tên không được trống
        if (!hoTen) {
            setSnackbarMessage("Tên không được để trống");
            return false;
        }

        // Nếu tất cả định dạng đều đúng, trả về true
        return true;
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper
                elevation={3}
                style={{ padding: "20px", margin: "150px 0px 50px 0px" }}
            >
                <Typography component="h1" variant="h5">
                    Thông tin cá nhân
                </Typography>
                <form>
                    <TextField
                        label="Username"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        disabled
                        value={username}
                    />
                    <TextField
                        label="Họ tên"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        value={hoTen}
                        onChange={(e) => setHoTen(e.target.value)}
                    />
                    <TextField
                        label="Địa chỉ"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        value={diaChi}
                        onChange={(e) => setDiaChi(e.target.value)}
                    />
                    <TextField
                        label="Số điện thoại"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        value={soDienThoai}
                        onChange={(e) => setSoDienThoai(e.target.value)}
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {/* Display SoDu and username without allowing editing */}
                    <TextField
                        label="Số dư"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        disabled
                        value={soDu}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleSaveInformation}
                        style={{ marginTop: "20px" }}
                    >
                        Lưu thông tin
                    </Button>
                </form>
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

export default ChangeInformation;
