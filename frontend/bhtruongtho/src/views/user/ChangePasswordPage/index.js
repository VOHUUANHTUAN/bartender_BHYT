import React, { useState } from "react";
import { changePasswordAPI } from "../../../api/connect";
import { useUser } from "../../../context/UserContext";
import "./style.scss";

const ChangePasswordForm = () => {
    const { user } = useUser();
    console.log(typeof user.username);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const isButtonDisabled = !currentPassword || !newPassword || !confirmPassword || newPassword !== confirmPassword;

    const handleChangePassword = async () => {
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
        <div className="change-password-form">
            <h2>Change Password</h2>

            <div>
                <label>Current Password:</label>
                <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
            </div>
            <div>
                <label>New Password:</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </div>
            <div>
                <label>Confirm Password:</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            <button onClick={handleChangePassword} disabled={isButtonDisabled || loading}>
                {loading ? "Changing Password..." : "Change Password"}
            </button>
        </div>
    );
};

export default ChangePasswordForm;
