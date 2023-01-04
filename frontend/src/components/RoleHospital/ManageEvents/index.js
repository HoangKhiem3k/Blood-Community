import classNames from 'classnames/bind';
import styles from './ManageEvents.module.scss';
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllEvents } from '../../../redux/actions/hospitalServices';
import Button from '@mui/material/Button';
import AddEvent from './AddEvent';
import UpdateEvent from './UpdateEvent';
import DeleteEvent from './DeleteEvent';

const cx = classNames.bind(styles);

function ManageEvents() {
    const [showModalAddNew, setShowModalAddNew] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [eventUpdate, setEventUpdate] = useState({});
    const [eventDelete, setEventDelete] = useState({});
    const handleClose = () => {
        setShowModalAddNew(false);
        setShowModalUpdate(false);
        setShowModalDelete(false);
    };

    const dispatch = useDispatch();
    const listEvents = useSelector((state) => state.hospital.listEvents);

    useEffect(() => {
        dispatch(fetchAllEvents());
    }, []);

    const handleShowModalAddNew = () => setShowModalAddNew(true);

    const handleShowModalUpdate = (event) => {
        setEventUpdate(event);
        setShowModalUpdate(true);
    };
    const handleShowModalDelete = (event) => {
        setEventDelete(event);
        setShowModalDelete(true);
    };

    return (
        <>
            <AddEvent show={showModalAddNew} handleClose={handleClose} />
            <UpdateEvent show={showModalUpdate} handleClose={handleClose} eventUpdate={eventUpdate} />
            <DeleteEvent show={showModalDelete} handleClose={handleClose} eventDelete={eventDelete} />
            <h1>Quản lý sự kiện hiến máu</h1>
            <Button variant="contained" color="success" onClick={handleShowModalAddNew}>
                Thêm sự kiện
            </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Tên sự kiện</th>
                        <th>Nơi tổ chức</th>
                        <th>Ngày tổ chức</th>
                        <th>Mô tả</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {listEvents &&
                        listEvents.map((event, index) => {
                            return (
                                <tr key={`event ${index}`}>
                                    <td>{event.id}</td>
                                    <td>{event.nameEvent}</td>
                                    <td>{event.location}</td>
                                    <td>{event.date}</td>
                                    <td>{event.description}</td>
                                    <td>
                                        <Button variant="outlined" onClick={() => handleShowModalUpdate(event)}>
                                            Sửa
                                        </Button>

                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => handleShowModalDelete(event)}
                                        >
                                            Xoá
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </Table>
        </>
    );
}

export default ManageEvents;
