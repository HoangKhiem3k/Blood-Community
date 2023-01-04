import React from 'react'
import './ForgotPassword.css'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { DOMAIN_BACKEND } from '../../config/settingSystem';
import { useDispatch } from 'react-redux';
import { turnOffLoader, turnOnLoader } from '../../redux/actions/loaderAction';

export default function ForgotPassword() {
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Email không đúng định dạng!').required("Hãy nhập email!"),
    }),
    onSubmit: async (values) => {
      console.log("email...." , values.email)
      const data = {email: values.email}
      try{
        dispatch(turnOnLoader())
        const res = await axios.post(`${DOMAIN_BACKEND}/api/reset-password` , data)
        if(res.data.statusCode === 200){
          dispatch(turnOffLoader())
          toast.success("Hãy kiểm tra email của bạn để tiếp tục!")
        }
      }catch(e) {
        dispatch(turnOffLoader())
        toast.error("Email này không tồn tại trong hệ thống!")
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='fg-container'>
        <div className='fg-form1'>
          <h1>Đặt lại mật khẩu</h1>
          <p>Hãy nhập chính xác email của bạn.</p>
          <input type='text' name='email' value={formik.values.email}
            onChange={formik.handleChange} placeholder='Nhập email'></input>
          {formik.errors.email && (
            <p style={{ color: 'red' }}>
              {formik.errors.email}
            </p>
          )}
          <button type='Submit' onClick={formik.handleSubmit}>Tiếp tục</button>
        </div>
      </div>
    </form>
  )
}
