import axiosClient from "./axiosClient";

const END_POINT = {
    GOIBAOHIEM: "GoiBaoHiem",
    BENH: "Benh",
    TaiKhoan: "User",
    KHACHHANG: "KhachHang",
    LOGIN: "Auth/login",
    info: "Auth/userinfo",
    CHANGEPASSWORD: "ChangePassword",
    YEUCAUHOANTRA: "YeuCauHoanTra",
    TAOYEUCAU: "TaoYeuCauHoanTra",
    GOIBHBYUS: "GetGoiBHByUs",
    YCHTBYUS: "GetYCHTByUs",
    BENHVIEN: "BenhVien",
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
export const KhachHang_DangKyTaiKhoan = (khachHangData) => {
    return axiosClient.post(`${END_POINT.TaiKhoan}`, khachHangData);
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


export const getBenhByMaGBH = (MaGBH) => {
    return axiosClient.get(`${END_POINT.BENH}/${MaGBH}`);
};


export const changePasswordAPI = async (username, changePasswordData) => {
    console.log('URL:', `${END_POINT.TaiKhoan}/${username}/${END_POINT.CHANGEPASSWORD}`);
    console.log('Headers:', { 'Content-Type': 'application/json' });
    console.log('Data:', changePasswordData);
    try {
        const response = await axiosClient.put(
            `${END_POINT.TaiKhoan}/${username}/${END_POINT.CHANGEPASSWORD}`,
            changePasswordData,
            { headers: { 'Content-Type': 'application/json' } }
        );

        return response.data; // Return data from the response if needed
    } catch (error) {
        //console.error('Error:', error);
        throw new Error(`Error changing password: ${error.message}`);
    }
};

export const createRequest = async (yeuCauData) => {
        const response = await axiosClient.post(
            `${END_POINT.YEUCAUHOANTRA}/${END_POINT.TAOYEUCAU}`,
            yeuCauData
        );
        return response;
};

export const getAllBenh = () => {
    return axiosClient.get(`${END_POINT.BENH}`);
};

export const getGoiBHByUsername = (username) => {
    return axiosClient.get(`${END_POINT.GOIBAOHIEM}/${END_POINT.GOIBHBYUS}/${username}`);
};

export const getYCHTByUsername = (username) => {
    const res = axiosClient.get(`${END_POINT.YEUCAUHOANTRA}/${END_POINT.YCHTBYUS}/${username}`);
    return res
};

export const getBenhVienAPI = () => {
    return axiosClient.get(`${END_POINT.BENHVIEN}`);
};
