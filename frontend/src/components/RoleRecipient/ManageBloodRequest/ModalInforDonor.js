import React from "react";
import styles from "./ModalInforDonor.module.css";
import { RiCloseLine } from "react-icons/ri";

const ModalInforDonor = ({ setIsOpen, inforDonor }) => {
  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>Thông tin người hiến máu</h5>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className={styles.modalContent}>
            <p>Họ tên: {inforDonor.firstName + ' ' + inforDonor.lastName}</p>
            <p>Email: {inforDonor.email}</p>
            <p>Giới tính: {inforDonor.gender}</p>
            <p>Số điện thoại: {inforDonor.phoneNumber}</p>
            <p>Nhóm máu: {inforDonor.groupBlood}</p>
            <p>Ngày sinh: {inforDonor.birthday}</p>
          </div>

        </div>
      </div>
    </>
  )
};

export default ModalInforDonor;