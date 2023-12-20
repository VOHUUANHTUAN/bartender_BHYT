import axiosClient from "./axiosClient";
// import axiosClient from "./axiosClient";

const END_POINT = {
    GOIBAOHIEM: "GoiBaoHiem",
    TaiKhoan: "User",
    KHACHHANG: "KhachHang",
    LOGIN: "Auth/login",
    info: "Auth/userinfo",
    CHANGEPASSWORD: "User/ChangePassword",
};
export const getGoiBHAPI = () => {
    return axiosClient.get(`${END_POINT.GOIBAOHIEM}`);
};

export const logingettoken = (username, password) => {
    const data = {
        username: username,
        password: password,
    };
    return axiosClient.post(`${END_POINT.LOGIN}`, data);
};

export const getTaiKhoanByUsername = (username) => {
    return axiosClient.get(`${END_POINT.TaiKhoan}/${username}`);
};

// Hàm đăng ký tài khoản mới
// Hàm đăng ký tài khoản mới
export const KhachHang_DangKyTaiKhoan = (khachHangData) => {
    return axiosClient.post(
        `${END_POINT.TaiKhoan}`,
        JSON.stringify(khachHangData),
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
};

//Hàm lấy thông tin đăng nhập của user
export const getUserInfoByToken = (token) => {
    return axiosClient.get(`${END_POINT.info}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// Hàm lấy thông tin cá nhân khách hàng
export const getKhachHangInformation = (token) => {
    return axiosClient.get(`${END_POINT.KHACHHANG}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

//Hàm cập nhật thông tin khách hàng
export const updateKhachHangInformation = (token, khachHangData) => {
    return axiosClient.post(`${END_POINT.KHACHHANG}`, khachHangData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getGoiBHByMaGBH = (MaGBH) => {
    return axiosClient.get(`${END_POINT.GOIBAOHIEM}/${MaGBH}`);
};

export const changePasswordAPI = (username, changePasswordData) => {
    return axiosClient.put(
        `${END_POINT.CHANGEPASSWORD}/${username}`,
        changePasswordData
    );
};
