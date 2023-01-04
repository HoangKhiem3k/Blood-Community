import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from './AddNewHospital.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createUser } from '../../../../redux/actions/hospitalManage';
import { Fab } from '@mui/material';
import { GridAddIcon } from '@mui/x-data-grid';
import { getBase64 } from '../../../../utils/getBase64';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const cx = classNames.bind(styles);

function AddNewHospital() {
    const [hospital, setHospital] = useState({
        hospitalName: '',
        email: '',
        password: '',
        phoneNumber: '',
        address: '',
        image: '',
        roleId: 'R2',
    });

    const [previewImage, setPreviewImage] = useState('');
    const { hospitalName, email, password, phoneNumber, address, image, roleId } = hospital;
    const [err, setErr] = useState('');

    let history = useNavigate();
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setHospital({ ...hospital, roleId: 'R2', [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!hospitalName || !email || !password || !phoneNumber || !address || !image) {
            setErr('Vui lòng nhập đầy đủ thông tin');
        } else {
            dispatch(createUser(hospital));
            history('/admin/manage_hospital/');
            setErr('');
        }
    };

    const handleUploadImage = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
            let base64 = await getBase64(file);
            setHospital({ ...hospital, image: base64 });
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('back')} onClick={() => history('/admin/manage_hospital/')}>
                <FontAwesomeIcon icon={faArrowLeft} />
                &nbsp; Trở về
            </div>
            <h3>Thêm mới bệnh viện</h3>
            {err && <h4 style={{ color: 'red' }}>{err}</h4>}
            <form className={cx('content')} onSubmit={handleSubmit}>
                <div className={cx('content-info')}>
                    <div>
                        {previewImage ? <img src={previewImage} alt="preview-avatar" /> : <span>Preview Image</span>}
                    </div>
                    <div>
                        <label htmlFor="upload-image">
                            <input
                                style={{ display: 'none' }}
                                id="upload-image"
                                name="image"
                                type="file"
                                onChange={(e) => handleUploadImage(e)}
                            />
                            <Fab color="info" size="small" component="span" aria-label="add" variant="extended">
                                <GridAddIcon /> Upload photo
                            </Fab>
                        </label>

                        <br />

                        <TextField
                            inputProps={{ style: { fontSize: 14 } }}
                            InputLabelProps={{ style: { fontSize: 14 } }}
                            margin="normal"
                            fullWidth
                            id="standard-basic"
                            label="Email"
                            variant="filled"
                            color="info"
                            value={email || ''}
                            type="email"
                            name="email"
                            onChange={handleInputChange}
                        />
                        <br />
                        <TextField
                            inputProps={{ style: { fontSize: 14 } }}
                            InputLabelProps={{ style: { fontSize: 14 } }}
                            margin="normal"
                            fullWidth
                            id="standard-basic"
                            label="Mật khẩu"
                            variant="filled"
                            color="info"
                            value={password || ''}
                            type="password"
                            name="password"
                            onChange={handleInputChange}
                        />
                        <br />
                    </div>
                    <div>
                        <TextField
                            inputProps={{ style: { fontSize: 14 } }}
                            InputLabelProps={{ style: { fontSize: 14 } }}
                            margin="normal"
                            fullWidth
                            id="standard-basic"
                            label="Tên bệnh viện"
                            variant="filled"
                            color="info"
                            value={hospitalName || ''}
                            type="text"
                            name="hospitalName"
                            onChange={handleInputChange}
                        />
                        <br />
                        <TextField
                            inputProps={{ style: { fontSize: 14 } }}
                            InputLabelProps={{ style: { fontSize: 14 } }}
                            margin="normal"
                            fullWidth
                            id="standard-basic"
                            label="Số điện thoại"
                            variant="filled"
                            color="info"
                            value={phoneNumber || ''}
                            type="text"
                            name="phoneNumber"
                            onChange={handleInputChange}
                        />
                        <br />
                        <TextField
                            inputProps={{ style: { fontSize: 14 } }}
                            InputLabelProps={{ style: { fontSize: 14 } }}
                            margin="normal"
                            fullWidth
                            id="standard-basic"
                            label="Địa chỉ"
                            variant="filled"
                            color="info"
                            value={address || ''}
                            type="text"
                            name="address"
                            onChange={handleInputChange}
                        />
                        <br />
                    </div>
                </div>
                <div className={cx('button')}>
                    <Button variant="contained" type="submit">
                        Thêm
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default AddNewHospital;
