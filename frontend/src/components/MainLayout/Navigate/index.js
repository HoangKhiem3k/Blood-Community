import { NavLink } from 'react-router-dom';
import styles from './Navigate.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHospital,
    faHospitalUser,
    faPeopleRoof,
    faHandHoldingMedical,
    faCalendarDays,
} from '@fortawesome/free-solid-svg-icons';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';

const cx = classNames.bind(styles);

function Navigate({ to, content }) {
    let icon;
    switch (to) {
        case '/admin/dashboard':
        case '/donor/dashboard':
        case '/hospital/dashboard':
        case '/recipient/dashboard':
            icon = <DashboardIcon />;
            break;
        case '/admin/manage_hospital':
            icon = <FontAwesomeIcon icon={faHospital} />;
            break;
        case '/admin/manage_donor':
            icon = <FontAwesomeIcon icon={faPeopleRoof} />;
            break;
        case '/admin/manage_recipient':
            icon = <FontAwesomeIcon icon={faHospitalUser} />;
            break;
        // case '/admin/manage_admin':
        //     icon = <AdminPanelSettingsIcon />;
        //     break;
        case '/donor/blood_request':
        case '/recipient/blood_request':
            icon = <BloodtypeIcon />;
            break;
        case '/donor/donate':
        case '/hospital/donor_booking':
            icon = <FontAwesomeIcon icon={faHandHoldingMedical} />;
            break;
        case '/donor/manage_schedule':
        case '/hospital/manage_schedule':
            icon = <FontAwesomeIcon icon={faCalendarDays} />;
            break;
        case '/donor/booking_history':
            icon = <FontAwesomeIcon icon={faCalendarDays} />;
            break;
        case '/donor/events':
        case '/hospital/manage_events':
            icon = <EventSeatIcon />;
            break;
        case '/recipient/reward':
        case '/donor/reward':
            icon = <EmojiEventsIcon />;
            break;
        case '/donor/account':
        case '/hospital/account':
        case '/recipient/account':
            icon = <AccountBoxIcon />;
            break;

        case '/recipient/manage_request':
            icon = <ManageHistoryIcon />;
            break;

        default:
            break;
    }
    return (
        <>
            <NavLink
                to={to}
                className={({ isActive }) => {
                    return isActive ? cx('active') : cx('link');
                }}
            >
                <div className={cx('d-flex')}>
                    <div>{icon}</div>
                    <div>{content}</div>
                </div>
            </NavLink>
        </>
    );
}

export default Navigate;
