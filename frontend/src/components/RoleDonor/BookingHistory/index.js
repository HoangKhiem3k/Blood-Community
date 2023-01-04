import styles from './BookingHistory.module.scss';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { fetchAllBookingByDonorId } from '../../../redux/actions/hospitalServices';
import { useDispatch, useSelector } from 'react-redux';
import BookingHistoryItem from './BookingHistoryItem';

const cx = classNames.bind(styles);

const BookingHistory = () => {
    const dispatch = useDispatch();
    const listBookings = useSelector((state) => state.hospital.listBookingsByDonorId);
    const donor = useSelector((state) => state.auth.login.currentUser);

    useEffect(() => {
        dispatch(fetchAllBookingByDonorId(donor.id));
    }, []);

    // useEffect(() => {
    //     dispatch(fetchHospitalById(newestDonorBooking?.hospitalId));
    // }, [listBookings]);

    return (
        <div className={cx('wrapper')}>
            <h2>Lịch sử đặt hẹn</h2>
            {listBookings.length === 0 && <center><b>Bạn chưa có lịch hẹn nào!</b></center>}
            {listBookings &&
                listBookings.reverse().map((item, index) => {
                        return <BookingHistoryItem donorBooking={item} />;
                })}
        </div>
    );
};

export default BookingHistory;
