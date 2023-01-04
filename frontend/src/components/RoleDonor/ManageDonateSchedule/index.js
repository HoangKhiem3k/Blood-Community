import styles from './ManageDonateSchedule.module.scss';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchNewestDonorBooking } from '../../../redux/actions/hospitalServices';
import { fetchHospitalById } from '../../../redux/actions/hospitalManage';
import QRCode from 'react-qr-code';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import ModalDeleteBooking from './ModalDeleleBooking';
import { formatDate } from '../../../utils/formatDate';

const cx = classNames.bind(styles);

function ManageDonateSchedule() {
    const [isShowModalDeleteBooking, setShowModalDeleteBooking] = useState(false);
    const [donorBooking, setDonorBooking] = useState();
    let newestDonorBooking = useSelector((state) => state.hospital.newestDonorBooking);
    const user = useSelector((state) => state.auth.login.currentUser);
    const hospital = useSelector((state) => state.users.hospital);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchNewestDonorBooking(user));
    }, []);
    useEffect(() => {
        dispatch(fetchNewestDonorBooking(user));
    }, [isShowModalDeleteBooking]);
    useEffect(() => {
        dispatch(fetchHospitalById(newestDonorBooking?.hospitalId));
    }, [newestDonorBooking]);
    const timestampToday = new Date(formatDate()).getTime();
    const timestampNewestDonorBooking = Number(newestDonorBooking?.date);
    if (timestampNewestDonorBooking < timestampToday || newestDonorBooking?.status === 'S1') {
        newestDonorBooking = null;
    }

    let time = '';
    switch (newestDonorBooking?.timeType) {
        case 'T1':
            time = 'Từ 8h00 đến 9h00';
            break;
        case 'T2':
            time = 'Từ 9h00 đến 10h00';
            break;
        case 'T3':
            time = 'Từ 10h00 đến 11h00';
            break;
        case 'T4':
            time = 'Từ 11h00 đến 12h00';
            break;
        case 'T5':
            time = 'Từ 13h00 đến 14h00';
            break;
        case 'T6':
            time = 'Từ 14h00 đến 15h00';
            break;
        case 'T7':
            time = 'Từ 15h00 đến 16h00';
            break;
        case 'T8':
            time = 'Từ 16h00 đến 17h00';
            break;
        default:
            break;
    }

    const date = new Date(Number(newestDonorBooking?.date));
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const value = `${user?.firstName} ${user?.lastName} | ${user?.phoneNumber} | ${user?.email} | ${hospital?.hospitalName} | ${time} | ${day}/${month}/${year}`;

    let address =
        (user.address === null ? '' : user.address) + ', ' + user.ward + ', ' + user.district + ', ' + user.city;

    const downloadQRCode = () => {
        const svg = document.getElementById('QRCode');
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const pngFile = canvas.toDataURL('image/png');
            const downloadLink = document.createElement('a');
            // name of image
            downloadLink.download = 'BloodCommunity-QRCode';
            downloadLink.href = `${pngFile}`;
            downloadLink.click();
        };
        img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    };
    const handleClose = () => {
        setShowModalDeleteBooking(false);
    };
    const handleDeleteBooking = () => {
        setDonorBooking(newestDonorBooking);
        setShowModalDeleteBooking(true);
    };
    return (
        <div className={cx('wrapper')}>
            <ModalDeleteBooking show={isShowModalDeleteBooking} handleClose={handleClose} donorBooking={donorBooking} />
            <h2>Thông tin đăng ký hiến máu</h2>
            <div
                className={cx('booking-info', {
                    'qr-d-none': newestDonorBooking === null,
                })}
            >
                <div className={cx('booking-qr')}>
                    <div>
                        <QRCode
                            value={value}
                            id="QRCode"
                            size={170}
                            style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                            viewBox={`0 0 170 170`}
                        />
                    </div>
                    <div>
                        <p>
                            Tên: <span>{`${user?.firstName} ${user?.lastName}`}</span>
                        </p>
                        <p>
                            Thời gian:{' '}
                            <span>
                                {time} - {`${day}/${month}/${year}`}
                            </span>
                        </p>
                        <p>
                            Địa điểm hiến: <span>{hospital?.hospitalName}</span>
                        </p>
                    </div>
                    <button onClick={downloadQRCode}>Tải mã QR</button>
                    <p>Vui lòng mang giấy tờ tùy thân và mã QR khi đến địa điểm hiến máu</p>
                </div>
                <div className={cx('booking-note')}>
                    <h3>Phiếu đăng ký hiến máu</h3>
                    <div>
                        <img src={require('../../../assets/svg/dangky.svg').default} alt="dang ky" />
                    </div>
                    {newestDonorBooking === null ? (
                        <p>Chưa có phiếu đăng ký hiến máu</p>
                    ) : (
                        <>
                            <div className={cx('note-info')}>
                                <p>Bạn đã đăng ký hiến máu tại</p>
                                <p>{hospital?.hospitalName}</p>
                                <p>({hospital?.address})</p>
                                <p>
                                    {time} - {`${day}/${month}/${year}`}
                                </p>
                            </div>
                            <div className={cx('note')}>
                                <div>
                                    <FontAwesomeIcon icon={faCircleExclamation} />
                                </div>
                                <div>
                                    <span>Lưu ý:</span> Hãy đến đúng khung giờ hoặc sớm hơn tối đa 10 phút để đảm bảo
                                    giãn cách phòng chống dịch covid 19. Và nhớ khai báo di chuyển nội địa để thông qua
                                    các chốt kiểm soát.
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className={cx('donor-info')}>
                <div className={cx('personal-info')}>
                    <h3>Thông tin cá nhân</h3>
                    <div>
                        <span>Họ và tên</span>
                        <p>{`${user?.firstName} ${user?.lastName}`}</p>
                    </div>
                    <div>
                        <span>Giới tính</span>
                        <p>{user.gender}</p>
                    </div>
                    <div>
                        <span>Ngày sinh</span>
                        <p>{user.birthday}</p>
                    </div>
                    <div>
                        <span>Nhóm máu</span>
                        <p>{user.groupBood}</p>
                    </div>
                </div>
                <div className={cx('contact-info')}>
                    <h3>Thông tin liên hệ</h3>
                    <div>
                        <span>Email</span>
                        <p>{user.email}</p>
                    </div>
                    <div>
                        <span>Số điện thoại</span>
                        <p>{user.phoneNumber}</p>
                    </div>
                    <div>
                        <span>Địa chỉ liên hệ</span>
                        <p>{address}</p>
                    </div>
                </div>
            </div>
            <div className={cx('action-btn')}>
                {newestDonorBooking ? (
                    <NavLink onClick={handleDeleteBooking}>Xoá đơn đăng ký</NavLink>
                ) : (
                    <NavLink to={'/donor/donate'}>Đăng ký hiến máu</NavLink>
                )}
            </div>
        </div>
    );
}

export default ManageDonateSchedule;
