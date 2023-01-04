import React, { useEffect, useLayoutEffect, useState } from 'react'
import classNames from 'classnames/bind';
import styles from '../LandingPage/components/DonationEvents/DonationEvents.module.scss';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import DonationEvents from '../LandingPage/components/DonationEvents'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { DOMAIN_BACKEND, DOMAIN_FRONTEND } from '../../config/settingSystem';
import axios from 'axios';
const cx = classNames.bind(styles);
export default function Event() {
  const [listEvents, setListEvents] = useState([])
  const [result,setResult] = useState([])
  const location = useLocation();
  const string = location.pathname
  let id = string.slice(7)
  useEffect(() => {
    axios.get(`${DOMAIN_BACKEND}/api/get-all-events`).then((res) => {
      setListEvents(res.data.content)
      const resultFind = res.data.content.find(item => item.id = parseInt(id));
      setResult(resultFind)
    })
  }, [])
  // useEffect(() => {
  //   setResult(listEvents)
  // },[listEvents])
  // const resultFind = listEvents.find(item => item.id = parseInt(id));
  return (
    <>
      <div>Event pages</div>
      <div className={cx('events')}>
        <motion.div
          className={cx('item')}
          whileHover={{
            translateY: '-6px',
            transition: { duration: 0.1 },
          }}
        >
          <div className={cx('image')}>
            <img
              src="https://static.giotmauvang.org.vn/ihpstatic/BTH/2.png"
              alt="hospitalImage"
            />
          </div>
          <div className={cx('content')}>
            <h2>{result.nameEvent}</h2>
            <p>{result.description}</p>
            <div className={cx('location')}>
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{result.location}</span>
            </div>
            <div>
              <div id="fb-root"></div>
              <div className="fb-like" data-href={`${DOMAIN_FRONTEND}/event/${result.id}`} data-width="" data-layout="button_count" data-action="like" data-size="small" data-share="true"></div>
              {/* <div className="fb-like" data-href="https://www.youtube.com/results?search_query=tich+hop+like+and+share+fb" data-width="" data-layout="button_count" data-action="like" data-size="small" data-share="true"></div> */}
            </div>
          </div>
          <div className={cx('date')}>{result.date}</div>
        </motion.div>
      </div>
      <div>
        <Helmet>
          <script async defer crossorigin="anonymous" src="https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v15.0&appId=676496990632073&autoLogAppEvents=1" nonce="VSddtRUx"></script>
        </Helmet>
      </div>
    </>
  )
}
