// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteSchedule } from '../../../redux/actions/hospitalServices';
// import { deleteSchedule } from '../../../redux/actions/hospitalServices';

const DeleteSchedule = ({ show, handleClose, scheduleDelete }) => {
    const dispatch = useDispatch();

    const handleDeleteSchedule = () => {
        dispatch(deleteSchedule(scheduleDelete));
        handleClose();
    };

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Xoá lịch</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Hành động này không thể khôi phục!</p>
                    Bạn có chắc chắn muốn xoá không!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outlined" color="error" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="contained" onClick={handleDeleteSchedule}>
                        Xoá
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default DeleteSchedule;
