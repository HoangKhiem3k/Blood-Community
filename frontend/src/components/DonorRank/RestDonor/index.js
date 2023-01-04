import styles from './RestDonor.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingMedical } from '@fortawesome/free-solid-svg-icons';
import { Buffer } from 'buffer';
Buffer.from('anything', 'base64');

const cx = classNames.bind(styles);

function RestDonor({ ...props }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('rank')}>{props.top}</div>
            <div className={cx('content')}>
                <div className={cx('info')}>
                    <div className={cx('image')}>
                        <img src={new Buffer(props.donor.image, 'base64').toString('binary') || ''} alt="donor-image" />
                    </div>
                    <div className={cx('name')}>
                        <div>{`${props.donor.firstName} ${props.donor.lastName}`}</div>
                        <div>{props.donor.gender}</div>
                    </div>
                </div>
                <div className={cx('quantity')}>
                    <FontAwesomeIcon icon={faHandHoldingMedical} /> {props.donor.numberOfDonation}
                </div>
            </div>
        </div>
    );
}

export default RestDonor;
