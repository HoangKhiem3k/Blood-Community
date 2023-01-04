import styles from './TopDonors.module.scss';
import classNames from 'classnames/bind';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getTopDonors } from '../../../../redux/actions/statisticAction';
import { Buffer } from 'buffer';
Buffer.from('anything', 'base64');

const cx = classNames.bind(styles);

function TopDonors() {
    const dispatch = useDispatch();
    const topDonors = useSelector((state) => state.statistic.topDonors);
    useEffect(() => {
        dispatch(getTopDonors());
    }, []);
    return (
        <div id="top-donors" className={cx('wrapper')}>
            <div className={cx('container')}>
                <h2>Các cá nhân nổi bật</h2>
                <div className={cx('donors')}>
                    {topDonors && topDonors.map((donor, index) => {
                        if (index < 4) {
                            return (
                                <motion.div key={index} whileHover={{ scale: 1.07 }} className={cx('donor-item')}>
                                    <div className={cx('donor-avatar')}>
                                        <img
                                            src={new Buffer(donor.image, 'base64').toString('binary') || ''}
                                            alt="donor-image"
                                        />
                                        <span>
                                            <FontAwesomeIcon icon={faStar} />
                                        </span>
                                    </div>
                                    <div className={cx('donor-name')}>
                                        <h2>{`${donor.firstName} ${donor.lastName}`}</h2>
                                        <h3>{donor.gender}</h3>
                                        <p>
                                            {donor.district}, {donor.city}
                                        </p>
                                    </div>
                                    <div className={cx('donor-numOfDonate')}>
                                        Số lần hiến máu: {donor.numberOfDonation}
                                    </div>
                                </motion.div>
                            );
                        }
                        return <></>;
                    })}
                </div>
            </div>
        </div>
    );
}

export default TopDonors;
