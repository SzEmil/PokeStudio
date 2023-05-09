import css from './BtnMoveScroll.module.css';

type BtnMoveScrollPropsType = {
  btnType: string;
};

export const BtnMoveScroll = ({ btnType }: BtnMoveScrollPropsType) => {
  const handleOnClickMoveUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  const handleOnClickMoveDown = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };
  return (
    <div>
      {btnType === 'up' && (
        <button
          className={css.btnUp}
          type="button"
          onClick={handleOnClickMoveUp}
        >
          ^
        </button>
      )}
      {btnType === 'down' && (
        <button
          className={css.btnDown}
          type="button"
          onClick={handleOnClickMoveDown}
        >
          ^
        </button>
      )}
      {btnType !== 'down' && btnType !== 'up' && (
        <p>Wrong button type! Allowed is down or up</p>
      )}
    </div>
  );
};
