import React from 'react'
import './ForgotPasswordAgain.css'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { DOMAIN_BACKEND } from '../../config/settingSystem';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ForgotPasswordAgain() {
  const location = useLocation();
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(location.search);
  const token = urlParams.get('token');
  const email = urlParams.get('email');
  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required('Vui lòng nhập passwords!')
        .matches(
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{8,}$/,
          'Mật khẩu phải có ít nhất 8 ký tự, bao gồm ít nhất 1 chữ cái, 1 số và 1 ký tự đặc biệt',
        ),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp')
    }),
    onSubmit: async (values) => {
      const data = {
        email, token, password: values.password
      }
      try {
        const res = await axios.post(`${DOMAIN_BACKEND}/api/verify-reset-password`, data)
        if (res.data.statusCode === 200) {
          toast.success("Đặt lại mật khẩu thành công")
          navigate('/login')
        }
      } catch (e) {
        toast.error("Xác thực thất bại!")
      }
    }
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='fg-container'>
        <div className='fg-form'>
          <h1>Đặt lại mật khẩu</h1>
          <p>Hãy nhập mật khẩu bạn muốn.</p>
          <input type='password' name='password' value={formik.values.password}
            onChange={formik.handleChange} placeholder='Nhập mật khẩu'></input>
          {formik.errors.password && (
            <p style={{ color: 'red', maxWidth: "70%" }}>
              {formik.errors.password}
            </p>
          )}
          <input type='password' name='passwordConfirmation' value={formik.values.passwordConfirmation}
            onChange={formik.handleChange} placeholder='Nhập lại mật khẩu'></input>
          {formik.errors.passwordConfirmation && (
            <p style={{ color: 'red', maxWidth: "70%" }}>
              {formik.errors.passwordConfirmation}
            </p>
          )}
          <button type='Submit' onClick={formik.handleSubmit}>Tiếp tục</button>
        </div>
      </div>
    </form>
  )
}
