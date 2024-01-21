// src/components/HomePageStaff.js

import React from "react";
import { Link } from "react-router-dom";
import { Container, Typography, List, ListItem, Button } from "@mui/material";

const HomePageStaff = () => {
    return (
        <Container maxWidth="md" sx={{ marginTop: 5 }}>
            <Typography variant="h3" align="center" gutterBottom>
                Staff Home Page
            </Typography>
            <List>
                <ListItem>
                    <Button
                        component={Link}
                        to="/staff"
                        variant="contained"
                        color="primary"
                    >
                        Staff
                    </Button>
                </ListItem>
                <ListItem>
                    <Button
                        component={Link}
                        to="/registrationForms"
                        variant="contained"
                        color="primary"
                    >
                        Registration Forms
                    </Button>
                </ListItem>
                <ListItem>
                    <Button
                        component={Link}
                        to="/transactions"
                        variant="contained"
                        color="primary"
                    >
                        Transactions
                    </Button>
                </ListItem>
                <ListItem>
                    <Button
                        component={Link}
                        to="/insurancePackManagement/add"
                        variant="contained"
                        color="primary"
                    >
                        Add Insurance Pack
                    </Button>
                </ListItem>
                <ListItem>
                    <Button
                        component={Link}
                        to="/insurancePackManagement"
                        variant="contained"
                        color="primary"
                    >
                        Insurance Pack Management
                    </Button>
                </ListItem>
                <ListItem>
                    <Button
                        component={Link}
                        to="/infoCustomer"
                        variant="contained"
                        color="primary"
                    >
                        Info Customer
                    </Button>
                </ListItem>
                <ListItem>
                    <Button
                        component={Link}
                        to="/financialReport"
                        variant="contained"
                        color="primary"
                    >
                        Financial Report
                    </Button>
                </ListItem>
            </List>
        </Container>
    );
};

export default HomePageStaff;
