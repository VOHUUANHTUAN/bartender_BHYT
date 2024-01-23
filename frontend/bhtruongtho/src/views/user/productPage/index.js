import { memo, useEffect, useState } from "react";
import { getGoiBHAPI } from "../../../api/connect";
import "./style.scss";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
const ProductPage = () => {
    const [goiBHs, setgoiBHs] = useState([]);
    const fetchData = async () => {
        setgoiBHs(await getGoiBHAPI());
    };
    useEffect(() => {
        fetchData();
    }, []);

    const formatCurrency = (amount) => {
        const formattedAmount = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount);

        return formattedAmount;
    };
    const [currentPage, setCurrentPage] = useState(1);
    const goiBHsPerPage = 6; // Số gói Bảo hiểm trên mỗi trang
    // Tính toán vị trí bắt đầu và kết thúc của danh sách gói Bảo hiểm trên trang hiện tại
    const startIndex = (currentPage - 1) * goiBHsPerPage;
    const endIndex = startIndex + goiBHsPerPage;
    const displayedGoiBHs = goiBHs.slice(startIndex, endIndex);
    // Tính toán số trang dựa trên số lượng gói Bảo hiểm
    const totalPages = Math.ceil(goiBHs.length / goiBHsPerPage);
    // Xử lý sự kiện thay đổi trang
    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <>
            <div className="container__body">
                <div className="productPage">
                    <ul>
                        <div className="cards__container">
                            {displayedGoiBHs.map((goiBH, goiBHKey) => (
                                <li
                                    key={startIndex + goiBHKey}
                                    className={`card__container ${goiBHKey === 0 ? "active" : ""
                                        }`}
                                >
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
                                            <p>
                                                Tỉ lệ hoàn tiền:{" "}
                                                {goiBH.tiLeHoanTien}%
                                            </p>
                                        </div>
                                    </div>

                                    <div className="card__body">
                                        <p>{goiBH.motaGoiBH}</p>
                                        <p>Giá: {formatCurrency(goiBH.gia)}</p>
                                        <p>Tỉ lệ hoàn tiền: {goiBH.tiLeHoanTien}%</p>
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
                    <Stack
                        spacing={2}
                        justifyContent="center"
                        alignItems="center"
                        style={{ margin: "20px" }}
                    >
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                            variant="outlined"
                            color="success"
                        />
                    </Stack>
                </div>
            </div>
        </>
    );
};

export default memo(ProductPage);
