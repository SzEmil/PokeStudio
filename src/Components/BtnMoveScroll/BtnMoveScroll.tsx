import css from './BtnMoveScroll.module.css';
import { HiOutlineChevronUp, HiOutlineChevronDown } from 'react-icons/hi2';

type BtnMoveScrollPropsType = {
  btnType: 'up' | 'down';
};

export const BtnMoveScroll = ({ btnType }: BtnMoveScrollPropsType) => {
  const handleClick = () =>
    window.scrollTo({
      top: btnType === 'up' ? 0 : document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  return (
    <button
      className={css.btn}
      type="button"
      onClick={handleClick}
      aria-label={btnType === 'up' ? 'Scroll to top' : 'Scroll to bottom'}
    >
      {btnType === 'up' ? <HiOutlineChevronUp size={18} /> : <HiOutlineChevronDown size={18} />}
    </button>
  );
};
