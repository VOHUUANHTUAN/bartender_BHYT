import { memo, useEffect, useState } from "react"
import { changePasswordAPI } from "../../../api/connect";
import "./style.scss"
// import { Link } from 'react-router-dom';

const ChangePasswordForm = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            alert("New password and confirm password do not match.");
            return;
        }
        console.log("hello")
        try {
            // Gọi API để đổi mật khẩu
            await changePasswordAPI({
                currentPassword: currentPassword,
                newPassword: newPassword,
                confirmPassword: confirmPassword,
            });

            // Đổi mật khẩu thành công, thực hiện các xử lý khác nếu cần
            alert("Password changed successfully!");

            // Sau khi đổi mật khẩu thành công, có thể thực hiện điều gì đó, ví dụ: chuyển hướng trang, cập nhật state, vv.
        } catch (error) {
            // Xử lý lỗi khi đổi mật khẩu
            alert(`Error changing password: ${error.message}`);
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
            <button onClick={handleChangePassword}>Change Password</button>
        </div>
    );
};
export default memo(ChangePasswordForm);
