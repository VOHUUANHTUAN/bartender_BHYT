import React, { useState } from "react";
import { changePasswordAPI } from "../../../api/connect";
import { useUser } from "../../../context/UserContext";
import {
    Container,
    Paper,
    TextField,
    Button,
    Typography,
} from "@mui/material";

const ChangePasswordForm = () => {
    const { user } = useUser();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const isButtonDisabled = !currentPassword || !newPassword || !confirmPassword || newPassword !== confirmPassword;

    const handleChangePassword = async (e) => {
        e.preventDefault(); // Prevent default form submission

        if (isButtonDisabled) {
            return;
        }

        setLoading(true);

        try {
            await changePasswordAPI(user.username, {
                currentPassword,
                newPassword,
                confirmPassword,
            });

            alert("Password changed successfully!");
        } catch (error) {
            alert(`Error changing password: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3}
                style={{ padding: "20px", margin: "150px 0px 50px 0px" }}
            >
                <Typography component="h1" variant="h5">
                    Đổi mật khẩu
                </Typography>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleChangePassword(e);
                }}>
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
        </Container>
    );
};

export default ChangePasswordForm;
