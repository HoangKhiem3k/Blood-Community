import styles from './Faq.module.scss';
import classNames from 'classnames/bind';
import { faq } from '../../../../services/data';
import CustomFaq from './CustomFaq';

const cx = classNames.bind(styles);

function Faq() {
    return (
        <div id='faq' className={cx('wrapper')}>
            <div className={cx('container')}>
                <h2>Các câu hỏi thường gặp</h2>
                {faq.map((item, index) => {
                    return <CustomFaq {...item} key={index}/>;
                })}
            </div>
        </div>
    );
}

export default Faq;
