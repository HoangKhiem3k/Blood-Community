import styles from './Dashboard.module.scss';
import classNames from 'classnames/bind';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import FunctionsIcon from '@mui/icons-material/Functions';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchAllEvents } from '../../../redux/actions/hospitalServices';
import { getTotalDonation, getTotalDonor, getTotalRecipient } from '../../../redux/actions/statisticAction';
const cx = classNames.bind(styles);

function Dashboard() {
    const dispatch = useDispatch();
    const totalDonation = useSelector((state) => state.statistic.totalDonation);
    const totalDonors = useSelector((state) => state.statistic.totalDonors);
    const totalRecipients = useSelector((state) => state.statistic.totalRecipients);

    useEffect(() => {
        dispatch(getTotalDonation());
        dispatch(getTotalDonor());
        dispatch(getTotalRecipient());
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('item', 'item1')}>
                <div>
                    <div>
                        <FunctionsIcon />
                    </div>
                </div>
                <div>
                    <p>Tổng số lượt hiến máu</p>
                    <h3>{totalDonation}</h3>
                </div>
            </div>
            <div className={cx('item', 'item1')}>
                <div>
                    <div>
                        <FunctionsIcon />
                    </div>
                </div>
                <div>
                    <p>Tổng số người hiến máu</p>
                    <h3>{totalDonors}</h3>
                </div>
            </div>
            <div className={cx('item', 'item1')}>
                <div>
                    <div>
                        <FunctionsIcon />
                    </div>
                </div>
                <div>
                    <p>Tổng số người nhận máu</p>
                    <h3>{totalRecipients}</h3>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
