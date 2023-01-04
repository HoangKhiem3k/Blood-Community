import styles from './DonorRank.module.scss';
import classNames from 'classnames/bind';
import Top3Donor from './Top3Donor/Top3Donor';
import { rankBg } from '../../assets/svg/Rank';
import RestDonor from './RestDonor';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getTopDonors } from '../../redux/actions/statisticAction';

const cx = classNames.bind(styles);

function DonorRank() {

    const dispatch = useDispatch();
    const topDonors = useSelector((state) => state.statistic.topDonors);
    const restDonor = [];
    topDonors.forEach((item, index) => {
        if (index >= 3) {
            restDonor.push(item);
        }
    });
    useEffect(() => {
        dispatch(getTopDonors());
    }, []);
    return (
        <div className={cx('wrapper')}>
            <h2>Bảng xếp hạng người hiến máu</h2>
            <div className={cx('content')}>
                <div
                    className={cx('top3')}
                    style={{
                        backgroundImage: `url(${rankBg})`,
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                    }}
                >
                    {topDonors.map((item, index) => {
                        if (index < 3) {
                            return <Top3Donor top={index + 1} donor={item} />;
                        }
                        return <></>;
                    })}
                </div>
                <div className={cx('rest')}>
                    {restDonor.map((item, index) => {
                        return <RestDonor donor={item} top={index + 4} />;
                    })}
                </div>
            </div>
        </div>
    );
}

export default DonorRank;
