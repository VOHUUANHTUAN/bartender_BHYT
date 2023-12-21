import axiosClient from "./axiosClient";

const END_POINT = {
    GOIBAOHIEM: "GoiBaoHiem",
    BENH: "Benh",
    TaiKhoan: "User",
    LOGIN: "Auth/login",
    info: "Auth/userinfo",
    CHANGEPASSWORD: "ChangePassword",
    DONDANGKY: "DONDANGKY",
    NHANVIEN: "NhanVien",
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

export const getUserInfoByToken = (token) => {
    return axiosClient.get(`${END_POINT.info}`, {
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
    try {
        const response = await axiosClient.put(
            `${END_POINT.TaiKhoan}/${username}/${END_POINT.CHANGEPASSWORD}`,
            changePasswordData,
            { headers: { 'Content-Type': 'application/json' } }
        );

        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw new Error(`Error changing password: ${error.message}`);
    }
};

export const getDonDangKyList = () => {
    return axiosClient.get(`${END_POINT.DONDANGKY}`);
}

export const getDonDangKyByID = (ID) => {
    return axiosClient.get(`${END_POINT.DONDANGKY}/${ID}`);
}

export const getNhanVienByID = (ID) => {
    return axiosClient.get(`${END_POINT.NHANVIEN}/${ID}`);
}

export const putDonDangKyByID = async (ID, Data) => {
    try {
        const response = await axiosClient.put(
            `${END_POINT.DONDANGKY}/${ID}`,
            Data,
            { headers: { 'Content-Type': 'application/json' } }
        );
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw new Error(`Error chang DDK: ${error.message}`);
    }
};