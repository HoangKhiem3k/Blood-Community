// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent } from '../../../redux/actions/hospitalServices';
import moment from 'moment';

const AddEvent = ({ show, handleClose }) => {
    const [nameEvent, setNameEvent] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [desc, setDesc] = useState('');
    const dispatch = useDispatch();
    const currentHospitalId = useSelector((state) => state.auth.login.currentUser.id);
    const handleAddNewEvent = () => {
        const data = {
            hospitalId: currentHospitalId,
            nameEvent,
            location,
            date: moment(date).format('DD/MM/YYYY hh:mm'),
            description: desc,
        };
        dispatch(createEvent(data));
        setNameEvent('');
        setLocation('');
        setDate('');
        setDesc('');
        handleClose();
    };

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm sự kiện</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label htmlFor="nameEvent" className="form-label">
                            Tên sự kiện
                        </label>
                        <input
                            type="text"
                            className="form-control py-3"
                            id="nameEvent"
                            placeholder="Tên sự kiện"
                            value={nameEvent}
                            onChange={(e) => setNameEvent(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="location" className="form-label">
                            Nơi tổ chức
                        </label>
                        <input
                            type="text"
                            className="form-control py-3"
                            id="location"
                            placeholder="Nơi tổ chức"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="date-time" className="form-label">
                            Thời gian
                        </label>
                        <input
                            type="datetime-local"
                            className="form-control py-3"
                            id="date-time"
                            placeholder="Thời gian"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="desc" className="form-label">
                            Mô tả
                        </label>
                        <textarea
                            className="form-control py-3"
                            id="desc"
                            placeholder="Mô tả"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outlined" color="error" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="contained" onClick={handleAddNewEvent}>
                        Thêm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AddEvent;
