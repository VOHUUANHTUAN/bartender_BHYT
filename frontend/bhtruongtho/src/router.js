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
import ListYeuCauHoanTra from "./views/user/CapNhatYeuCauHoanTra/index.js"
import YeuCauHoanTraDetail from "./views/user/CapNhatYeuCauHoanTra/detailycht.js"
import PersonalInfo from "./views/user/personalInfoPage/index.js";
import Invoice from "./views/user/invoicePage";

const AuthGuard = ({ component: Component, loginRequired }) => {
    const { user } = useUser();

    if (loginRequired && !user) {
        // Redirect to login if login is required and the user is not authenticated
        return <Navigate to={`/${ROUTERS.USER.LOGIN}`} />;
    }

    // Render the component if login is not required or the user is authenticated
    return Component;
};

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
            path: ROUTERS.USER.STAFF,
            component: <HomePageStaff />,
            loginRequired: true,
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
            path: ROUTERS.USER.YEUCAUHOANTRA,
            component: <ListYeuCauHoanTra />
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
                        element={
                            <AuthGuard
                                component={item.component}
                                loginRequired={item.loginRequired}
                            />
                        }
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
                    path="requestrefund/detail/:id" element={<YeuCauHoanTraDetail />}
                />
            </Routes>
        </MasterLayout>
    );
};

const RouterCustom = () => {
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
