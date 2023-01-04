import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { NavLink, Link, useNavigate, Navigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { loginAccount } from '../../redux/actions/authAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';

const cx = classNames.bind(styles);

const Login = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const isLoggedIn = useSelector((state) => state.auth.login.isLoggedIn);
    const status = useSelector((state) => state.auth.login.status);
    const message = useSelector((state) => state.auth.login.message);

    const navigate = useNavigate();
    switch (currentUser?.roleId) {
        case 'R1':
            navigate('/admin');
            break;
        case 'R2':
            navigate('/hospital');
            break;
        case 'R3':
            navigate('/donor');
            break;
        case 'R4':
            navigate('/recipient');
            break;
        default:
            break;
    }

    // xu ly form submit
    const { values, isValid, dirty, handleBlur, touched, errors, handleChange, handleSubmit } = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required('Vui lòng nhập Email!')
                .matches(
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    'Vui lòng nhập đúng email!',
                ),
            password: Yup.string()
                .required('Vui lòng nhập passwords!')
                .matches(
                    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{8,}$/,
                    'Mật khẩu phải có ít nhất 8 ký tự, bao gồm ít nhất 1 chữ cái, 1 số và 1 ký tự đặc biệt',
                ),
        }),
        onSubmit: (value) => {
            dispatch(loginAccount(value));
        },
    });
    if (isLoggedIn) {
        let role;
        switch (currentUser.roleId) {
            case 'R2':
                role = 'hospital';
                break;
            case 'R3':
                role = 'donor';
                break;
            case 'R4':
                role = 'recipient';
                break;
            default:
                break;
        }
        return currentUser.roleId === 'R1' ? <Navigate to="/admin/dashboard" /> : <Navigate to={`/${role}/account`} />;
    }
    // console.log(touched.email);

    return (
        <div className={cx('login-body')}>
            <div className={cx('wrapper', 'mx-auto rounded-2xl bg-white shadow-2xl ')}>
                {/* login welcome */}
                <div className={cx('welcome')}>
                    <div className={cx('welcome-logo')}>
                        <div className={cx('logo-side')}>
                            <Link to={'/'}>
                                <img src={require('../../assets/images/BC_logo1.png')} alt="BC_LOGO" />
                            </Link>
                        </div>
                        <div>
                            <span>Blood</span>
                            <span>Comunity</span>
                        </div>
                    </div>
                    {/* <div>Chào mừng bạn đến với trang đăng nhập!</div> */}
                    <div className={cx('slogan')}>
                        Mỗi giọt máu cho đi, <p>một cuộc đời ở lại!</p>
                    </div>
                    <div className={cx('desc')}>
                        Với mỗi lần hiến máu bạn có thể
                        <p>mang lại cơ hội cứu sống 3 người.</p> Hãy cứu lấy mạng người bằng ít máu của mình!
                    </div>
                </div>
                {/* login content */}
                <div className={cx('login-content')}>
                    <div className={cx('logo')}>
                        <Link to={'/'}>
                            <img src={require('../../assets/images/BC_logo1.png')} alt="BC_LOGO" />
                        </Link>
                    </div>
                    <h2 className={cx('heading')}>Đăng nhập</h2>
                    {message && (
                        <div className={cx('error-server')}>
                            <div>
                                <FontAwesomeIcon icon={faCircleExclamation} />
                            </div>
                            <div>{message}</div>
                        </div>
                    )}
                    {/* form login */}
                    <form className="flex flex-col " onSubmit={handleSubmit}>
                        {/* Email */}
                        <div className=" w-full flex-1">
                            <div className="mt-4 h-6 text-2xl font-semibold leading-8 text-gray-800 mb-4">Email</div>
                            <div className="my-2 flex rounded-full border border-gray-200 bg-white">
                                <input
                                    className={`w-full appearance-none p-3 px-5 text-gray-800 outline-none bg-gray-100 rounded-full text-2xl ${
                                        errors.email && touched.email ? 'errorFormik' : ''
                                    }`}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    id="email"
                                    name="email"
                                    placeholder="Địa chỉ email"
                                />
                            </div>
                            {errors.email && touched.email ? <div className={cx('error')}>{errors.email}</div> : null}
                        </div>

                        {/* Password */}
                        <div className=" w-full flex-1">
                            <div className="mt-4 h-6 text-2xl font-semibold leading-8 text-gray-800 mb-4">Mật khẩu</div>
                            <div className="my-2 flex rounded-full border border-gray-200 bg-white">
                                <input
                                    className={`w-full appearance-none p-3 px-5 text-gray-800 outline-none bg-gray-100 rounded-full text-2xl ${
                                        errors.password && touched.password ? 'errorFormik' : ''
                                    }`}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    id="password"
                                    name="password"
                                    placeholder="Mật khẩu"
                                    type="password"
                                />
                            </div>
                            {errors.password && touched.password ? (
                                <div className={cx('error')}>{errors.password}</div>
                            ) : null}
                        </div>

                        {/* login button */}
                        <button className={cx('btn-login')} type="submit" disabled={!(isValid && dirty)}>
                            Đăng nhập
                        </button>
                    </form>

                    <hr />
                    <p className={cx('footer')}>
                        Bạn chưa có tài khoản?
                        <NavLink style={{marginLeft: "5px", marginTop: "10px"}} to="/register" className={cx('btn-register')}>
                            Đăng ký
                        </NavLink>
                    </p>
                    <p className={cx('footer')}>
                        Quên mật khẩu?
                        <NavLink style={{marginLeft: "5px"}} to="/forgot-password" className={cx('btn-register')}>
                            Lấy lại mật khẩu
                        </NavLink>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
