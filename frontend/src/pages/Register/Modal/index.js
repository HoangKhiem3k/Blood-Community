import { faCircleCheck, faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import styles from './Modal.module.scss';
import classNames from 'classnames/bind';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

const cx = classNames.bind(styles);

function Modal({ toggleModal, status, message }) {
    return (
        <motion.div
            className={cx('overlay')}
            onClick={toggleModal}
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
        >
            <motion.div
                className={cx('modal')}
                onClick={(e) => {
                    e.stopPropagation();
                }}
                initial={{
                    scale: 0,
                }}
                animate={{
                    scale: 1,
                }}
            >
                <motion.span whileHover={{ scale: 1.1 }} className={cx('modal-cancel')} onClick={toggleModal}>
                    <FontAwesomeIcon icon={faXmark} />
                </motion.span>
                <p
                    className={cx('modal-icon', {
                        ['error']: status === 409,
                    })}
                >
                    {status === 409 ? (
                        <FontAwesomeIcon icon={faCircleXmark} />
                    ) : (
                        <FontAwesomeIcon icon={faCircleCheck} />
                    )}
                </p>
                <hr />
                <h2 className={cx('modal-header')}>{message}</h2>

                <p className={cx('modal-desc')}>
                    {status === 409 ? (
                        <>Hãy kiểm tra lại email của bạn!</>
                    ) : (
                        <>Hãy sử dụng thông tin đã đăng ký để đăng nhập vào hệ thống!</>
                    )}
                </p>

                <NavLink className={cx('modal-button', {
                        ['error']: status === 409,
                    })} to={status===409?'':'/login'} onClick={toggleModal} >
                    {status === 409 ? <>Trở về</> : <>Đăng nhập</>}
                </NavLink>
            </motion.div>
        </motion.div>
    );
}

export default Modal;
