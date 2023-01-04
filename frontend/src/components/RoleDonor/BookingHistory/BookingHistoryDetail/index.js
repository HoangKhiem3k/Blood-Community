import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DOMAIN_BACKEND } from '../../../../config/settingSystem';
import styles from './BookingHistoryDetail.module.scss';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHospitalById } from '../../../../redux/actions/hospitalManage';

const cx = classNames.bind(styles);


const BookingHistoryDetail = () => {
    const { id } = useParams();
    const [booking, setBooking] = useState();
    const hospital = useSelector((state) => state.users.hospital);
    const dispatch = useDispatch();
    let history = useNavigate();
    console.log(booking);
    useEffect(() => {
        axios
            .get(`${DOMAIN_BACKEND}/api/get-booking-by-id?id=${id}`)
            .then((data) => setBooking(data.data.content))
            .catch((e) => console.log(e));
    }, []);

    useEffect(() => {
        dispatch(fetchHospitalById(booking?.hospitalId));
    }, [booking]);

    let date = new Date(Number(booking?.date));
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    date = `${day}/${month}/${year}`;
    return (
        <div>
            <h2 className={cx('title')}>Lịch sử đặt hẹn chi tiết:</h2>
            <p
                className={cx('status', {
                    done: booking?.status === 'S3',
                    inprogress: booking?.status === 'S2',
                    'confirm-email': booking?.status === 'S1',
                })}
            >
                {booking?.status === 'S3'
                    ? 'Đã hiến máu'
                    : booking?.status === 'S2'
                    ? 'Đã hẹn lịch'
                    : 'Chưa xác nhận email'}
            </p>

            <div className={cx('donate-info')}>
                    <h3>Thông tin hiến máu</h3>
                    <div>
                        <span>Hình thức hiến</span>
                        <p>{`${booking?.formalityDonate}`}</p>
                    </div>
                    <div>
                        <span>Cơ sở tiếp nhận máu</span>
                        <p>{hospital?.hospitalName}</p>
                    </div>
                    <div>
                        <span>Địa chỉ</span>
                        <p>{hospital?.address}</p>
                    </div>
                    <div>
                        <span>Lượng máu đã hiến (ml)</span>
                        <p>{booking?.bloodAmount}(ml)</p>
                    </div>
                    <div>
                        <span>Ngày hiến máu</span>
                        <p>{date}</p>
                    </div>
                </div>
                <button className={cx('back-btn')} onClick={() => history('/donor/booking_history/')}>
                    Trở về
                </button>
        </div>
    );
};

export default BookingHistoryDetail;
