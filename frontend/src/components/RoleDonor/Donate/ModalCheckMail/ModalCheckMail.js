import styles from './ModalCheckMail.module.scss';
import classNames from 'classnames/bind';
import { Modal } from 'react-bootstrap';
import { Button } from '@mui/material';

const cx = classNames.bind(styles);

const ModalCheckMail = ({ show, handleClose, statusCode }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Thêm sự kiện</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {statusCode ? (
                    <>
                        <h2>Đặt lịch hẹn thành công!</h2>
                        <p>Vui lòng check email để xác nhận.</p>
                    </>
                ) : (
                    <>
                        <h2>Đặt lịch hẹn thất bại!</h2>
                        <p>Bạn chỉ có thể đăng ký 1 đơn hiến máu tại 1 thời điểm! (ít nhất 3 tháng)</p>
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outlined" color="success" onClick={handleClose}>
                    Ok
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalCheckMail;
