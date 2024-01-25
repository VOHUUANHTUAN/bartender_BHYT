import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTERS } from "../../../utils/router";

import { getStaffHompageInfo } from "../../../api/connect";
const HomePageStaff = () => {
    // Giả sử bạn có dữ liệu về số lượng đơn vị với địa chỉ tương ứng
    const [count, setCount] = useState([]);

    const data = [
        {
            title: "Đơn đăng ký",
            count: count.donDangKyChuaDuyet,
            color: "#DCF2F1",
            address: ROUTERS.USER.DONDANGKY,
        },

        {
            title: "Quản lý gói bảo hiểm",
            count: count.goiBaoHiemDangCungCap,
            color: "#6DB9EF",
            address: ROUTERS.USER.INSURANCEPACKM,
        },
        {
            title: "Yêu cầu hoàn trả",
            count: count.yeuCauHoanTraChuaDuyet,
            color: "#E0F4FF",
            address: ROUTERS.USER.YEUCAUHOANTRA,
        },
        {
            title: "Thông tin khách hàng",
            count: count.khachHangTinhTrang1,
            color: "#E0F4FF",
            address: ROUTERS.USER.INFOCUSTOMER,
        },
        {
            title: "Báo cáo tài chính",
            count: 12,
            color: "#4CB9E7",
            address: ROUTERS.USER.FINANCIALREPORT,
        },
    ];
    const fetchData = async () => {
        try {
            const response = await getStaffHompageInfo(
                localStorage.getItem("token")
            );
            console.log(response);
            setCount(response);
        } catch (error) {}
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Container maxWidth="md" sx={{ marginTop: 5 }}>
            <Typography variant="h3" align="center" gutterBottom>
                Trang chủ nhân viên
            </Typography>
            <Grid container spacing={2}>
                {data.map((item, index) => (
                    <Grid item xs={6} md={4} lg={3} key={index}>
                        <Paper
                            sx={{
                                padding: 2,
                                textAlign: "center",
                                backgroundColor: item.color,
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography variant="h6" gutterBottom>
                                {item.title}
                            </Typography>
                            <Typography variant="h4">{item.count}</Typography>
                            <Button
                                component={Link}
                                to={`../${item.address}`}
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ marginTop: 2 }}
                            >
                                Xem chi tiết
                            </Button>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default HomePageStaff;
