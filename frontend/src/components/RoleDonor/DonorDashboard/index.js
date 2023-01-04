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
import { getTotalDonation } from '../../../redux/actions/statisticAction';
const cx = classNames.bind(styles);

function Dashboard() {
    const dispatch = useDispatch();
    const listEvents = useSelector((state) => state.hospital.listEvents);
    const totalDonation = useSelector((state) => state.statistic.totalDonation);
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    useEffect(() => {
        dispatch(fetchAllEvents());
        dispatch(getTotalDonation());
    }, []);
    console.log(totalDonation);
    console.log(currentUser);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('item', 'item1')}>
                <div>
                    <div>
                        <FunctionsIcon />
                    </div>
                </div>
                <div>
                    <p>Số lần hiến máu</p>
                    <h3>{currentUser?.numberOfDonation}</h3>
                </div>
            </div>
            <div className={cx('item', 'item2')}>
                <div>
                    <div>
                        <CalendarMonthIcon />
                    </div>
                    <div>
                        <p>Lịch hiến máu đã đặt</p>
                        <h3>34</h3>
                        <span> days</span>
                    </div>
                </div>
                <div>
                    <div>
                        Tháng 10, 2022
                        <p>Thứ năm</p>
                    </div>
                    <div>20</div>
                </div>
            </div>
            <div className={cx('item', 'item3')}>
                <img src={require('../../../assets/images/dashboard-item3.png')} alt="hinhanh" />
                <p>Bạn có thể cứu người bằng việc hiến máu nhân đạo.</p>
            </div>
            <div className={cx('item', 'item4')}>
                <div>
                    <VolunteerActivismIcon />
                    <p>Hiến máu</p>
                </div>
                <div>Bạn sẽ cứu được ba người bằng việc hiến máu. </div>
                {/* Nhấn nút để đặt lịch hiến máu. */}
                <span>
                    <ArrowRightAltIcon />
                </span>
            </div>
            <div className={cx('item', 'item5')}>
                <div>
                    <VolunteerActivismIcon />
                    <p>Hiến máu</p>
                </div>
                <div>Bạn sẽ cứu được ba người bằng việc hiến máu.</div>
                <span>
                    <ArrowRightAltIcon />
                </span>
            </div>
            <div className={cx('item', 'item6')}>
                <div>
                    <GroupAddIcon />
                    <p>Mời bạn bè</p>
                </div>
                <div>Bạn sẽ cứu được ba người bằng việc hiến máu.</div>
                <span>
                    <ArrowRightAltIcon />
                </span>
            </div>
            <div className={cx('item', 'item7')}>
                <h3>Chu kỳ hiến máu hằng năm</h3>
                <div>
                    <img src={require('../../../assets/images/chukyhienmau.png')} alt="" />
                </div>
            </div>
            <div className={cx('item', 'item8')}>
                <div>
                    <h3>Các sự kiện hiến máu</h3>
                    <span>View more</span>
                </div>

                {listEvents.map((event) => {
                    return (
                        <div>
                            <div>
                                {/* <img src={require('../../../assets/images/aboutus.jpeg')} alt="" /> */}
                                <img src="https://static.giotmauvang.org.vn/ihpstatic/BTH/2.png" alt="hospitalImage" />
                            </div>
                            <div>
                                <h4>{event.nameEvent}</h4>
                                <p>{event.location}</p>
                            </div>
                            <span>{event.date}</span>
                        </div>
                    );
                })}
            </div>
            <div className={cx('item', 'item9')}>
                <h3>Bảng tin sức khoẻ</h3>
                <p>Uống nhiều nước sau khi hiến máu sẽ làm cho các tế bào máu của bạn phục hồi nhanh chóng</p>
            </div>
        </div>
    );
}

export default Dashboard;
