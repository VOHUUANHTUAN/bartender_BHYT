import { memo, useEffect, useState } from "react"
import { getGoiBHAPI } from "../../../api/connect";
import "./style.scss"
import { Link } from 'react-router-dom';

const ProductPage = () => {
    const [goiBHs, setgoiBHs] = useState([]);
    const fetchData = async () => {
        setgoiBHs(await getGoiBHAPI());
    }
    useEffect(() => {
        fetchData();
    }, []);

    return <>
        <div className="container__body">
            <div className="productPage">
                <ul>
                    <div className="cards__container">
                        {goiBHs?.map((goiBH, goiBHKey) => (
                            <li key={goiBHKey} className={`card__container ${goiBHKey === 0 ? "active" : ""}`}>
                                <div className="img-container">
                                    <img src="" alt=""></img>
                                </div>
                                <div className="card__content">
                                    <div className="card__title">
                                        <h3> {goiBH.tenGoiBH}</h3>
                                    </div>
                                    <div className="card__body">
                                        <p>{goiBH.motaGoiBH}</p>
                                        <p>Giá: {goiBH.gia} VND</p>
                                        <p>Tỉ lệ hoàn tiền: {goiBH.tiLeHoanTien}%</p>
                                    </div>
                                </div>
                                <div className="card__btn">
                                    <Link to={`detail/${goiBH.maGoiBH}`}>
                                        <p>Xem thêm</p>
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </div>
                </ul>
            </div>
        </div>
    </>
};

export default memo(ProductPage);