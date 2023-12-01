import axiosClient from "./axiosClient";

const END_POINT = {
  GOIBAOHIEM: "GoiBaoHiem",
  TaiKhoan: "User",
};
export const getGoiBHAPI = () => {
  return axiosClient.get(`${END_POINT.GOIBAOHIEM}`);
};
export const getBookAPI = () => {
  return axiosClient.get(`${END_POINT.BOOK}`);
};
export const getTaiKhoanByUsername = (username) => {
  return axiosClient.get(`${END_POINT.TaiKhoan}/${username}`);
};
export const getGoiBHByMaGBH = (MaGBH) => {
  return axiosClient.get(`${END_POINT.GOIBAOHIEM}/${MaGBH}`);
};