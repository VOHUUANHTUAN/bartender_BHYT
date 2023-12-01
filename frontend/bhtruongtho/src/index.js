import React from "react";
import ReactDOM from "react-dom/client";
import HomePage from "./views/user/homePage";
import { BrowserRouter } from "react-router-dom";
import RouterCustom from "./router";
import "./style/style.scss";
//import './index.css';
//import App from './App';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <RouterCustom />
    </BrowserRouter>
);
