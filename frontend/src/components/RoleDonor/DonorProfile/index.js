import styles from './Account.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UpdateProfile from './UpdateProfile';

const cx = classNames.bind(styles);

function DonorProfile() {
    const [menu, setMenu] = useState('personal');
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [profileUpdate, setProfileUpdate] = useState({});
    const handleClose = () => {
        setShowModalUpdate(false);
    };

    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login.currentUser);
    let address =
        (user.address === null ? '' : user.address) + ', ' + user.ward + ', ' + user.district + ', ' + user.city;

    return (
        <>
            <UpdateProfile show={showModalUpdate} handleClose={handleClose} profileUpdate={profileUpdate} menu={menu} />

            <div className={cx('wrapper')}>
                <div className={cx('left')}>
                    <div>
                        <img src={require('../../../assets/images/default_avatar.png')} alt="avatar" />
                        <p>{`${user.firstName} ${user.lastName}`}</p>
                    </div>
                    {user && user.roleId === 'R3' && (
                        <>
                            <div className={cx('left-detail')}>
                                <p>Huy hiệu</p>
                                <p>Vàng</p>
                            </div>
                            <div className={cx('left-detail')}>
                                <p>Thứ hạng</p>
                                <p>5</p>
                            </div>
                            <div className={cx('left-detail')}>
                                <p>Số lần đặt lịch hiến máu tại bệnh viện</p>
                                <p>10</p>
                            </div>
                            <div className={cx('left-detail')}>
                                <p>Số lần hiến máu khẩn cấp</p>
                                <p>5</p>
                            </div>
                        </>
                    )}
                </div>
                <div className={cx('right')}>
                    <div className={cx('menu')}>
                        <p
                            onClick={() => {
                                setMenu('personal');
                            }}
                            className={cx('menu-item', {
                                active: menu === 'personal',
                            })}
                        >
                            Thông tin cá nhân
                        </p>
                        <p
                            onClick={() => {
                                setMenu('contact');
                            }}
                            className={cx('menu-item', {
                                active: menu === 'contact',
                            })}
                        >
                            Thông tin liên hệ
                        </p>
                        <p
                            onClick={() => {
                                setMenu('change-password');
                            }}
                            className={cx('menu-item', {
                                active: menu === 'change-password',
                            })}
                        >
                            Thay đổi mật khẩu
                        </p>
                    </div>
                    {menu === 'personal' && (
                        <div className={cx('content')}>
                            <div className={cx('ct-left')}>
                                <div>
                                    <p>Tên</p>
                                    <p>{user.firstName}</p>
                                </div>
                                <div>
                                    <p>Họ</p>
                                    <p>{user.lastName}</p>
                                </div>
                            </div>
                            <div className={cx('ct-right')}>
                                <div>
                                    <p>Giới tính</p>
                                    <p>{user.gender}</p>
                                </div>
                                <div>
                                    <p>Ngày sinh</p>
                                    <p>{user.birthday}</p>
                                </div>
                                <div>
                                    <p>Nhóm máu</p>
                                    <p>{user.groupBlood}</p>
                                </div>
                            </div>
                        </div>
                    )}
                    {menu === 'contact' && (
                        <div className={cx('content')}>
                            <div className={cx('ct-left')}>
                                <div>
                                    <p>Email</p>
                                    <p>{user.email}</p>
                                </div>
                                <div>
                                    <p>Số điện thoại</p>
                                    <p>{user.phoneNumber}</p>
                                </div>
                            </div>
                            <div className={cx('ct-right')}>
                                <div>
                                    <p>Địa chỉ liên hệ</p>
                                    <p>{address}</p>
                                </div>
                            </div>
                        </div>
                    )}
                    {menu === 'change-password' && <div className={cx('content')}></div>}
                    <div className={cx('btn')}>
                        <button onClick={() => setShowModalUpdate(true)}>Edit</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DonorProfile;
