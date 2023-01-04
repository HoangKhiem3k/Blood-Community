import styles from './NavBar.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Tooltip from '@mui/material/Tooltip';
import Popover from '@mui/material/Popover';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { Buffer } from 'buffer';
import { logout } from '../../../redux/actions/authAction';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { DOMAIN_BACKEND } from '../../../config/settingSystem';
import axios from 'axios';
import { getNotifyForDonor, getNotifyForRecipient } from '../../../redux/actions/notifyAction';
Buffer.from('anything', 'base64');

const cx = classNames.bind(styles);
const ENDPOINT = DOMAIN_BACKEND;
var socket;
socket = io(ENDPOINT);

function NavBar() {
    const dispatch = useDispatch();
    const [openNotify, setOpenNotify] = useState(false);
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    let previewImage = require('../../../assets/images/default_avatar.png');
    const navigate = useNavigate();
    const notificationsOfRecipient = useSelector((state) => state.notify.listNotifyOfRecipient);
    const notificationsOfDonor = useSelector((state) => state.notify.listNotifyOfDonor);
    if (currentUser?.image) {
        previewImage = new Buffer(currentUser.image, 'base64').toString('binary');
    }
    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };
    useEffect(() => {
        dispatch(getNotifyForRecipient(currentUser.id));
        dispatch(getNotifyForDonor(currentUser.id));
    }, []);
    const handleNotify = async () => {
        // console.log("currentUser.roleId" , currentUser.roleId)
        if (currentUser.roleId === 'R3') {
            socket.on('get_notification_from_recipient', (data) => {
                dispatch(getNotifyForDonor(currentUser.id));
            });
            socket.on('get_recipient_confirm_notify_success', (data) => {
                console.log('lang nghe su kien reci succeess');
                dispatch(getNotifyForDonor(currentUser.id));
            });
            socket.on('get_recipient_confirm_notify_failed', (data) => {
                dispatch(getNotifyForDonor(currentUser.id));
                console.log(' lang nghe su kien failed');
            });
        } else {
            if (currentUser.roleId === 'R4') {
                socket.on('get_notification_from_donor', (data) => {
                    dispatch(getNotifyForRecipient(currentUser.id));
                });
            } else {
                return;
            }
        }
    };
    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit('join_group_blood', currentUser);
        socket.emit('newUser', currentUser);
    }, [socket, currentUser]);
    useEffect(() => {
        handleNotify();
    }, [socket]);
    const handleRecipientDeleteNotify = async (item) => {
        const id = { id: item.id };
        await axios.put(`${DOMAIN_BACKEND}/api/delete-notify-by-recipient`, id);
        dispatch(getNotifyForRecipient(currentUser.id));
    };
    const handleDonorDeleteNotify = async (item) => {
        const id = { id: item.id };
        const res = await axios.put(`${DOMAIN_BACKEND}/api/delete-notify-by-donor`, id);
        dispatch(getNotifyForDonor(currentUser.id));
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('welcome')}>
                <h2>Chào mừng đến với Blood Community!</h2>
                <p>
                    Xin chào,{' '}
                    {currentUser.roleId === 'R2' && currentUser.hospitalName
                        ? currentUser.hospitalName
                        : `${currentUser.firstName} ${currentUser.lastName}`}
                </p>
            </div>
            <div className={cx('profile')}>
                <Tooltip title={<p className={cx('tooltip')}>Tin nhắn</p>} placement="bottom">
                    <div className={cx('message')}>
                        <FontAwesomeIcon icon={faEnvelope} />
                    </div>
                </Tooltip>
                <Tooltip title={<p className={cx('tooltip')}>Thông báo</p>} placement="bottom">
                    <div className={cx('notification')} onClick={() => setOpenNotify(!openNotify)}>
                        <FontAwesomeIcon icon={faBell} />
                        <div className={cx('counter')}>
                            {currentUser.roleId === 'R4' ? (
                                <div>
                                    {notificationsOfRecipient && notificationsOfRecipient.length > 0 ? (
                                        notificationsOfRecipient.length
                                    ) : (
                                        <>0</>
                                    )}
                                </div>
                            ) : (
                                <div>
                                    {notificationsOfDonor && notificationsOfDonor.length > 0 ? (
                                        notificationsOfDonor.length
                                    ) : (
                                        <>0</>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </Tooltip>
                {openNotify && (
                    <div className={cx('notifications')}>
                        <div className={cx('notify')}>
                            {currentUser.roleId === 'R4' &&
                            notificationsOfRecipient &&
                            notificationsOfRecipient.length > 0 ? (
                                notificationsOfRecipient.map((item, index) => {
                                    return (
                                        <>
                                            <span className={cx('success-notify')} key={index}>
                                                {item.donorName} đã chấp nhận hiến máu cho yêu cầu nhận máu (
                                                {item.unitRequire} ml) của bạn!{' '}
                                                <img
                                                    onClick={() => handleRecipientDeleteNotify(item)}
                                                    src={require('../../../assets/images/deleteIcon.png')}
                                                    alt="delete"
                                                />{' '}
                                            </span>
                                        </>
                                    );
                                })
                            ) : (
                                <>
                                    {currentUser.roleId === 'R3' &&
                                    notificationsOfDonor &&
                                    notificationsOfDonor.length > 0 ? (
                                        notificationsOfDonor.map((item, index) => {
                                            return (
                                                <>
                                                    {item.type === 'recipient_confirm_success' ? (
                                                        <span className={cx('success-notify')}>
                                                            {item.recipientName} đã xác nhận hoàn thành quá trình hiến
                                                            máu cho yêu cầu nhận máu ({item.unitRequire} ml)!
                                                            <img
                                                                onClick={() => handleDonorDeleteNotify(item)}
                                                                src={require('../../../assets/images/deleteIcon.png')}
                                                                alt="delete"
                                                            />
                                                        </span>
                                                    ) : (
                                                        <span className={cx('failed-notify')}>
                                                            {item.recipientName} đã xác nhận quá trình hiến máu cho yêu
                                                            cầu nhận máu ({item.unitRequire} ml) đã không hoàn thành!
                                                            <img
                                                                onClick={() => handleDonorDeleteNotify(item)}
                                                                src={require('../../../assets/images/deleteIcon.png')}
                                                                alt="delete"
                                                            />
                                                        </span>
                                                    )}
                                                </>
                                            );
                                        })
                                    ) : (
                                        <></>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                )}

                {/* style={{ zIndex: '999' }} */}
                <PopupState variant="popover" popupId="demo-popup-popover">
                    {(popupState) => (
                        <>
                            <Tooltip title={<p className={cx('tooltip')}>Tài khoản</p>} placement="bottom">
                                <div
                                    className={cx('profile-manage')}
                                    // onClick={handleClick}
                                    {...bindTrigger(popupState)}
                                >
                                    <img
                                        src={previewImage || require('../../../assets/images/default_avatar.png')}
                                        alt="avatar"
                                    />
                                    <div className={cx('arrow-button')}>
                                        <KeyboardArrowDownIcon />
                                    </div>
                                    <div className={cx('layer')}></div>
                                </div>
                            </Tooltip>

                            <Popover
                                {...bindPopover(popupState)}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                            >
                                <div className={cx('acc-popper')}>
                                    <div className={cx('myacc')}>
                                        <div>
                                            <img
                                                src={
                                                    previewImage || require('../../../assets/images/default_avatar.png')
                                                }
                                                alt="avatar"
                                            />
                                        </div>
                                        <div>
                                            {currentUser &&
                                                currentUser.firstName &&
                                                currentUser.lastName &&
                                                `${currentUser.firstName} ${currentUser.lastName}`}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className={cx('another')}>
                                        <div className={cx('item')}>Cài đặt tài khoản</div>
                                        <div className={cx('item')}>Lịch sử</div>
                                        <div className={cx('item')} onClick={handleLogout}>
                                            Đăng xuất
                                        </div>
                                    </div>
                                </div>
                            </Popover>
                        </>
                    )}
                </PopupState>
            </div>
        </div>
    );
}

export default NavBar;
