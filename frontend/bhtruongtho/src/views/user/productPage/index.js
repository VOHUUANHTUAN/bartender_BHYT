import { memo, useEffect, useState } from "react"
import { getGoiBHAPI } from "../../../api/connect";
import "./style.scss"
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [goiBHs, setgoiBHs] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        setgoiBHs(await getGoiBHAPI());

    }
    return <>
        <div className="container__body">
            <div className="productPage">

                <ul>
                    <div className="cards-container">
                    
                        {goiBHs?.map((goiBH, goiBHKey) => (
                            <li key={goiBHKey} className={`card-container ${goiBHKey === 0 ? "active" : ""}`}>

                                    <div className="img-container">
                                        <img src="" alt=""></img>
                                    </div>
                                    <div className="card-content">
                                        <div className="card-title">
                                            <h3> {goiBH.tenGoiBH}</h3>
                                        </div>
                                        <div className="card-body">
                                            <p>{goiBH.motaGoiBH}</p>
                                            <p>Giá: {goiBH.gia} VND</p>
                                            <p>Tỉ lệ hoàn tiền: {goiBH.tiLeHoanTien}%</p>
                                        </div>

                                    </div>
                                    <div className="card-btn">
                                        <Link to="">
                                            <p>Xem thêm</p>
                                        </Link>
                                    </div>

                            </li>
                               
                        )
                        )}
                         </div>
                   
                    </ul>
            </div>
        </div>
    </>
};

export default memo(HomePage);