import css from './PokeNews.module.css';
import { nanoid } from '@reduxjs/toolkit';
const PokeNews = () => {
  return (
    <div>
      <h2>PokeNews soon...</h2>
      <ul className={css.list}>
        <li key={nanoid()}>
          <div className={css.card}>
            <img
              className={css.image}
              src="https://cdn.pixabay.com/photo/2020/05/04/11/04/pokeball-5128709_960_720.jpg"
              alt="pic"
            ></img>
          </div>
        </li>

        <li key={nanoid()}>
          <div className={css.card}>
            <img
              className={css.image}
              src="https://cdn.pixabay.com/photo/2020/05/04/11/04/pokeball-5128709_960_720.jpg"
              alt="pic"
            ></img>
          </div>
        </li>

        <li key={nanoid()}>
          <div className={css.card}>
            <img
              className={css.image}
              src="https://cdn.pixabay.com/photo/2020/05/04/11/04/pokeball-5128709_960_720.jpg"
              alt="pic"
            ></img>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default PokeNews;
