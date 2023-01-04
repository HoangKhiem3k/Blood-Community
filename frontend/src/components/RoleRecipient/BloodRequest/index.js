import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { DOMAIN_BACKEND } from '../../../config/settingSystem';
import './BloodRequest.css'
import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
const ENDPOINT = DOMAIN_BACKEND;
var socket
function BloodRequest() {
  const [show, setShow] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false)
  const groupBlood = useSelector((state) => state.auth.login.currentUser.groupBlood);
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  useEffect(() => {
    socket = io(ENDPOINT)
    socket.emit('join_group_blood', currentUser)
    socket.on('connection', () => { setSocketConnected(true) })
    socket.emit('newUser', currentUser)
  }, [])

  const formik = useFormik({
    initialValues: {
      recipientId: currentUser.id,
      groupBlood: groupBlood,
      unitRequire: "",
      offerBenefit: '',
    },
    validationSchema: Yup.object({
      unitRequire: Yup.number().typeError('Số lượng máu phải là 1 số').required("Hãy nhập số lượng máu").positive("Số lượng máu phải lớn hơn 0").max(Number.MAX_SAFE_INTEGER, "Số lượng máu phải nhỏ hơn 9007199254740991"),
    }),
    onSubmit: async (values) => {
      let dataSubmit = {
        recipientId: currentUser.id,
        groupBlood: groupBlood,
        unitRequire: values.unitRequire,
        offerBenefit: values.offerBenefit,
      }
      const res = await axios.post(`${DOMAIN_BACKEND}/api/create-request`, dataSubmit)
      socket.emit('new_request_from_recipient', (res.data.content))
      setShow(false)
      toast.success("Tạo yêu cầu thành công")
    },
  });
  const handleClose = () => {
    setShow(false)
  };
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="block">
        <div className="right">
          <div className="two-button">
            <div className="Campaign-btn">
              <Button variant="primary" onClick={handleShow}>
                Tạo yêu cầu nhận máu
              </Button>
            </div>
          </div>
        </div>

      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="Campaign-Model">
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Tạo yêu cầu nhận máu</Modal.Title>
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
                        style={{border: '1px solid gray'}}
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
                        style={{border: '1px solid gray'}}
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
                <Button  onClick={handleClose}>
                  Đóng
                </Button>
              </div>
              <div className="save-btn">
                <Button variant="primary" type='Submit' onClick={formik.handleSubmit}>
                  Gửi
                </Button>
              </div>
            </Modal.Footer>
          </Modal>
        </div>

      </form>
    </>
  )
}
export default BloodRequest;
