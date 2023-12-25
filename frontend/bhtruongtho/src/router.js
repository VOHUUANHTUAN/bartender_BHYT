import { Routes, Route } from "react-router-dom"
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
import ListDonDangKy from "./views/user/registrationForm/index.js";
import DonDangKyDetail from "./views/user/registrationForm/regisdetail.js";
import ListYeuCauHoanTra from "./views/user/CapNhatYeuCauHoanTra/index.js"
import YeuCauHoanTraDetail from "./views/user/CapNhatYeuCauHoanTra/detailycht.js"

const renderUserRouter = () => {
    const userRouters = [
        {
            path: ROUTERS.USER.HOME,
            component: <HomePage />,
        },
        {
            path: ROUTERS.USER.NEWS,
            component: <NewsPage />,
        },
        {
            path: ROUTERS.USER.PRODUCT,
            component: <ProductPage />,
        },
        {
            path: ROUTERS.USER.LOGIN,
            component: <Login />,
            showHeader: false, // Không hiển thị header ở trang đăng nhập
            showFooter: false, // Không hiển thị footer ở trang đăng nhập
        },
        {
            path: ROUTERS.USER.REGISTER,
            component: <Register />,
            showHeader: false, // Không hiển thị header ở trang đăng ký
            showFooter: false, // Không hiển thị footer ở trang đăng ký
        },
        {
            path: ROUTERS.USER.CHANGEPASSWORD,

            component: <ChangePassword />
        },
        {
            path: ROUTERS.USER.STAFF,
            component: <HomePageStaff />,
        },
        {
            path: ROUTERS.USER.REQUESTINVOICE,
            component: <RequestInvoicePage />
        },
        {
            path: ROUTERS.USER.DONDANGKY,
            component: <ListDonDangKy />
        },
        {
            path: ROUTERS.USER.YEUCAUHOANTRA,
            component: <ListYeuCauHoanTra />
        },

    ];
    return (
        <MasterLayout>
            <Routes>
                {userRouters.map((item, key) => (
                    <Route

                        key={key} path={item.path} element={item.component}
                    />
                ))}
                <Route
                    path="product/detail/:id" element={<ProductDetailPage />}
                />
                <Route
                    path="registrationForms/detail/:id" element={<DonDangKyDetail />}
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
