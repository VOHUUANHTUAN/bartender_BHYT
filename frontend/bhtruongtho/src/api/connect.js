import axiosClient from "./axiosClient";
// import axiosClient from "./axiosClient";

const END_POINT = {
    GOIBAOHIEM: "GoiBaoHiem",
    BENH: "Benh",
    TaiKhoan: "User",
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

export const changePasswordAPI = (username, changePasswordData) => {
    return axiosClient.put(`${END_POINT.CHANGEPASSWORD}/${username}`, changePasswordData);
  };
