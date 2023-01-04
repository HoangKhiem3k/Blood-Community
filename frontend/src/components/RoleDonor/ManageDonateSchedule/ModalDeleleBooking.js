import styles from './ManageDonateSchedule.module.scss';
import classNames from 'classnames/bind';
import { Modal } from 'react-bootstrap';
import { Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { DOMAIN_BACKEND } from '../../../config/settingSystem';

const cx = classNames.bind(styles);

const ModalDeleteBooking = ({ show, handleClose, donorBooking }) => {
    const navigate = useNavigate();
    const handleDeleleBooking = () => {
        axios
            .delete(`${DOMAIN_BACKEND}/api/delete-booking-by-id`, {
                data: {
                    id: donorBooking.id,
                },
            })
            .then((res) => console.log(res))
            .catch((e) => console.log(e));
        handleClose();
    };
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Xoá đơn đăng ký</Modal.Title>
            </Modal.Header>
            <Modal.Body>Đơn đăng ký sẽ bị xóa khỏi hệ thống</Modal.Body>
            <Modal.Footer>
                <Button variant="outlined" onClick={handleClose}>
                    Huỷ
                </Button>
                <Button variant="outlined" color="success" onClick={handleDeleleBooking}>
                    Xác nhận
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalDeleteBooking;
