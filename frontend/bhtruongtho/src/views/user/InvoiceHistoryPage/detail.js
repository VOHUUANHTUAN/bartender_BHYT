import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
    Container,
    Paper,
    Typography,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Button,
} from "@mui/material";
import dayjs from "dayjs";
import { getDonDangKyByID } from "../../../api/connect"; // Import the actual API function to fetch the detail data
import { ROUTERS } from "../../../utils/router";

const RegistrationDetail = () => {
    const params = useParams();
    const [registrationDetail, setRegistrationDetail] = useState(null);

    useEffect(() => {
        console.log(params.id);
        const fetchData = async () => {
            try {
                // Use the API function to fetch data based on the ID
                const response = await getDonDangKyByID(
                    localStorage.getItem("token"),
                    params.id
                );
                console.log(response);
                setRegistrationDetail(response);
            } catch (error) {
                console.error("Error fetching registration detail:", error);
            }
        };
        fetchData();
    }, [params.id]);

    return (
        <Container component="main" maxWidth="md">
            <Paper
                elevation={3}
                style={{ padding: "20px", margin: "150px 0px 20px 0px" }}
            >
                {registrationDetail ? (
                    <>
                        <Typography variant="h5">
                            Chi tiết đơn đăng ký
                        </Typography>
                        <Typography variant="body1">
                            Mã đơn đăng ký: {registrationDetail.maDonDK}
                        </Typography>
                        <Typography variant="body1">
                            Thời gian đăng ký:{" "}
                            {dayjs(registrationDetail.thoiGianDK).format(
                                "DD/MM/YYYY HH:mm:ss"
                            )}
                        </Typography>
                        <Typography variant="body1">
                            Thời gian bắt đầu:{" "}
                            {dayjs(registrationDetail.thoiGianBD).format(
                                "DD/MM/YYYY"
                            )}
                        </Typography>
                        <Typography variant="body1">
                            Thời gian kết thúc:{" "}
                            {dayjs(registrationDetail.thoiGianHetHan).format(
                                "DD/MM/YYYY"
                            )}
                        </Typography>
                        <Typography variant="body1">
                            Tình trạng: {registrationDetail.tinhTrang}
                        </Typography>
                        <Typography variant="body1">
                            Tổng giá: {registrationDetail.tongGia}đ
                        </Typography>
                        {/* Display additional information as needed */}
                        <Typography variant="body1">
                            Khách hàng: {registrationDetail.khachHang.hoTen}
                        </Typography>
                        <Typography variant="body1">
                            Gói bảo hiểm:{" "}
                            {registrationDetail.goiBaoHiem.tenGoiBH}
                        </Typography>
                        <Typography variant="body1">
                            Nhân viên: {registrationDetail.nhanVien.hoTen}
                        </Typography>
                        {/* Add more details based on your data structure */}
                        <Button
                            color="primary"
                            fullWidth
                            style={{ marginTop: "20px" }}
                            component={Link}
                            to={`/${ROUTERS.USER.INVOICEHISTORYPAGE}`}
                        >
                            Quay lại
                        </Button>
                    </>
                ) : (
                    <Typography variant="body1">
                        Đang tải thông tin đơn đăng ký...
                    </Typography>
                )}
            </Paper>
        </Container>
    );
};

export default RegistrationDetail;
