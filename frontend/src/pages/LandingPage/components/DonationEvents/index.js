import styles from './DonationEvents.module.scss';
import classNames from 'classnames/bind';
import { events } from '../../../../services/data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllEvents } from '../../../../redux/actions/hospitalServices';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { DOMAIN_FRONTEND } from '../../../../config/settingSystem';

const cx = classNames.bind(styles);

function DonationEvents({ text }) {
    const dispatch = useDispatch();
    const listEvents = useSelector((state) => state.hospital.listEvents);
    useEffect(() => {
        dispatch(fetchAllEvents());
    }, []);
    return (
        <div
            id="events"
            className={cx('wrapper', {
                'wrapper-donor': text === 'donor',
            })}
        >
            <div className={cx('container')}>
                <h2>Các hoạt động hiến máu nhân đạo</h2>
                <div className={cx('events')}>
                    {listEvents &&
                        listEvents.map((event, index) => {
                            return (
                                <motion.div
                                    key={index}
                                    className={cx('item')}
                                    whileHover={{
                                        translateY: '-6px',
                                        transition: { duration: 0.1 },
                                    }}
                                >
                                    <div className={cx('image')}>
                                        <img
                                            src="https://static.giotmauvang.org.vn/ihpstatic/BTH/2.png"
                                            alt="hospitalImage"
                                        />
                                    </div>
                                    <div className={cx('content')}>
                                        <h2>{event.nameEvent}</h2>
                                        <p>{event.description}</p>
                                        <div className={cx('location')}>
                                            <FontAwesomeIcon icon={faLocationDot} />
                                            <span>{event.location}</span>
                                        </div>
                                        <div>
                                            <div id="fb-root"></div>
                                            <div
                                                className="fb-like"
                                                data-href={`${DOMAIN_FRONTEND}/event/${event.id}`}
                                                data-width=""
                                                data-layout="button_count"
                                                data-action="like"
                                                data-size="small"
                                                data-share="true"
                                            ></div>
                                            {/* <div className="fb-like" data-href="https://www.youtube.com/results?search_query=tich+hop+like+and+share+fb" data-width="" data-layout="button_count" data-action="like" data-size="small" data-share="true"></div> */}
                                        </div>
                                    </div>
                                    <div className={cx('date')}>{event.date}</div>
                                </motion.div>
                            );
                        })}
                </div>
                <div>
                    <Helmet>
                        <script
                            async
                            defer
                            crossorigin="anonymous"
                            src="https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v15.0&appId=676496990632073&autoLogAppEvents=1"
                            nonce="VSddtRUx"
                        ></script>
                    </Helmet>
                </div>
            </div>
        </div>
    );
}

export default DonationEvents;
