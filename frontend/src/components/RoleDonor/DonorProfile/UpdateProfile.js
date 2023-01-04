import Modal from 'react-bootstrap/Modal';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateEvent } from '../../../redux/actions/hospitalServices';
import moment from 'moment';

const UpdateProfile = ({ show, handleClose, profileUpdate, menu }) => {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [gender, setGender] = useState();
    const [birthday, setBirthday] = useState();
    const [groupBlood, setGroupBlood] = useState();
    const [email, setEmail] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [district, setDistrict] = useState();
    const [ward, setWard] = useState();
    const [city, setCity] = useState();
    const [address, setAddress] = useState();

    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login.currentUser);

    useEffect(() => {
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setGender(user.gender);
        setBirthday(user.birthday);
        setGroupBlood(user.groupBlood);
        setEmail(user.email);
        setPhoneNumber(user.phoneNumber);
        setDistrict(user.district);
        setWard(user.ward);
        setCity(user.city);
        setAddress(user.address);
    }, [show]);

    const handleUpdateProfile = () => {};
    return (
        <>
            {menu === 'personal' && (
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cập nhật thông tin cá nhân</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="mb-3">
                            <label htmlFor="firstName" className="form-label">
                                Tên
                            </label>
                            <input
                                type="text"
                                className="form-control py-3"
                                id="firstName"
                                placeholder="Tên"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastName" className="form-label">
                                Họ
                            </label>
                            <input
                                type="text"
                                className="form-control py-3"
                                id="lastName"
                                placeholder="Họ"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="gender" className="form-label">
                                Giới tính
                            </label>
                            <input
                                type="text"
                                className="form-control py-3"
                                id="gender"
                                placeholder="Giới tính"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="groupBlood" className="form-label">
                                Nhóm máu
                            </label>
                            <input
                                type="text"
                                className="form-control py-3"
                                id="groupBlood"
                                placeholder="Nhóm máu"
                                value={groupBlood}
                                onChange={(e) => setGroupBlood(e.target.value)}
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outlined" color="error" onClick={handleClose}>
                            Đóng
                        </Button>
                        <Button variant="contained" onClick={handleUpdateProfile}>
                            Thêm
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
            {menu === 'contact' && (
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cập nhật thông tin liên hệ</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                className="form-control py-3"
                                id="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phoneNumber" className="form-label">
                                Số điện thoại
                            </label>
                            <input
                                type="text"
                                className="form-control py-3"
                                id="phoneNumber"
                                placeholder="Số điện thoại"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="district" className="form-label">
                                Phường xã
                            </label>
                            <input
                                type="text"
                                className="form-control py-3"
                                id="district"
                                placeholder="Phường xã"
                                value={district}
                                onChange={(e) => setDistrict(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="ward" className="form-label">
                                Quận huyện
                            </label>
                            <input
                                type="text"
                                className="form-control py-3"
                                id="ward"
                                placeholder="Quận huyện"
                                value={ward}
                                onChange={(e) => setWard(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="city" className="form-label">
                                Tỉnh thành
                            </label>
                            <input
                                type="text"
                                className="form-control py-3"
                                id="city"
                                placeholder="Tỉnh thành"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outlined" color="error" onClick={handleClose}>
                            Đóng
                        </Button>
                        <Button variant="contained" onClick={handleUpdateProfile}>
                            Thêm
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
};

export default UpdateProfile;
