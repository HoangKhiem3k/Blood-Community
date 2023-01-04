import styles from './DonateBox.module.scss';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
const cx = classNames.bind(styles);

function DonateBox({ position }) {
    return (
        <div className={cx('wrapper')}>
            <div
                className={cx('container')}
                style={{
                    position: position ? position : '',
                    bottom: '-150px',
                    left: '60px',
                }}
            >
                <div className={cx('content')}>
                    <h2>Mỗi giọt máu cho đi,</h2>
                    <h2> một cuộc đời ở lại!</h2>
                    <NavLink to="/register">Hiến máu</NavLink>
                </div>
                <div className={cx('image')}>
                    <img src={require('../../../../assets/images/donatebox.png')} alt="donate-img" />
                </div>
            </div>
        </div>
    );
}

export default DonateBox;
