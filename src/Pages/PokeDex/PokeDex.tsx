import { Section } from '../../Components/Section/Section';
import css from './PokeDex.module.css';
import { UserShelf } from '../../Components/UserShelf/UserShelf';
import { nanoid } from '@reduxjs/toolkit';
import { useState } from 'react';
import { Shop } from '../../Components/Shop/Shop';

const PokeDex = () => {
  const [isOpenShelf, setIsOpenShelf] = useState(false);
  const [isOpenStore, setIsOpenStore] = useState(false);

  const handleOnClickShelf = () => {
    setIsOpenShelf(prevState => !prevState);
    setIsOpenStore(false);
  };
  const handleOnCickStore = () => {
    setIsOpenStore(prevState => !prevState);
    setIsOpenShelf(false);
  };
  return (
    <div className={css.pokeDex}>
      <ul className={css.list}>
        <li key={nanoid()}>
          <button
            className={css.listBtn}
            type="button"
            onClick={() => handleOnClickShelf()}
          >
            Shelf
          </button>
        </li>
        <li key={nanoid()}>
          <button
            className={css.listBtn}
            type="button"
            onClick={() => handleOnCickStore()}
          >
            Store
          </button>
        </li>
      </ul>
      <Section>
        <div className={css.userWrapper}>
          {isOpenShelf ? <UserShelf /> : null}
          {isOpenStore ? <Shop /> : null}
        </div>
      </Section>
    </div>
  );
};

export default PokeDex;
