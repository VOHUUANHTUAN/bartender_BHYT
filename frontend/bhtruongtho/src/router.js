import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./views/user/homePage";
import { ROUTERS } from "./utils/router";
import MasterLayout from "./views/user/theme/masterLayout";
import NewsPage from "./views/user/newsPage";
import ProductDetailPage from "./views/user/productPage/detail.js";
import ProductPage from "./views/user/productPage/index.js";
import Login from "./views/user/loginPage";
import Register from "./views/user/registerPage/index.js";
import RequestInvoicePage from "./views/user/requestInvoicePage";
import HomePageStaff from "./views/user/homePageStaff";
import ChangePassword from "./views/user/ChangePasswordPage";
import { useUser } from "../src/context/UserContext.js";
import InsuranceRegistration from "./views/user/InsuranceRegistration";
import ListDonDangKy from "./views/user/registrationForm/index.js";
import DonDangKyDetail from "./views/user/registrationForm/regisdetail.js";
import Profile from "./views/user/profilePage/index.js";
import Pay from "./views/user/payPage/index.js";
import PaidDetail from "./views/user/payPage/paidDetail.js";
import UnPaidDetail from "./views/user/payPage/unpaidDetail.js";
import InfoCustomer from "./views/user/infoCustomer";
import FinancialReport from "./views/user/financialReport";
import InsurancePack from "./views/staff/insurancePackManagement/index.js";
import InsPackDetailPage from "./views/staff/insurancePackManagement/insPackMDetail.js";
import AddInsPack from "./views/staff/insurancePackManagement/addInsPack.js";

import ListYeuCauHoanTra from "./views/user/CapNhatYeuCauHoanTra/index.js";
import YeuCauHoanTraDetail from "./views/user/CapNhatYeuCauHoanTra/detailycht.js";
import Transactions from "./views/user/transactionsPage";
import { useEffect } from "react";
import { dayCalendarSkeletonClasses } from "@mui/x-date-pickers";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserInfoByToken } from "./api/connect";
import { useSnackbar } from "./context/SnackbarContext";

const AuthGuard = ({ component: Component, loginRequired }) => {
    const { user, login, logout } = useUser();

    //Nếu loginRequired=true và Không_Có_Koken
    if (loginRequired && !localStorage.getItem("token")) {
        return <Navigate to={`/${ROUTERS.USER.LOGIN}`} />;
    }
    return Component;
};

const RouterCustom = () => {
    const location = useLocation();
    const { user } = useUser();
    const navigate = useNavigate();

    //Mỗi khi có đường dẫn thay đổi thì kiểm tra
    useEffect(() => {
        // Hành động mà bạn muốn thực hiện khi đường dẫn thay đổi
        console.log("Đường dẫn đã thay đổi:", location.pathname);
        if (user && user.firstLogin) {
            navigate("/Profile");
        }
        // kiemTraCacThongTinDangNhap(localStorage.getItem("token"));
    }, [location.pathname]);
    const userRouters = [
        {
            path: ROUTERS.USER.HOME,
            component: <HomePage />,
            loginRequired: false,
        },
        {
            path: ROUTERS.USER.NEWS,
            component: <NewsPage />,
            loginRequired: false,
        },
        {
            path: ROUTERS.USER.PRODUCT,
            component: <ProductPage />,
            //loginRequired: false,
            loginRequired: false,
        },
        {
            path: ROUTERS.USER.LOGIN,
            component: <Login />,
        },
        {
            path: ROUTERS.USER.REGISTER,
            component: <Register />,
            showHeader: false, // Không hiển thị header ở trang đăng ký
            showFooter: false, // Không hiển thị footer ở trang đăng ký
            loginRequired: false,
        },
        {
            path: ROUTERS.USER.CHANGEPASSWORD,

            component: <ChangePassword />,
            loginRequired: true,
        },
        {
            path: ROUTERS.USER.PAY,

            component: <Pay />,
            loginRequired: true,
        },
        {
            path: ROUTERS.USER.STAFF,
            component: <HomePageStaff />,
            loginRequired: false,
        },
        {
            path: ROUTERS.USER.REQUESTINVOICE,
            component: <RequestInvoicePage />,
            loginRequired: true,
        },
        {
            path: ROUTERS.USER.PROFILE,
            component: <Profile />,
            loginRequired: true,
        },
        {
            path: `${ROUTERS.USER.INSURANCEREGISTRATION}/:id`,
            component: <InsuranceRegistration />,
            loginRequired: true,
        },
        {
            path: ROUTERS.USER.DONDANGKY,
            component: <ListDonDangKy />,
        },
        {
            path: ROUTERS.USER.INSURANCEPACKM,
            component: <InsurancePack />,
        },
        {
            path: ROUTERS.USER.ADDINSPACK,
            component: <AddInsPack />,
        },
        {
            path: ROUTERS.USER.YEUCAUHOANTRA,
            component: <ListYeuCauHoanTra />,
        },

        {
            path: ROUTERS.USER.TRANSACTION,
            component: <Transactions />,
            loginRequired: true,
        },
        {
            path: ROUTERS.USER.INFOCUSTOMER,
            component: <InfoCustomer />,
            loginRequired: true,
        },
        {
            path: ROUTERS.USER.FINANCIALREPORT,
            component: <FinancialReport />,
            loginRequired: true,
        },
    ];

    return (
        <MasterLayout>
            <Routes>
                {userRouters.map((item, key) => (
                    <Route
                        key={key}
                        path={item.path}
                        // element={item.component}
                        // element={<AuthGuard item.component item.loginRequired  />}
                        element={
                            <AuthGuard
                                component={item.component}
                                loginRequired={item.loginRequired}
                            />
                        }
                    />
                ))}{" "}
                <Route
                    path="product/detail/:id"
                    element={<ProductDetailPage />}
                />
                <Route
                    path="registrationForms/detail/:id"
                    element={<DonDangKyDetail />}
                />
                <Route
                    path="InsuranceRegistration/:id"
                    element={<InsuranceRegistration />}
                />
                {/* <Route path="product/detail/:id" element={<AuthGuard component={<ProductDetailPage />} loginRequired={true} />} /> */}
                <Route
                    path="registrationForms/detail/:id"
                    element={<DonDangKyDetail />}
                />
                <Route
                    path="requestrefund/detail/:id"
                    element={<YeuCauHoanTraDetail />}
                />
                <Route
                    path="insurancePackManagement/detail/:id"
                    element={<InsPackDetailPage />}
                />
                <Route path="pay/detailPaid/:id" element={<PaidDetail />} />
                <Route path="pay/detailUnpaid/:id" element={<UnPaidDetail />} />
            </Routes>
        </MasterLayout>
    );
};

export default RouterCustom;

// const AuthGuard = ({ component, loginRequired }) => {
//     // Kiểm tra xem user có tồn tại hay không
//     const isAuthenticated = user !== null;

//     // Nếu yêu cầu đăng nhập và user không tồn tại, chuyển hướng đến trang đăng nhập
//     if (loginRequired && !isAuthenticated) {
//       return <Navigate to={ROUTERS.USER.LOGIN} />;
//     }

//     // Nếu user tồn tại hoặc không yêu cầu đăng nhập, hiển thị component được chuyển vào
//     return component;
//   };
