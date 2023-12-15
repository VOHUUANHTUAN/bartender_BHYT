import { Routes, Route } from "react-router-dom"
import HomePage from "./views/user/homePage";
import { ROUTERS } from "./utils/router";
import MasterLayout from "./views/user/theme/masterLayout";
import NewsPage from "./views/user/newsPage";
import ProductDetailPage from "./views/user/productPage/detail.js";
import ProductPage from "./views/user/productPage/index.js";
import Login from "./views/user/loginPage";
import HomePageStaff from "./views/user/homePageStaff";
import ChangePassword from "./views/user/ChangePasswordPage";
const renderUserRouter = () => {
    const userRouters = [
        {
            path: ROUTERS.USER.HOME,
            component: <HomePage />
        },
        {
            path: ROUTERS.USER.NEWS,
            component: <NewsPage />
        },
        {
            path: ROUTERS.USER.PRODUCT,
            component: <ProductPage />
        },
        {
            path: ROUTERS.USER.LOGIN,
            component: <Login />
        },
        {
            path: ROUTERS.USER.CHANGEPASSWORD,
            component: <ChangePassword />
        },
        {
            path: ROUTERS.USER.STAFF,
            component: <HomePageStaff />
        },
    ]
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

            </Routes>
        </MasterLayout>

    )
};

const RouterCustom = () => {
    return renderUserRouter();
};

export default RouterCustom;