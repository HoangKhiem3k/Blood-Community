import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from './EditHospital.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHospitalById, updateHospital } from '../../../../redux/actions/hospitalManage';
import { getBase64 } from '../../../../utils/getBase64';
import { Fab, MenuItem } from '@mui/material';
import { GridAddIcon } from '@mui/x-data-grid';
import { Buffer } from 'buffer';
Buffer.from('anything', 'base64');

const cx = classNames.bind(styles);

function EditHospital() {
    const [hospital, setHospital] = useState({
        hospitalName: '',
        email: '',
        status: '',
        phoneNumber: '',
        address: '',
        image: '',
        roleId: 'R2',
    });
    const { hospitalName, email, status, phoneNumber, address, image, roleId } = hospital;
    const [previewImageUpload, setPreviewImageUpload] = useState('');
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

    let previewImageDisplay = image || '';
    let imageBase64 = '';
    if (image && typeof image === 'object') {
        imageBase64 = new Buffer(image, 'base64').toString('binary');
        previewImageDisplay = imageBase64;
    }

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setHospital({ ...hospital, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!hospitalName || !email || !phoneNumber || !address) {
            setErr('Vui lòng nhập đầy đủ thông tin');
        } else {
            if (image && typeof image === 'object') {
                hospital.image = new Buffer(image, 'base64').toString('binary');
            }
            dispatch(updateHospital(hospital));
            history('/admin/manage_hospital/');
            setErr('');
        }
    };

    const handleUploadImage = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            setPreviewImageUpload(URL.createObjectURL(file));
            let base64 = await getBase64(file);
            setHospital({ ...hospital, image: base64 });
        }
    };

    const handleBack = () => {
        history('/admin/manage_hospital/');
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('back')} onClick={handleBack}>
                <FontAwesomeIcon icon={faArrowLeft} />
                &nbsp; Trở về
            </div>
            <h3>Cập nhật thông tin bệnh viện</h3>
            {err && <h4 style={{ color: 'red' }}>{err}</h4>}
            <form className={cx('content')} onSubmit={handleSubmit}>
                <div className={cx('content-info')}>
                    <div>
                        {previewImageUpload ? (
                            <img src={previewImageUpload} alt="preview-avatar" />
                        ) : previewImageDisplay ? (
                            <img src={previewImageDisplay} alt="preview-avatar" />
                        ) : (
                            <span>Preview Image</span>
                        )}
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
                            label="Email"
                            variant="filled"
                            color="info"
                            value={email || ''}
                            type="email"
                            name="email"
                            onChange={handleInputChange}
                            // disabled
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
                        <TextField
                            inputProps={{ style: { fontSize: 14 } }}
                            InputLabelProps={{ style: { fontSize: 14 } }}
                            margin="normal"
                            fullWidth
                            id="standard-basic"
                            label="Trạng thái"
                            variant="filled"
                            color="info"
                            value={status || 'active'}
                            select
                            name="status"
                            onChange={handleInputChange}
                        >
                            <MenuItem value="active">Active</MenuItem>
                            <MenuItem value="inactive">Inactive</MenuItem>
                        </TextField>
                        <br />
                    </div>
                </div>
                <div className={cx('button')}>
                    <Button variant="contained" type="submit">
                        Lưu thay đổi
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default EditHospital;
