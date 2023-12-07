import {Routes, Route} from "react-router-dom"
import HomePage from "./views/user/homePage";
import { ROUTERS } from "./utils/router";
import MasterLayout from "./views/user/theme/masterLayout";
import NewsPage from "./views/user/newsPage";
import ProductPage from "./views/user/productPage";
import Login from "./views/user/loginPage";
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
    ]
    return (
        <MasterLayout>
            <Routes>
                {userRouters.map((item, key) => (
                        <Route
                            key = {key} path = {item.path} element = {item.component}
                        />
                    ))}
            </Routes>
        </MasterLayout>

    )
};

const RouterCustom =()=>{
    return renderUserRouter();
};

export default RouterCustom;