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
    DONDANGKY: "DONDANGKY",
    NHANVIEN: "NhanVien",
    UPDATE: "update",
    CHINHSACH: "chinhsach",
    ADD: "add",
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
    try {
        const response = await axiosClient.put(
            `${END_POINT.TaiKhoan}/${username}/${END_POINT.CHANGEPASSWORD}`,
            changePasswordData,
            { headers: { 'Content-Type': 'application/json' } }
        );

        return response.data;
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

export const updateInsPack = async (maGoiBH, goiBHData) => {
    const response = await axiosClient.put(
        `${END_POINT.GOIBAOHIEM}/${maGoiBH}/${END_POINT.UPDATE}`,
        goiBHData
    );
    return response;
};

export const addBenhForGBH = async (MaGoiBH, MaBenh) => {
    const response = await axiosClient.post(
        `${END_POINT.CHINHSACH}/${END_POINT.ADD}`,
        {MaGoiBH, MaBenh}
    );
    return response;
};

export const deleteBenhFromBGH = async (maGoiBH, maBenh) => {
    try {
        // Gọi API xóa bệnh khỏi Gói Bảo hiểm
        const response = await axiosClient.delete( `${END_POINT.CHINHSACH}/${maGoiBH}/${maBenh}/delete`);
        return response;
      } catch (error) {
        // Xử lý lỗi nếu cần
        console.error('Lỗi khi xóa bệnh khỏi Gói Bảo hiểm:', error.message);
        throw error;
      }
};

export const addInsPack = async (goiBHData) => {
    const response = await axiosClient.post(
        `${END_POINT.GOIBAOHIEM}/${END_POINT.ADD}`,
        goiBHData
    );
    return response;
};