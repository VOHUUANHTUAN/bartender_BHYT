import { memo, useEffect, useState } from "react"
import { getGoiBHByMaGBH } from "../../../api/connect";
import "./style.scss"
import { Link, useParams } from 'react-router-dom';
import { ROUTERS } from "../../../utils/router";
const ProductDetailPage = () => {
    /*     const [goiBHs, setgoiBHs] = useState([]);
        useEffect(() => {
            fetchData();
        }, []);
        const fetchData = async () => {
            setgoiBHs(await getGoiBHAPI());
    
        } */

    const params = useParams();
    const [detail, setDetail] = useState({});
    useEffect(() => {
        fetchDataById();
    }, []);
    const fetchDataById = async () => {
        setDetail(await getGoiBHByMaGBH(params.id));

    }
    return <><div className="container__body">
        <div className="detail__page">
            <div className="detail__container">
                <div className="img-container">
                    <img src="" alt=""></img>
                </div>
                <div className="card-content">
                    <div className="detail__title">
                        <h3> {detail.tenGoiBH}</h3>
                    </div>
                    <div className="detail__body">
                        <p>{detail.motaGoiBH}</p>
                        <p>Giá: {detail.gia} VND</p>
                        <p>Tỉ lệ hoàn tiền: {detail.tiLeHoanTien}%</p>
                    </div>
                </div>
                <div className="detail__btn">
                    <Link to={`../${ROUTERS.USER.PRODUCT}`}>
                        <p>Quay lại</p>
                    </Link>
                </div>
            </div>
        </div>
    </div>
    </>
};

export default memo(ProductDetailPage);