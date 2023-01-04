import styles from './StatusButton.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function StatusButton({ status, handleOnclick }) {
    let stt = '';
    if (status === 'confirm') {
        stt = 'Đồng ý cho máu';
    } else if (status === 'reject') {
        stt = 'Từ chối';
    } else if (status === 'pending') {
        stt = 'Đang tiến hành';
    }
    return <div className={cx(`button-${status}`, 'button')} onClick={() => handleOnclick()}>{stt}</div>;
}

export default StatusButton;
