import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../BloodRequest/BloodRequest.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DOMAIN_BACKEND } from '../../../config/settingSystem';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';
import { fetchRecipientRequest } from '../../../redux/actions/requestAction';
const ENDPOINT = DOMAIN_BACKEND;
var socket
function ModalUpdateRequest({ isOpenModalEdit, setOpenModalEdit }) {
  const [socketConnected, setSocketConnected] = useState(false)
  const requestUpdate = useSelector((state) => state.request?.requestUpdate)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const groupBlood = useSelector((state) => state.auth.login.currentUser.groupBlood);
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setOpenModalEdit(false);
  };
  useEffect(() => {
    socket = io(ENDPOINT)
    socket.emit('join_group_blood', currentUser)
    socket.on('connection', () => { setSocketConnected(true) })
  }, [])
  const formik = useFormik({
    initialValues: {
      recipientId: currentUser.id,
      groupBlood: groupBlood,
      unitRequire: requestUpdate.unitRequire,
      offerBenefit: requestUpdate.offerBenefit,
    },
    validationSchema: Yup.object({
      unitRequire: Yup.number().typeError('Số lượng máu phải là 1 số').required("Hãy nhập số lượng máu").positive("Số lượng máu phải lớn hơn 0").max(Number.MAX_SAFE_INTEGER, "Số lượng máu phải nhỏ hơn 9007199254740991"),
    }),
    onSubmit: async (values) => {
      let dataUpdate = {
        id: requestUpdate.id,
        unitRequire: values.unitRequire,
        offerBenefit: values.offerBenefit
      }
      await axios.put(`${DOMAIN_BACKEND}/api/update-request`, dataUpdate)
      dispatch(fetchRecipientRequest(currentUser.id))
      socket.emit('recipient_delete_request', (dataUpdate));
      setOpenModalEdit(false)
      toast.success("Cập nhật thành công!")
    },
  });
  useEffect(() => {
    setShow(isOpenModalEdit)
  }, [])
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="Campaign-Model">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Cập nhật yêu cầu nhận máu</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ul className="menu-list">
              <li className="menu-item">
                <div className="Shared input-name">
                  <div>
                    <span>Số lượng máu cần(ml):</span>
                  </div>
                  <div className="vali-form">
                    <input
                      type="text"
                      name="unitRequire"
                      placeholder="Hãy nhập số lượng máu:"
                      value={formik.values.unitRequire}
                      onChange={formik.handleChange}
                      style={{ border: '1px solid gray' }}
                    />
                    {formik.errors.unitRequire && (
                      <p style={{ color: 'red' }}>
                        {formik.errors.unitRequire}
                      </p>
                    )}
                  </div>
                </div>
              </li>
              <li className="menu-item">
                <div className="Shared input-name">
                  <div>
                    <span>Hỗ trợ người hiến máu:</span>
                  </div>
                  <div className="vali-form">
                    <input
                      type="text"
                      name="offerBenefit"
                      placeholder="Hỗ trợ cho người hiến máu:"
                      value={formik.values.offerBenefit}
                      onChange={formik.handleChange}
                      style={{ border: '1px solid gray' }}
                    />
                    {formik.errors.offerBenefit && (
                      <p style={{ color: 'red' }}>
                        {formik.errors.offerBenefit}
                      </p>
                    )}
                  </div>
                </div>
              </li>
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <div className="close-btn">
              <Button onClick={handleClose}>
                Đóng
              </Button>
            </div>
            <div className="save-btn">
              <Button variant="primary" type='Submit' onClick={formik.handleSubmit}>
                Lưu
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>

    </form>
  );
}

export default ModalUpdateRequest


