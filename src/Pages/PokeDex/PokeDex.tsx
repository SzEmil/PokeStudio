import { Section } from '../../Components/Section/Section';
import css from './PokeDex.module.css';
import { UserShelf } from '../../Components/UserShelf/UserShelf';
import { nanoid } from '@reduxjs/toolkit';
import { useState } from 'react';
const PokeDex = () => {
  const [isOpenShelf, setIsOpenShelf] = useState(false);

  return (
    <div className={css.pokeDex}>
      <ul className={css.list}>
        <li key={nanoid()}>
          <button
            className={css.listBtn}
            type="button"
            onClick={() => setIsOpenShelf(prevState => !prevState)}
          >
            Shelf
          </button>
        </li>
        <li key={nanoid()}>
          <button className={css.listBtn} type="button">
            Store
          </button>
        </li>
      </ul>
      <Section>
        <div className={css.userWrapper}>
          {isOpenShelf ? <UserShelf /> : null}
        </div>
      </Section>
    </div>
  );
};

export default PokeDex;
