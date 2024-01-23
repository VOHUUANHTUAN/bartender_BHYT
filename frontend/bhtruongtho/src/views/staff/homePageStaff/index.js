import React from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Paper, Grid, Button } from "@mui/material";
import { ROUTERS } from "../../../utils/router";

const HomePageStaff = () => {
    // Giả sử bạn có dữ liệu về số lượng đơn vị với địa chỉ tương ứng
    const data = [
        {
            title: "Đơn đăng ký",
            count: 10,
            color: "#DCF2F1",
            address: ROUTERS.USER.DONDANGKY,
        },

        {
            title: "Quản lý gói bảo hiểm",
            count: 15,
            color: "#6DB9EF",
            address: ROUTERS.USER.INSURANCEPACKM,
        },
        {
            title: "Thông tin khách hàng",
            count: 7,
            color: "#4CB9E7",
            address: ROUTERS.USER.INFOCUSTOMER,
        },
        {
            title: "Báo cáo tài chính",
            count: 12,
            color: "#E0F4FF",
            address: ROUTERS.USER.FINANCIALREPORT,
        },
    ];

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
