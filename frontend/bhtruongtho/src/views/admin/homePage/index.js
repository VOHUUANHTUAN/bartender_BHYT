// src/components/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Paper, Button, Typography } from "@mui/material";

const HomePageAdmin = () => {
    return (
        <Container component="main" maxWidth="lg">
            <Paper
                elevation={3}
                style={{ padding: "20px", marginTop: "120px", marginBottom: "100px", textAlign: "center" }}
            >
                <Typography variant="h4" gutterBottom>
                    Chào mừng đến với trang chủ của bạn. Admin!
                </Typography>
                <Button component={Link} to="/addnewstaff" variant="contained" style={{ marginRight: "10px" }}>
                    Thêm mới nhân viên

                </Button>
                <Button component={Link} to="/checkonstaff" variant="contained">
                    Xem thông tin nhân viên

                </Button>
            </Paper>
        </Container>
    );
};

export default HomePageAdmin;
