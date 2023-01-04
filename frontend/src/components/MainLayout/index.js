import { Link, Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import NavBar from './NavBar';
import classNames from 'classnames/bind';
import styles from './MainLayout.module.scss';
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DOMAIN_BACKEND } from '../../config/settingSystem';

const cx = classNames.bind(styles);
function MainLayout({ routes }) {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [socket, setSocket] = useState(null);
    useEffect(() => {
        setSocket(io(DOMAIN_BACKEND));
    }, []);

    useEffect(() => {
        socket?.emit('join room', user);
    }, [socket, user]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('sidebar')}>
                <div className={cx('logo')}>
                    <div className={cx('logo-side')}>
                        <img src={require('../../assets/images/BC_logo1.png')} alt="BC_LOGO" />
                    </div>
                    <div>
                        <span>Blood</span>
                        <span>Comunity</span>
                    </div>
                </div>
                <div className={cx('navlink')}>
                    <SideBar routes={routes} />
                </div>
                {/* <div className={cx('image')}>
                    <img src={require('../../assets/images/Quan_png_0.png')} alt="" />
                </div> */}
            </div>
            <div className={cx('navbar')}>
                <NavBar />
            </div>
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <Outlet context={socket} />
                </div>
            </div>
        </div>
    );
}

export default MainLayout;
