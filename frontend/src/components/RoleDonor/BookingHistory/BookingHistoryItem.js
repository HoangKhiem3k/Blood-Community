import styles from './BookingHistory.module.scss';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { fetchHospitalById } from '../../../redux/actions/hospitalManage';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const BookingHistoryItem = ({ donorBooking }) => {
    const dispatch = useDispatch();
    const hospital = useSelector((state) => state.users.hospital);

    useEffect(() => {
        dispatch(fetchHospitalById(donorBooking?.hospitalId));
    }, []);
    console.log(donorBooking);

    let time = '';
    switch (donorBooking?.timeType) {
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

    const date = new Date(Number(donorBooking?.date));
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return (
        <div>
            <div className={cx('schedule')}>
                <div className={cx('info')}>
                    <div className={cx('image')}>
                        {/* <img src={require('../../../assets/svg/giotmau.svg')} alt="giotmau" /> */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="53.506"
                            height="65.771"
                            viewBox="0 0 53.506 65.771"
                        >
                            <path
                                id="IcRoundWaterDrop"
                                d="M32.96,3.16a3.4,3.4,0,0,0-4.448,0Q4.033,24.73,4,40.681C4,57.335,16.708,68.1,30.753,68.1S57.506,57.335,57.506,40.681Q57.506,24.73,32.96,3.16ZM16.808,41.35a2.511,2.511,0,0,1,2.475,2.073,11.33,11.33,0,0,0,12.173,9.6,2.511,2.511,0,1,1,.234,5.016A16.3,16.3,0,0,1,14.333,44.26a2.508,2.508,0,0,1,2.475-2.909Z"
                                transform="translate(-4 -2.332)"
                                fill="#ed2e2e"
                            ></path>
                        </svg>
                        <span>Hiến máu</span>
                    </div>
                    <div className={cx('detail')}>
                        <h3>{hospital?.hospitalName}</h3>
                        <p>{hospital?.address}</p>
                        <p className={cx('timeType')}>
                            {time} - {`${day}/${month}/${year}`}
                        </p>
                    </div>
                </div>
                <div className={cx('booking')}>
                    <p
                        className={cx('status', {
                            done: donorBooking.status === 'S3',
                            inprogress: donorBooking.status === 'S2',
                            'confirm-email': donorBooking.status === 'S1',
                        })}
                    >
                        {donorBooking.status === 'S3'
                            ? 'Đã hiến máu'
                            : donorBooking.status === 'S2'
                            ? 'Đã hẹn lịch'
                            : 'Chưa xác nhận email'}
                    </p>
                    <NavLink to={`/donor/booking_history/${donorBooking.id}`}>Xem chi tiết</NavLink>
                </div>
            </div>
        </div>
    );
};

export default BookingHistoryItem;
