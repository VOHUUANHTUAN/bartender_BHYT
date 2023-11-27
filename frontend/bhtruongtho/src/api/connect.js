import axiosClient from "./axiosClient";

const END_POINT = {
    GOIBAOHIEM: "GoiBaoHiem",
    BOOK: "Book",
    BOOKBYID: "Book/id:Guid",
    TaiKhoan: "TaiKhoan",
}
export const getGoiBHAPI= () => {
    return axiosClient.get(`${END_POINT.GOIBAOHIEM}`);
}
export const getBookAPI = () => {
    return axiosClient.get(`${END_POINT.BOOK}`);
}
export const getTaiKhoanByUsername = (username) => {
    return axiosClient.get(`${END_POINT.TaiKhoan}/${username}`);
  };
  