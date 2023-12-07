import { memo, useEffect, useState } from "react";
import { getBookAPI } from "../../../api/connect";
import "./style.scss";
import { Link } from "react-router-dom";

const HomePage = () => {
    const [books, setBooks] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        setBooks(await getBookAPI());
    };
    return (
        <>
            {" "}
            <div className="container__body">Day la Home Page</div>
        </>
    );
};

export default memo(HomePage);
