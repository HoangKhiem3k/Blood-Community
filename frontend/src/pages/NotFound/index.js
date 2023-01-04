import { requirePropFactory } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './NotFound.css'
function NotFound() {
  const navigate = useNavigate()
  return (
    <div>
      <div className="logo-brand">
        <a href="#">
          <img src={require('../../assets/images/BC_logo.png')} alt="Blood bank logo" />
        </a>
        <p>
          <a href="#">Blood Community</a>
        </p>
      </div>
      <div className="Notfound_content">
        <h2>404</h2>
        <h1>Không tìm thấy nội dung 😓</h1>
        <ul>
          <li className="NotFound_suggestion-msg">URL của nội dung này đã
            <strong>bị thay đổi</strong> hoặc <strong>không còn tồn tại</strong>.
          </li>
          <li className="NotFound_suggestion-msg">Nếu bạn
            <strong>đang lưu URL này</strong>, hãy thử <strong>truy cập lại từ trang chủ</strong>
            thay vì dùng URL đã lưu.
          </li>
        </ul>
        <p>
          <a className="Button_home" href="/">Truy cập trang chủ</a>
        </p>
      </div>
    </div>

  );
}

export default NotFound;
