import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import styles from './ViewHospital.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHospitalById } from '../../../../redux/actions/hospitalManage';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { Buffer } from 'buffer';
Buffer.from('anything', 'base64');

const cx = classNames.bind(styles);

function ViewHospital() {
    const [hospital, setHospital] = useState({
        hospitalName: '',
        email: '',
        password: '',
        phoneNumber: '',
        address: '',
        image: '',
        roleId: 'R2',
    });
    const { hospitalName, email, phoneNumber, address, image } = hospital;
    const [isOpen, setIsOpen] = useState(false);
    const [err, setErr] = useState('');
    const { id } = useParams();
    let history = useNavigate();

    const dispatch = useDispatch();
    const hospitalState = useSelector((state) => state.users.hospital);

    useEffect(() => {
        dispatch(fetchHospitalById(id));
    }, []);

    useEffect(() => {
        if (hospitalState) {
            setHospital({ ...hospitalState });
        }
    }, [hospitalState]);

    let previewImage = '';
    let imageBase64 = '';
    if (image) {
        imageBase64 = new Buffer(image, 'base64').toString('binary');
    }
    previewImage = imageBase64;

    return (
        <div className={cx('wrapper')}>
            <div className={cx('back')} onClick={() => history('/admin/manage_hospital/')}>
                <FontAwesomeIcon icon={faArrowLeft} />
                &nbsp; Trở về
            </div>
            <h3>Xem thông tin bệnh viện</h3>
            {err && <h4 style={{ color: 'red' }}>{err}</h4>}
            <div className={cx('content')}>
                <div className={cx('content-info')}>
                    <div
                        onClick={() => {
                            if (!previewImage) return;
                            setIsOpen(true);
                        }}
                    >
                        {previewImage ? <img src={previewImage} alt="preview-avatar" /> : <span>Preview Image</span>}
                    </div>
                    {isOpen && <Lightbox mainSrc={previewImage} onCloseRequest={() => setIsOpen(false)} />}
                    <div>
                        <h3>Tên bệnh viện: </h3>
                        <p>{hospitalName}</p>
                        <br />
                        <h3>Email: </h3>
                        <p>{email}</p>
                        <br />
                    </div>
                    <div>
                        <h3>Số điện thoại: </h3>
                        <p>{phoneNumber}</p>
                        <br />
                        <h3>Địa chỉ: </h3>
                        <p>{address}</p>
                    </div>
                </div>
                <div className={cx('button')}>
                    <Button variant="contained" type="submit" onClick={() => history('/admin/manage_hospital/')}>
                        Trở về
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ViewHospital;
