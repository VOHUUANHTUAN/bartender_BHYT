import { memo, useState, useEffect } from "react";
import "./style.scss";
import { ROUTERS } from "../../../../utils/router";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../../../context/UserContext";

const Header = () => {
    const navigate = useNavigate();
    
    // Gọi hàm để lấy thông tin người dùng
    const { user, login, logout } = useUser();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    useEffect(() => {
        // Kiểm tra xem có thông tin người dùng trong local storage không
        
        
        var temp = localStorage.getItem("username");
        if (temp)
            login({
                username: localStorage.getItem("username"),
                token: localStorage.getItem("token"),
            });
    }, []);

    const [menus, setMenus] = useState([
        {
            name: "Trang chủ",
            path: ROUTERS.USER.HOME,
        },
        {
            name: "Sản phẩm",
            path: ROUTERS.USER.PRODUCT,
            isShowSubMenu: false,
            child: [
                {
                    name: "Bảo hiểm sức khỏe",
                    path: ROUTERS.USER.HOME,
                },
                {
                    name: "Bảo hiểm nhân thọ",
                    path: ROUTERS.USER.HOME,
                },
            ],
        },
        {
            name: "Tin tức",
            path: ROUTERS.USER.NEWS,
        },
    ]);

    return (
        <>
            <div className="section">
                <div className="header_top">
                    <div className="container__header__footer">
                        <div className="row">
                            <div className="col-6 header_top_left">
                                <ul>
                                    <li>📧 bhtruongtho@gmail.com</li>
                                    <li>
                                        Sức khỏe của bạn là niềm vui của chúng
                                        tôi
                                    </li>
                                </ul>
                            </div>
                            <div className="col-6 header_top_right">
                                <ul>
                                    {user ? (
                                        <>
                                            <li>Xin chào, {user.username}!</li>
                                            <li>
                                                <a
                                                    onClick={handleLogout}
                                                    className="logout-button"
                                                >
                                                    Đăng xuất
                                                </a>
                                            </li>
                                            <li>
                                                <Link to="/changepassword">
                                                    changepassword
                                                </Link>
                                            </li>
                                        </>
                                    ) : (
                                        <>
                                            <li>
                                                <Link to="/login">
                                                    Đăng nhập
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/register">
                                                    Đăng ký
                                                </Link>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="nav_header">
                    <div className="container__header__footer">
                        <div className="row">
                            <div className="col-xl-3 col-lg-3 header_logo">
                                <div>BARTENDER_HCMUS</div>
                            </div>
                            <div className="col-xl-6 col-lg-3">
                                <nav className="header_menu">
                                    <ul>
                                        {menus?.map((menu, menuKey) => (
                                            <li
                                                key={menuKey}
                                                className={
                                                    menuKey === 0
                                                        ? "active"
                                                        : ""
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
                            <div className="col-xl-3 col-lg-3 header_reg">
                                <span>Đăng ký tư vấn</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
