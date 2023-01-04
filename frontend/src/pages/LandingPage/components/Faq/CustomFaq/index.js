import styles from './CustomFaq.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleDown, faChevronCircleUp } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function CustomFaq({ id, question, answer }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggleFaq = () => setIsOpen(!isOpen);

    return (
        <div className={cx('faq-item')} onClick={handleToggleFaq}>
            <div className={cx('header')}>
                <h2 className={cx('question')}>
                    {id}. {question}
                </h2>
                <span className={cx('icon')}>
                    {isOpen ? (
                        <FontAwesomeIcon icon={faChevronCircleUp} />
                    ) : (
                        <FontAwesomeIcon icon={faChevronCircleDown} />
                    )}
                </span>
            </div>

            <div
                className={cx('answer', {
                    [styles.show]: isOpen,
                })}
            >
                {answer.map((item, index) => {
                    return <p key={index}>{item}</p>;
                })}
            </div>
        </div>
    );
}

export default CustomFaq;
