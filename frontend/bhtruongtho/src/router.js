import { Routes, Route } from "react-router-dom";
import HomePage from "./views/user/homePage";
import { ROUTERS } from "./utils/router";
import MasterLayout from "./views/user/theme/masterLayout";
import NewsPage from "./views/user/newsPage";
import ProductDetailPage from "./views/user/productPage/detail.js";
import ProductPage from "./views/user/productPage/index.js";
import Login from "./views/user/loginPage";
import Register from "./views/user/registerPage/index.js";

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
    ];

    return (
        <Routes>
            {userRouters.map((item, key) => (
                <Route
                    key={key}
                    path={item.path}
                    element={
                        <MasterLayout
                            showHeader={item.showHeader}
                            showFooter={item.showFooter}
                        >
                            {item.component}
                        </MasterLayout>
                    }
                />
            ))}
            <Route
                path="product/detail/:id"
                element={
                    <MasterLayout>
                        <ProductDetailPage />
                    </MasterLayout>
                }
            />
        </Routes>
    );
};

const RouterCustom = () => {
    return renderUserRouter();
};

export default RouterCustom;
