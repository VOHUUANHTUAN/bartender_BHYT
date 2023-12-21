// File: TaskAndImage.js
import { memo } from "react"
import "./style.scss"
import logo from "./staff_img.jpeg"
import { Link } from "react-router-dom";
const HomePageStaff = () => {
    return (
        <div className="task-and-image">
            <div className="task-bar">
                <ul>
                    <li>
                        <Link to="/registrationForms">Duyệt đơn đăng ký</Link>
                    </li>
                    <li>Đơn thanh toán</li>
                    <li>Danh sách khách hàng</li>
                    <li>Lịch sử thanh toán</li>
                    <li>Chính sách bảo hiểm</li>
                    <li>Lịch sử thanh toán</li>
                    <li>Báo cáo tài chính</li>
                    <li>Ưu đãi dành cho nhận viên</li>
                    <li>Các chương trình sắp tới của công ty</li>
                </ul>
            </div>
            <div className="image-display">
                <img src={logo} alt="Image_staff" />
                <div className="text_over_image">Hãy làm việc bằng cả trái tim bạn nhé!!!</div>
            </div>
            <div className="work_title">
                <div className="work_title_01">
                    <h1>Khách hàng là thượng đế</h1>
                    <p>Hãy làm việc để phục vụ khách hàng và công ty chúng ta sẽ ngày càng phát triển</p>
                </div>
                <div className="work_title_02">
                    <h1>Chăm chỉ làm việc</h1>
                    <p>Có một công việc và làm việc hăng say là một con người hạnh phúc, có ích với xã hội</p>
                </div>
            </div>
        </div>

    );
};

export default memo(HomePageStaff);
