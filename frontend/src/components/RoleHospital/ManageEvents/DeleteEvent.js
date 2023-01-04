// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteEvent } from '../../../redux/actions/hospitalServices';

const DeleteEvent = ({ show, handleClose, eventDelete }) => {
    const dispatch = useDispatch();

    const handleDeleteEvent = () => {
        dispatch(deleteEvent(eventDelete.id));
        handleClose();
    };

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Xoá sự kiện</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Hành động này không thể khôi phục!</p>
                    Bạn có chắc chắn muốn xoá không!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outlined" color="error" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="contained" onClick={handleDeleteEvent}>
                        Xoá
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default DeleteEvent;
