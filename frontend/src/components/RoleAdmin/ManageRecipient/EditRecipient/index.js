import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from './EditRecipient.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipientById, updateRecipient } from '../../../../redux/actions/recipientManage';
import { getBase64 } from '../../../../utils/getBase64';
import { Fab, MenuItem } from '@mui/material';
import { GridAddIcon } from '@mui/x-data-grid';
import { Buffer } from 'buffer';
Buffer.from('anything', 'base64');

const cx = classNames.bind(styles);

function EditRecipient() {
    const [recipient, setRecipient] = useState({
        // id: '',
        email: '',
        // password: '',
        firstName: '',
        lastName: '',
        gender: '',
        birthday: '',
        phoneNumber: '',
        address: '',
        groupBlood: '',
        image: '',
        status: 'active',
        roleId: 'R4',
        // ward: null,
        // district: "",
        // city: "",
        // image: {
        //     type: "Buffer",
        //     data: []
        // },
    });

    const [previewImageUpload, setPreviewImageUpload] = useState('');
    const [err, setErr] = useState('');
    const { id } = useParams();
    let history = useNavigate();

    const dispatch = useDispatch();
    const recipientState = useSelector((state) => state.users.recipient);

    const {
        email,
        // password,
        firstName,
        lastName,
        gender,
        birthday,
        phoneNumber,
        address,
        groupBlood,
        image,
        status,
        roleId,
    } = recipient;

    useEffect(() => {
        dispatch(fetchRecipientById(id));
    }, []);

    useEffect(() => {
        if (recipientState) {
            setRecipient({ ...recipientState });
        }
    }, [recipientState]);

    let previewImageDisplay = '';
    let imageBase64 = '';
    if (image) {
        imageBase64 = new Buffer(image, 'base64').toString('binary');
    }
    previewImageDisplay = imageBase64;

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setRecipient({ ...recipient, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // if (!status) {
        //     setErr('Vui lòng nhập đầy đủ thông tin');
        // } else {
        if (image && typeof image === 'object') {
            recipient.image = new Buffer(image, 'base64').toString('binary');
        }
        dispatch(updateRecipient(recipient));
        history('/admin/manage_recipient/');
        setErr('');
        // }
    };

    const handleUploadImage = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            setPreviewImageUpload(URL.createObjectURL(file));
            let base64 = await getBase64(file);
            setRecipient({ ...recipient, image: base64 });
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('back')} onClick={() => history('/admin/manage_recipient/')}>
                <FontAwesomeIcon icon={faArrowLeft} />
                &nbsp; Trở về
            </div>
            <h3>Cập nhật thông tin người nhận máu</h3>
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
                            label="Tên"
                            variant="filled"
                            color="info"
                            value={firstName || ''}
                            type="text"
                            name="firstName"
                            onChange={handleInputChange}
                        />
                        <br />
                        <TextField
                            inputProps={{ style: { fontSize: 14 } }}
                            InputLabelProps={{ style: { fontSize: 14 } }}
                            margin="normal"
                            fullWidth
                            id="standard-basic"
                            label="Họ"
                            variant="filled"
                            color="info"
                            value={lastName || ''}
                            type="text"
                            name="lastName"
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
                            type="text"
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
                            // value={password || ''}
                            type="text"
                            name="password"
                            // onChange={handleInputChange}
                            disabled
                        />
                        <br />
                        <TextField
                            inputProps={{ style: { fontSize: 14 } }}
                            InputLabelProps={{ style: { fontSize: 14 } }}
                            margin="normal"
                            fullWidth
                            id="standard-basic"
                            label="Giới tính"
                            variant="filled"
                            color="info"
                            value={gender || ''}
                            type="text"
                            name="gender"
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
                            label="Ngày sinh"
                            variant="filled"
                            color="info"
                            value={birthday || ''}
                            type="text"
                            name="birthday"
                            onChange={handleInputChange}
                        />
                        <br />
                        <TextField
                            inputProps={{ style: { fontSize: 14 } }}
                            InputLabelProps={{ style: { fontSize: 14 } }}
                            margin="normal"
                            fullWidth
                            id="standard-basic"
                            label="Số điện tho"
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
                            label="Nhóm máu"
                            variant="filled"
                            color="info"
                            value={groupBlood || ''}
                            type="text"
                            name="groupBlood"
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

export default EditRecipient;
