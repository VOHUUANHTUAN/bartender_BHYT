import { memo, useState, useEffect } from "react";
import "./style.scss";
import { ROUTERS } from "../../../../utils/router";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../../../context/UserContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import LockIcon from "@mui/icons-material/Lock";
import Avatar from "@mui/material/Avatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { getUserInfoByToken } from "../../../../api/connect";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ReceiptIcon from "@mui/icons-material/Receipt";
const Header = () => {
    const navigate = useNavigate();

    // Gọi hàm để lấy thông tin người dùng
    // Gọi hàm để lấy thông tin người dùng
    const { user, login, logout } = useUser();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    useEffect(() => {
        // Kiểm tra xem có thông tin người dùng trong local storage không
        getUserInfo(localStorage.getItem("token"));
    }, []);

    const getUserInfo = async (token) => {
        try {
            const response = await getUserInfoByToken(token);

            if (response) {
                login({
                    username: response.username,
                    token: token,
                    firstLogin: response.firstLogin,
                    role: response.role,
                });
                localStorage.setItem("token", token);
                localStorage.setItem("username", response.username);
                localStorage.setItem("firstLogin", response.firstLogin);
                localStorage.setItem("role", response.role);
                localStorage.setItem("auth", true);
                console.log("Login successful");
            } else {
                localStorage.clear();
                console.log("Login fail");
                logout();
            }
        } catch (error) {
            localStorage.clear();
            console.log("Login fail");
            logout();
            console.log(error.message);
        }
    };
    const [menus, setMenus] = useState([
        {
            name: "Trang chủ",
            path: ROUTERS.USER.HOME,
        },
        {
            name: "Sản phẩm",
            path: ROUTERS.USER.PRODUCT,

        },
        {
            name: "Tin tức",
            path: ROUTERS.USER.NEWS,
        },
    ]);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <div className=" nav_header">
                <div className="container__header__footer">
                    <div className="row">
                        <div className="col-xl-3 header_logo">
                            <div>BARTENDER_HCMUS</div>
                        </div>
                        <div className="col-xl-6">
                            <nav className="header_menu">
                                <ul>
                                    {menus?.map((menu, menuKey) => (
                                        <li
                                            key={menuKey}
                                            className={
                                                menuKey === 0 ? "active" : ""
                                            }
                                        >
                                            <Link to={menu?.path}>
                                                {menu?.name}
                                            </Link>
                                            {menu.child && (
                                                <ul className="header_menu_dropdown">
                                                    {menu.child.map(
                                                        (
                                                            childItem,
                                                            childKey
                                                        ) => (
                                                            <li
                                                                key={`${menuKey}-${childKey}`}
                                                            >
                                                                <Link
                                                                    to={
                                                                        childItem.path
                                                                    }
                                                                >
                                                                    {
                                                                        childItem.name
                                                                    }
                                                                </Link>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                        <div className="col-xl-3 header_top_right">
                            {/* <span>Đăng ký tư vấn</span> */}
                            <ul>
                                {user ? (
                                    <>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                textAlign: "center",
                                            }}
                                        >
                                            <Typography sx={{ minWidth: 100 }}>
                                                Xin chào, {user.username}!
                                            </Typography>
                                            <Tooltip title="Account">
                                                <IconButton
                                                    onClick={handleClick}
                                                    size="small"
                                                    sx={{ ml: 2 }}
                                                    aria-controls={
                                                        open
                                                            ? "account-menu"
                                                            : undefined
                                                    }
                                                    aria-haspopup="true"
                                                    aria-expanded={
                                                        open
                                                            ? "true"
                                                            : undefined
                                                    }
                                                >
                                                    <AccountCircleIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                        <Menu
                                            anchorEl={anchorEl}
                                            id="account-menu"
                                            open={open}
                                            onClose={handleClose}
                                            onClick={handleClose}
                                            slotProps={{
                                                elevation: 0,
                                                sx: {
                                                    overflow: "visible",
                                                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                                    mt: 1.5,
                                                    "& .MuiAvatar-root": {
                                                        width: 32,
                                                        height: 32,
                                                        ml: -0.5,
                                                        mr: 1,
                                                    },
                                                    "&:before": {
                                                        content: '""',
                                                        display: "block",
                                                        position: "absolute",
                                                        top: 0,
                                                        right: 14,
                                                        width: 10,
                                                        height: 10,
                                                        bgcolor:
                                                            "background.paper",
                                                        transform:
                                                            "translateY(-50%) rotate(45deg)",
                                                        zIndex: 0,
                                                    },
                                                },
                                            }}
                                            transformOrigin={{
                                                horizontal: "right",
                                                vertical: "top",
                                            }}
                                            anchorOrigin={{
                                                horizontal: "right",
                                                vertical: "bottom",
                                            }}
                                        >
                                            {/* <MenuItem onClick={handleClose}>
                                                    <Avatar /> Profile
                                                </MenuItem> */}
                                            <MenuItem onClick={handleClose}>
                                                <ListItemIcon>
                                                    <AccountCircleIcon fontSize="small" />
                                                </ListItemIcon>
                                                <Link to="/PersonalInfo">
                                                    Thông tin cá nhân
                                                </Link>
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>
                                                <ListItemIcon>
                                                    <LockIcon fontSize="small" />
                                                </ListItemIcon>
                                                <Link to="/changepassword">
                                                    Đổi mật khẩu
                                                </Link>
                                            </MenuItem>
                                            <Divider />
                                            <MenuItem onClick={handleClose}>
                                                <ListItemIcon>
                                                    <ReceiptIcon  fontSize="small" />
                                                </ListItemIcon>
                                                <Link to="/pay">
                                                    Hóa đơn đăng ký
                                                </Link>
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>
                                                <ListItemIcon>
                                                    <LockIcon fontSize="small" />
                                                </ListItemIcon>
                                                <Link to="/invoice">
                                                    Lịch sử giao dịch
                                                </Link>
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>
                                                <ListItemIcon>
                                                    <AddCircleIcon fontSize="small" />
                                                </ListItemIcon>
                                                <Link to="/requestinvoice">
                                                    Tạo yêu cầu hoàn trả
                                                </Link>
                                            </MenuItem>
                                            {/* <MenuItem onClick={handleClose}>
                                                    <ListItemIcon>
                                                        <Settings fontSize="small" />
                                                    </ListItemIcon>
                                                    Settings
                                                </MenuItem> */}
                                            <MenuItem onClick={handleClose}>
                                                <ListItemIcon>
                                                    <Logout fontSize="small" />
                                                </ListItemIcon>
                                                <a
                                                    onClick={handleLogout}
                                                    className="logout-button"
                                                >
                                                    Đăng xuất
                                                </a>
                                            </MenuItem>
                                        </Menu>
                                    </>
                                ) : (
                                    <>
                                        <li>
                                            <Link to="/login">Đăng nhập</Link>
                                        </li>
                                        <li>
                                            <Link to="/register">Đăng ký</Link>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
