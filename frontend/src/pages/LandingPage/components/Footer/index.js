import styles from './Footer.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faLocationDot,
    faMailBulk,
    faMailForward,
    faMailReply,
    faPhone,
    faVoicemail,
} from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <div className={cx('aboutus')}>
                        <div className={cx('abu-header')}>
                            <img src={require('../../../../assets/images/BC_logo.png')} alt="logo" />
                            <h2>Blood Community</h2>
                        </div>
                        <div className={cx('abu-content')}></div>
                    </div>
                    <div className={cx('quickLinks')}>
                        <h2>Truy cập nhanh</h2>
                        <ul>
                            <li>
                                <Link to="home" smooth="true" duration="500">
                                    Trang chủ
                                </Link>
                            </li>
                            <li>
                                <Link to="about" smooth="true" duration="500">
                                    Về chúng tôi
                                </Link>
                            </li>
                            <li>
                                <Link to="top-donors" smooth="true" duration="500">
                                    Người hiến máu
                                </Link>
                            </li>
                            <li>
                                <Link to="events" smooth="true" duration="500">
                                    Hoạt động
                                </Link>
                            </li>
                            <li>
                                <Link to="faq" smooth="true" duration="500">
                                    Hỏi - Đáp
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className={cx('contact')}>
                        <h2>Liên hệ</h2>
                        <div>
                            <FontAwesomeIcon icon={faLocationDot} />
                            <p>Duy Tan University - 254 Nguyễn Văn Linh, Hải Châu, Đà Nẵng</p>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faPhone} />
                            <p>0123456789</p>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faMailBulk} />
                            <p>bloodcommunity@gmail.com</p>
                        </div>
                    </div>
                </div>
                <div className={cx('links')}>
                    <div className={cx('socials')}>
                        <div>
                            <FontAwesomeIcon icon={faFacebook} />
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faLinkedin} />
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faTwitter} />
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faInstagram} />
                        </div>
                    </div>
                    <ul className={cx('pages')}>
                        <li>
                            <Link to="home" smooth="true" duration="500">
                                Trang chủ
                            </Link>
                        </li>
                        <li>
                            <Link to="about" smooth="true" duration="500">
                                Về chúng tôi
                            </Link>
                        </li>
                        <li>
                            <Link to="faq" smooth="true" duration="500">
                                Người hiến máu
                            </Link>
                        </li>
                        <li>
                            <Link to="faq" smooth="true" duration="500">
                                Hỏi - Đáp
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={cx('copyright')}>
                    Bản quyền © 2022 All Rights Reserved by <span>C1SE.14 Team</span>.{' '}
                    {/* <p>BloodComunity - Mỗi giọt máu cho đi, một cuộc đời ở lại</p> */}
                </div>
            </div>
        </div>
    );
}

export default Footer;
