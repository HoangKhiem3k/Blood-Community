import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React, { useState } from 'react';
import moment from 'moment';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllTimeTypes } from '../../../redux/actions/allCodeAction';
import { toast } from 'react-toastify';
import { createSchedule, fetchAllSchedulesById } from '../../../redux/actions/hospitalServices';
import Table from 'react-bootstrap/esm/Table';
import { Button } from '@mui/material';
import { formatDate } from '../../../utils/formatDate';
import DeleteSchedule from './DeleteSchedule';
import styles from './ManageSchedule.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function ManageSchedule() {
    const [startDate, setStartDate] = useState(null);
    const [rangeTime, setRangeTime] = useState([]);
    const [maxNumber, setMaxNumber] = useState(20);
    const [listSchedules, setListSchedules] = useState([]);
    const [showModalDelete, setShowModalDelete] = useState();
    const [scheduleDelete, setScheduleDelete] = useState();

    const dispatch = useDispatch();
    const listTimeTypesRedux = useSelector((state) => state.allCode.listTimeTypes);
    const hospitalId = useSelector((state) => state.auth.login.currentUser.id);
    const listSingleSchedules = useSelector((state) => state.hospital.listSingleSchedules);

    useEffect(() => {
        dispatch(fetchAllTimeTypes());
        dispatch(fetchAllSchedulesById(hospitalId));
    }, []);

    useEffect(() => {
        // convert today -> timestamp to compare
        const date = new Date(formatDate());
        const timestamp = date.getTime();

        const listSchedulesClone = listSingleSchedules
            ?.filter((item) => +item.date >= timestamp)
            .map((item, index) => {
                const date = new Date(+item.date);
                const day = date.getDate();
                const month = date.getMonth() + 1;
                const year = date.getFullYear();
                return { ...item, date: `${day}/${month}/${year}` };
            });
            
        setListSchedules(listSchedulesClone);
    }, [listSingleSchedules]);

    useEffect(() => {
        let data = listTimeTypesRedux;
        if (data && data.length > 0) {
            data = data.map((item) => ({ ...item, isSelected: false }));
        }
        setRangeTime(data);
    }, [listTimeTypesRedux]);

    // bat su kien khi click chon khung gio
    const handleClickBtnTime = (time) => {
        let rangeTimeClone = rangeTime;
        if (rangeTimeClone && rangeTimeClone.length > 0) {
            rangeTimeClone = rangeTimeClone.map((item) => {
                if (item.id === time.id) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            });
            setRangeTime(rangeTimeClone);
        }
    };

    // bat su kien khi nhan nut tao lich (bulkCreate) khi nhan nut Luu thong tin
    const handleCreateSchedule = () => {
        let result = [];
        const selectedTime = rangeTime.filter((item) => {
            return item.isSelected;
        });
        var date = new Date(startDate);
        var formatedDate = date.getTime();
        if (selectedTime.length < 1) {
            toast.error('Bạn chưa chọn khung giờ');
            return;
        }
        if (!startDate) {
            toast.error('Ngày không hợp lệ!');
            return;
        }
        if (selectedTime && selectedTime.length > 0) {
            selectedTime.map((time) => {
                let object = {};
                object.hospitalId = hospitalId;
                object.date = formatedDate;
                object.timeType = time.keyMap;
                object.maxNumber = maxNumber;
                result.push(object);
            });
        }
        const data = {
            arrSchedule: result,
            hospitalId,
            formatedDate: formatedDate,
        };
        dispatch(createSchedule(data));
    };

    // bat su kien onChange khi search
    const [queryDay, setQueryDay] = useState('');
    const search = (data) => {
        return data.filter((item) => item.date.includes(queryDay));
    };

    // modal
    const handleClose = () => {
        setShowModalDelete(false);
    };

    const handleShowModalDelete = (item) => {
        setShowModalDelete(true);
        setScheduleDelete(item);
    };

    return (
        <>
            <DeleteSchedule show={showModalDelete} handleClose={handleClose} scheduleDelete={scheduleDelete} />
            <div className={cx('wrapper')}>
                <h1>Quản lí lịch hiến máu của bệnh viện</h1>
                <div className={cx('pick-schedule')}>
                    <div>
                        <label>Chọn ngày</label>
                        <input
                            type="date"
                            name="date"
                            id="date"
                            min={formatDate()}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Số lượng người hiến máu tối đa cho từng khung giờ</label>
                        <input
                            type="number"
                            id="maxNumber"
                            name="maxNumber"
                            min="1"
                            max="20"
                            value={maxNumber}
                            onChange={(e) => setMaxNumber(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        {rangeTime &&
                            rangeTime.length > 0 &&
                            rangeTime.map((item, index) => {
                                return (
                                    <button
                                        className={cx('btn-pick', {
                                            'btn-active': item.isSelected,
                                        })}
                                        key={index}
                                        onClick={() => handleClickBtnTime(item)}
                                    >
                                        {item.valueVi}
                                    </button>
                                );
                            })}
                    </div>
                    <button onClick={handleCreateSchedule} disabled={!startDate}>Lưu thông tin</button>
                </div>
                <div className={cx('list-schedule')}>
                    <h2>Danh sách lịch hẹn</h2>
                    <div>
                        <input
                            type="text"
                            placeholder="Search by date..."
                            onChange={(e) => setQueryDay(e.target.value)}
                        />
                    </div>
                    <div className="">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Ngày</th>
                                    <th>Khoảng thời gian</th>
                                    <th>Số lượng tối đa</th>
                                    <th>Số lượng hiện tại</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listSchedules &&
                                    search(listSchedules).map((item, index) => {
                                        return (
                                            <tr key={`event ${index}`}>
                                                <td>{item.id}</td>
                                                <td>{item.date}</td>
                                                <td>{item.timeTypeData.valueVi}</td>
                                                <td>{item.maxNumber}</td>
                                                <td>{item.currentNumber}</td>
                                                <td>
                                                    <Button
                                                        variant="outlined"
                                                        color="error"
                                                        onClick={() => handleShowModalDelete(item)}
                                                    >
                                                        Xoá
                                                    </Button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ManageSchedule;
