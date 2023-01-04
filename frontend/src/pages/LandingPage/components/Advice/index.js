import styles from './Advice.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { faBan, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Advice() {
    return (
        <div id='advice' className={cx('wrapper')}>
            <div className={cx('left')}>
                <h2>Những lời khuyên trước và sau khi hiến máu</h2>
                <div className={cx('do')}>
                    <h2>
                        <p><FontAwesomeIcon icon={faCheckCircle} /></p> 
                        <p>Nên</p>
                    </h2>
                    <ul>
                        <li>- Ăn nhẹ và uống nhiều nước (300-500ml) trước khi hiến máu.</li>
                        <li>
                            - Đè chặt miếng bông gòn cầm máu nơi kim chích 10 phút, giữ băng keo cá nhân trong 4-6 giờ.
                        </li>
                        <li>- Nằm và ngồi nghỉ tại chỗ 10 phút sau khi hiến máu.</li>
                        <li>- Nằm nghỉ đầu thấp, kê chân cao nếu thấy chóng mặt, mệt, buồn nôn.</li>
                        <li>
                            - Chườm lạnh (túi chườm chuyên dụng hoặc cho đá vào khăn) chườm vết chích nếu bị sưng, bầm
                            tím.
                        </li>
                    </ul>
                </div>
            </div>
            <div className={cx('right')}>
                <div className={cx('dont')}>
                    <h2>
                        <FontAwesomeIcon icon={faBan} /> Không nên:
                    </h2>
                    <ul>
                        <li>- Uống sữa, rượu bia trước khi hiến máu.</li>
                        <li>
                            - Lái xe đi xa, khuân vác, làm việc nặng hoặc luyện tập thể thao gắng sức trong ngày lấy
                            máu.
                        </li>
                    </ul>
                </div>
                <div className={cx('noted')}>
                    <h2>
                        <FontAwesomeIcon icon={faExclamationCircle} /> Lưu ý:
                    </h2>

                    <ul>
                        - Nếu phát hiện chảy máu tại chỗ chích:
                        <li>Giơ tay cao.</li>
                        <li>Lấy tay kia ấn nhẹ vào miếng bông hoặc băng dính.</li>
                        <li>Liên hệ nhân viên y tế để được hỗ trợ khi cần thiết.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Advice;
