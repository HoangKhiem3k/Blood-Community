import styles from './About.module.scss';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getTotalDonation, getTotalDonor, getTotalRecipient } from '../../../../redux/actions/statisticAction';
const cx = classNames.bind(styles);

function About() {
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
        <section id="about">
            <div className={cx('wrapper')}>
                <div className={cx('image')}>
                    <div className={cx('image-content')}>
                        <img src={require('../../../../assets/images/aboutus.jpeg')} alt="aboutus" />
                    </div>
                </div>
                <div className={cx('content')}>
                    <div className={cx('since')}>
                        <p>Bắt đầu từ</p>
                        <span>2022</span>
                    </div>
                    <h3 className={cx('heading')}>Về chúng tôi</h3>
                    <p className={cx('desc')}>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil ipsum dolores numquam quae
                        debitis magni ab minus hic illum sint itaque, quas sit quo molestiae nisi culpa officiis
                        corporis? Quos?
                    </p>
                    <div className={cx('data-wrapper')}>
                        <div className={cx('data')}>
                            <h2>{totalDonation}</h2>
                            <p>Tổng số lượt hiến máu</p>
                        </div>
                        <div className={cx('data')}>
                            <h2>{totalDonors}</h2>
                            <p>Tổng số người hiến máu</p>
                        </div>
                        <div className={cx('data')}>
                            <h2>{totalRecipients}</h2>
                            <p>Tổng số người nhận máu</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;
