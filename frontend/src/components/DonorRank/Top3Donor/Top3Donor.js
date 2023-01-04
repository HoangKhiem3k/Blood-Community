import styles from './Top3Donor.module.scss';
import classNames from 'classnames/bind';
import { no1, no2, no3 } from '../../../assets/svg/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingMedical } from '@fortawesome/free-solid-svg-icons';
import { Buffer } from 'buffer';
Buffer.from('anything', 'base64');

const cx = classNames.bind(styles);

function Top3Donor({ ...props }) {
    let no = no1;
    switch (props.top) {
        case 1:
            no = no1;
            break;
        case 2:
            no = no2;
            break;
        case 3:
            no = no3;
            break;
        default:
            break;
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('image', `image${props.top}`)}>
                <img src={new Buffer(props.donor.image, 'base64').toString('binary') || ''} alt="donor-image" />
                <div>
                    <img src={no} alt={`${no}`} />
                </div>
            </div>
            <div className={cx('name')}>{`${props.donor.firstName} ${props.donor.lastName}`}</div>
            <div className={cx('gender')}>{props.donor.gender}</div>
            <div className={cx('quantity')}>
                <FontAwesomeIcon icon={faHandHoldingMedical} /> {props.donor.numberOfDonation}
            </div>
            <div className={cx('top', `top${props.top}`)}>{props.top}</div>
        </div>
    );
}

export default Top3Donor;
