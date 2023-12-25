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
import PersonalInfo from "./views/user/personalInfoPage/index.js";
import Pay from "./views/user/payPage/index.js";
import PaidDetail from "./views/user/payPage/paidDetail.js";
import UnPaidDetail from "./views/user/payPage/unpaidDetail.js";

    const { user } = useUser();
import InsurancePack from "./views/staff/insurancePackManagement/index.js";
import InsPackDetailPage from "./views/staff/insurancePackManagement/insPackMDetail.js";
import AddInsPack from "./views/staff/insurancePackManagement/addInsPack.js";


import ListYeuCauHoanTra from "./views/user/CapNhatYeuCauHoanTra/index.js";
import YeuCauHoanTraDetail from "./views/user/CapNhatYeuCauHoanTra/detailycht.js";
import PersonalInfo from "./views/user/personalInfoPage/index.js";
import Invoice from "./views/user/invoicePage";
import { useEffect } from "react";
import { dayCalendarSkeletonClasses } from "@mui/x-date-pickers";
import { useLocation } from "react-router-dom";
import { getUserInfoByToken } from "./api/connect";

// const AuthGuard = ({ component: Component, loginRequired }) => {
//     if (loginRequired && !user) {
//         // Redirect to login if login is required and the user is not authenticated
//         return <Navigate to={`/${ROUTERS.USER.LOGIN}`} />;
//     }

//     // Render the component if login is not required or the user is authenticated
//     return Component;
// };
const renderUserRouter = () => {
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
            path: ROUTERS.USER.PERSONALINFO,
            component: <PersonalInfo />,
        },
        {
            path: ROUTERS.USER.INSURANCEREGISTRATION,
            component: <InsuranceRegistration />,
        },
        {
            path: ROUTERS.USER.DONDANGKY,
            component: <ListDonDangKy />
        },
        {
            path: ROUTERS.USER.INSURANCEPACKM,
            component: <InsurancePack />
        },
        {
            path: ROUTERS.USER.ADDINSPACK,
            component: <AddInsPack />
   
        },
        {
            path: ROUTERS.USER.YEUCAUHOANTRA,
            component: <ListYeuCauHoanTra />,
        },

        {
            path: ROUTERS.USER.HOADON,
            component: <Invoice />,
        },
    ];

    return (
        <MasterLayout>
            <Routes>
                {userRouters.map((item, key) => (
                    <Route
                        key={key}
                        path={item.path} //element={item.component}
                        element={item.component}
                    />
                ))}
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
                    path="insurancePackManagement/detail/:id" element={<InsPackDetailPage />}
                />
                 <Route
                    path="pay/detailPaid/:id" element={<PaidDetail />}
                />
                  <Route
                    path="pay/detailUnpaid/:id" element={<UnPaidDetail />}
                />
            </Routes>
            
        </MasterLayout>
    );
};

const RouterCustom = () => {
    const location = useLocation();
    const { user, login, logout } = useUser();

    const getUserInfo = async (token) => {
        try {
            const response = await getUserInfoByToken(token);
            if (response) {
                logout();
                login({
                    username: response.username,
                    token: token,
                    firstLogin: response.firstLogin,
                    role: response.role,
                });
                localStorage.clear();
                localStorage.setItem("token", token);
                console.log("Login successful");
            } else {
                localStorage.clear();
                <Navigate to={`/${ROUTERS.USER.LOGIN}`} />;
                console.log("Login fail");

                logout();
            }
        } catch (error) {
            localStorage.clear();
            console.log("Login fail");
            logout();
            <Navigate to={`/${ROUTERS.USER.LOGIN}`} />;
            console.log(error.message);
        }
    };

    useEffect(() => {
        // Hành động mà bạn muốn thực hiện khi đường dẫn thay đổi
        getUserInfo(localStorage.getItem("token"));
        console.log("Đường dẫn đã thay đổi:", location.pathname);

        // Thêm các hành động cần thực hiện ở đây...
    }, [location.pathname]);

    return renderUserRouter();
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
