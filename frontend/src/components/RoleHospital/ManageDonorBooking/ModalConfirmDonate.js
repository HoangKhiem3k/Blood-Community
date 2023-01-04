import { Modal } from 'react-bootstrap';
import { Button } from '@mui/material';
import styles from './ModalConfirmDonate.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import axios from 'axios';
import { DOMAIN_BACKEND } from '../../../config/settingSystem.js';

const cx = classNames.bind(styles);

const ModalConfirmDonate = ({ show, handleClose, donorBooking, handleChangeStatus }) => {
    const [formalityDonate, setFormalityDonate] = useState('');
    const [bloodAmount, setBloodAmount] = useState('');

    const handleConfirmDonate = () => {
        let date = new Date();
        console.log(donorBooking.id, formalityDonate, bloodAmount);
        axios
            .post(`${DOMAIN_BACKEND}/api/hospital-confirm-booking`, {
                id: donorBooking.id,
                formalityDonate,
                bloodAmount,
            })
            .then((data) => {
                console.log(data);
                date = data.data.content.date;
                console.log(date);
                handleChangeStatus(date);
            })
            .catch((e) => console.log(e));
        handleClose();
    };

    console.log(donorBooking.id);

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title className={cx('md-title')}>Xác nhận hiến máu thành công</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={cx('form-group')}>
                    <label htmlFor="donate-form">Hình thức hiến</label>
                    <input
                        type="text"
                        id="donate-form"
                        value={formalityDonate}
                        onChange={(e) => setFormalityDonate(e.target.value)}
                    />
                </div>
                <div className={cx('form-group')}>
                    <label htmlFor="ml">Lượng máu đã hiến (ml)</label>
                    <input type="text" id="ml" value={bloodAmount} onChange={(e) => setBloodAmount(e.target.value)} />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outlined" onClick={handleClose}>
                    Huỷ
                </Button>
                <Button variant="outlined" color="success" onClick={handleConfirmDonate}>
                    Xác nhận
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalConfirmDonate;
