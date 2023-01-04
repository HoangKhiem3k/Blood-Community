import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import useLocationForm from './Location/useLocationForm';
import { NavLink, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import CustomeSelect from './CustomSelect';
import * as Yup from 'yup';
import { useState } from 'react';
import Modal from './Modal';
import { useDispatch, useSelector } from 'react-redux';
import { registerAccount } from '../../redux/actions/authAction';

const cx = classNames.bind(styles);

const Register = () => {
    const [openModal, setOpenModal] = useState(false);
    const dispatch = useDispatch();
    const status = useSelector((state) => state.auth.register.status);
    const message = useSelector((state) => state.auth.register.message);
    // handle from submit
    const {
        values,
        isValid,
        dirty,
        touched,
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        setFieldTouched,
    } = useFormik({
        initialValues: {
            email: '',
            password: '',
            roleId: '',
            fullname: '',
            birthday: '',
            gender: '',
            phone: '',
            cityId: null,
            cityName: '',
            districtId: null,
            districtName: '',
            wardId: null,
            wardName: '',
            bloodGroup: '',
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
            roleId: Yup.string().required('Vui lòng chọn loại tài khoản!').nullable(),
            fullname: Yup.string().required('Vui lòng nhập Họ và tên!'),
            birthday: Yup.string().required('Vui lòng chọn ngày sinh!').nullable(),
            gender: Yup.string().required('Vui lòng chọn giới tính!').nullable(),

            phone: Yup.string()
                .required('Vui lòng nhập số điện thoại!')
                .matches(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, 'Số điện thoại gồm 10 chữ số'),
            cityId: Yup.number().required('Vui lòng chọn Tỉnh/Thành!').nullable(),
            districtId: Yup.number().required('Vui lòng chọn Quận/Huyện!').nullable(),
            wardId: Yup.number().required('Vui lòng chọn Phường/Xã!').nullable(),
            bloodGroup: Yup.string().required('Vui lòng chọn nhóm máu!').nullable(),
        }),
        onSubmit: async (value) => {
            const nameArray = value.fullname.split(' ');
            let file =
                value.gender === 'male'
                    ? require('../../assets/images/default_avatar.png')
                    : require('../../assets/images/default_avatar_female.png');
            // let base64 = await getBase64(file);
            const user = {
                email: value.email,
                password: value.password,
                roleId: value.roleId,
                firstName: nameArray[nameArray.length - 1],
                lastName: nameArray[0],
                birthday: value.birthday,
                gender: value.gender,
                phoneNumber: value.phone,
                // cityId: null,
                // cityName: value.email,
                // address: value.address,
                city: value.cityName,
                district: value.districtName,
                ward: value.wardName,
                image: file,
                // districtId: null,
                // districtName: value.email,
                // wardId: null,
                // wardName: value.email,
                groupBlood: value.bloodGroup,
            };
            dispatch(registerAccount(user));
        },
    });
    const { state, onCitySelect, onDistrictSelect, onWardSelect } = useLocationForm(true);
    const { cityOptions, districtOptions, wardOptions } = state;

    const handleToggleModal = () => {
        setOpenModal(false);
    };

    return (
        <div className={cx('register-body')}>
            <div className={cx('wrapper', 'mx-auto rounded-2xl bg-white pb-2 shadow-2xl ')}>
                <div className={cx('logo')}>
                    <Link to={'/'}>
                        <img src={require('../../assets/images/BC_logo1.png')} alt="BC_LOGO" />
                    </Link>
                </div>
                <h2 className={cx('heading')}>Đăng ký tài khoản</h2>

                {/* form register */}
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

                    {/* roleId */}
                    <div className=" w-full flex-1">
                        <div className="mt-4 h-6 text-2xl font-semibold leading-8 text-gray-800 mb-4">Bạn là: </div>
                        <div>
                            <select
                                className="my-2 rounded border border-gray-200 bg-white pt-3 pb-3 pl-2 block w-full text-2xl text-gray-900  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none "
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.roleId}
                                id="roleId"
                                name="roleId"
                            >
                                <option value="">Chọn loại tài khoản</option>
                                <option value="R3">Người hiến máu</option>
                                <option value="R4">Người nhận máu</option>
                            </select>
                        </div>
                        {errors.roleId && touched.roleId ? <div className={cx('error')}>{errors.roleId}</div> : null}
                    </div>

                    {/* Họ và tên */}
                    <div className="w-full flex-1">
                        <div className="mt-4 h-6 text-2xl font-semibold leading-8 text-gray-800 mb-4">Họ và tên</div>
                        <div className="my-2 flex rounded-full border border-gray-200 bg-white">
                            <input
                                className={`w-full appearance-none p-3 px-5 text-gray-800 outline-none bg-gray-100 rounded-full text-2xl ${
                                    errors.fullname && touched.fullname ? 'errorFormik' : ''
                                }`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.fullname}
                                name="fullname"
                                id="fullname"
                                placeholder="Nhập tên đầy đủ"
                            />
                        </div>
                        {errors.fullname && touched.fullname ? (
                            <div className={cx('error')}>{errors.fullname}</div>
                        ) : null}
                    </div>

                    {/* Ngay sinh va gioi tinh */}
                    <div className="w-full flex-1 flex flex-row justify-between">
                        <div className="w-1/2 mr-2">
                            <div className="mt-4 h-6 text-2xl font-semibold leading-8 text-gray-800 mb-4">
                                Ngày sinh
                            </div>
                            <div className="my-2 flex rounded-full border border-gray-200 bg-white">
                                <input
                                    className="w-full appearance-none p-3 px-5 text-gray-800 outline-none bg-gray-100 rounded-full text-2xl"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.birthday}
                                    name="birthday"
                                    id="birthday"
                                    type="date"
                                />
                            </div>
                            {errors.birthday && touched.birthday ? (
                                <div className={cx('error')}>{errors.birthday}</div>
                            ) : null}
                        </div>
                        <div className="w-1/2 ml-2">
                            <div className="mt-4 h-6 text-2xl font-semibold leading-8 text-gray-800 mb-4">
                                Giới tính:{' '}
                            </div>
                            <div>
                                <select
                                    className="my-2 rounded border border-gray-200 bg-white pt-3 pb-3 pl-2 block w-full text-2xl text-gray-900  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none "
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.gender}
                                    id="gender"
                                    name="gender"
                                >
                                    <option value="">Chọn giới tính</option>
                                    <option value="male">Nam</option>
                                    <option value="female">Nữ</option>
                                    <option value="another">Khác</option>
                                </select>
                                {errors.gender && touched.gender ? (
                                    <div className={cx('error')}>{errors.gender}</div>
                                ) : null}
                            </div>
                        </div>
                    </div>

                    {/* So dien thoai */}
                    <div className="w-full">
                        <div className="mt-4 h-6 text-2xl font-semibold leading-8 text-gray-800 mb-4">
                            Số điện thoại
                        </div>
                        <div className="my-2 flex rounded-full border border-gray-200 bg-white">
                            <input
                                className={`w-full appearance-none p-3 px-5 text-gray-800 outline-none bg-gray-100 rounded-full text-2xl ${
                                    errors.phone && touched.phone ? 'errorFormik' : ''
                                }`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.phone}
                                name="phone"
                                id="phone"
                                placeholder="Gồm 10 chữ số"
                            />
                        </div>
                        {errors.phone && touched.phone ? <div className={cx('error')}>{errors.phone}</div> : null}
                    </div>

                    {/* Chon dia chi */}
                    <div className="w-full flex-1">
                        <div className="mt-4 h-6 text-2xl font-semibold leading-8 text-gray-800 mb-4">Địa chỉ</div>
                        <CustomeSelect
                            name="cityId"
                            value={values.cityId}
                            onChange={(value) => {
                                setFieldValue('cityId', value.value);
                                setFieldValue('cityName', value.label);
                                onCitySelect(value);
                            }}
                            onBlur={setFieldTouched}
                            options={cityOptions}
                            className="my-2"
                            placeholder="Tỉnh/Thành"
                        />
                        {errors.cityId && touched.cityId ? <div className={cx('error')}>{errors.cityId}</div> : null}

                        <CustomeSelect
                            className="my-2"
                            value={values.districtId}
                            onChange={(value) => {
                                setFieldValue('districtId', value.value);
                                setFieldValue('districtName', value.label);
                                onDistrictSelect(value);
                            }}
                            onBlur={setFieldTouched}
                            name="districtId"
                            options={districtOptions}
                            placeholder="Quận/Huyện"
                        />
                        {errors.districtId && touched.districtId ? (
                            <div className={cx('error')}>{errors.districtId}</div>
                        ) : null}

                        <CustomeSelect
                            className="my-2"
                            value={values.wardId}
                            onChange={(value) => {
                                setFieldValue('wardId', value.value);
                                setFieldValue('wardName', value.label);
                                onWardSelect(value);
                            }}
                            onBlur={setFieldTouched}
                            name="wardId"
                            options={wardOptions}
                            placeholder="Phường/Xã"
                        />
                        {errors.wardId && touched.wardId ? <div className={cx('error')}>{errors.wardId}</div> : null}
                    </div>

                    {/* So nha */}
                    <input
                        name="street"
                        id="street"
                        placeholder="Số nhà"
                        className="w-full appearance-none mt-4 p-3 px-5 text-gray-800 outline-none bg-gray-100 rounded-full text-2xl"
                    />

                    {/* Nhom mau */}
                    <div className="w-full flex-1">
                        <div className="mt-4 h-6 text-2xl font-semibold leading-8 text-gray-800 mb-4">Nhóm máu</div>
                        <select
                            className="my-2 rounded border border-gray-200 bg-white pt-3 pb-3 pl-2 block  w-full text-2xl text-gray-900  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none "
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.bloodGroup}
                            id="bloodGroup"
                            name="bloodGroup"
                        >
                            <option value="">Chọn nhóm máu</option>
                            <option value="o">O</option>
                            <option value="a">A</option>
                            <option value="b">B</option>
                            <option value="ab">AB</option>
                        </select>
                        {errors.bloodGroup && touched.bloodGroup ? (
                            <div className={cx('error')}>{errors.bloodGroup}</div>
                        ) : null}
                    </div>

                    <button
                        disabled={!(isValid && dirty)}
                        className={cx('btn-register')}
                        type="submit"
                        onClick={() => setOpenModal(true)}
                    >
                        Đăng ký
                    </button>
                </form>

                <hr />

                <p className={cx('footer')}>
                    Bạn đã có tài khoản?
                    <NavLink to="/login" className={cx('btn-login')}>
                        Đăng nhập
                    </NavLink>
                </p>
            </div>
            {openModal && <Modal toggleModal={handleToggleModal} status={status} message={message} />}
        </div>
    );
};

export default Register;
