import {memo} from "react"
import "./style.scss"
import { ROUTERS } from "../../../../utils/router";
import { Link } from "react-router-dom";

const Footer = ()=>{
    return <footer className="footer">
        <div className="container__header__footer">
            <div className="row">            

                <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                <div className="footer_widget">
                        <div className="footer_about_logo">Liên hệ</div>
                        <ul>
                        <li>227 Nguyễn Văn Cừ, Phường 4, Quận 5, Thành phố Hồ Chí Minh</li>
                        <li>Khu phố 6, Phường Linh Trung, Thành phố Thủ Đức, Thành phố Hồ Chí Minh</li>
                        <li><Link to="">0123525134</Link></li>
                        <li><Link to="">0123525326</Link></li>
                        <li><Link to="">bhtruongtho@gmail.com</Link></li>
                        </ul>
                </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                    <div className="footer_about">
                        <div className="footer_about_logo">Về chúng tôi</div>
                        <ul>
                        <li className="footer_about__">BARTENDER chuyên tư vấn, cung cấp các sản phẩm của Bảo hiểm Bảo Việt trên nền tảng trực tuyến. Liên hệ ngay để được tư vấn và hỗ trợ chuyên nghiệp nhất.</li>
                        <li></li>
                        <li></li>
                        </ul>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                <div className="footer_widget">
                        <div className="footer_about_logo">Thông tin</div>
                        <ul>
                        <li><Link to="">Giới thiệu</Link></li>
                        <li><Link to="">Tin tức và sự kiện</Link></li>
                        <li><Link to="">Liên hệ</Link></li>
                        <li><Link to="">Điều khoản và điều kiện</Link></li>
                        <li><Link to="">Chính sách bảo mật</Link></li>
                        </ul>
                </div>
                </div>
            </div>

        </div>
    </footer>
};

export default memo(Footer);