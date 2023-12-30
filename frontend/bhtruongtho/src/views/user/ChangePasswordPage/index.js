import React, { useState } from "react";
import { changePasswordAPI } from "../../../api/connect";
import { useUser } from "../../../context/UserContext";
import { Container, Paper, TextField, Button, Typography } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
const ChangePasswordForm = () => {
    const { user } = useUser();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const isButtonDisabled =
        !currentPassword ||
        !newPassword ||
        !confirmPassword ||
        newPassword !== confirmPassword;
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("error");
    const handleChangePassword = async (e) => {
        console.log(user);

        e.preventDefault();

        if (isButtonDisabled) {
            openSnackbar("Mật khẩu không trùng khớp", "warning");
            return;
        }

        setLoading(true);

        try {
            const response = await changePasswordAPI(user.username, {
                currentPassword,
                newPassword,
                confirmPassword,
            });
            if (response)
                openSnackbar("Thay đổi password thành công", "success");
        } catch (error) {
            console.log(error);
            openSnackbar(error.response.data, "warning");
        } finally {
            setLoading(false);
        }
    };
    const openSnackbar = (message, severity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };
    const handleCloseSnackbar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackbarOpen(false);
    };
    return (
        <Container component="main" maxWidth="xs">
            <Paper
                elevation={3}
                style={{ padding: "20px", margin: "150px 0px 50px 0px" }}
            >
                <Typography component="h1" variant="h5">
                    Đổi mật khẩu
                </Typography>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleChangePassword(e);
                    }}
                >
                    <TextField
                        label="Mật khẩu hiện tại"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />

                    <TextField
                        label="Mật khẩu mới"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />

                    <TextField
                        label="Nhập lại mật khẩu mới"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{ marginTop: "20px" }}
                    >
                        Đổi mật khẩu
                    </Button>
                </form>
            </Paper>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    severity={snackbarSeverity}
                    onClose={handleCloseSnackbar}
                >
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </Container>
    );
};

export default ChangePasswordForm;
