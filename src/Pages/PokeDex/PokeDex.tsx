import { Section } from '../../Components/Section/Section';
import css from './PokeDex.module.css';
import { UserShelf } from '../../Components/UserShelf/UserShelf';
import { nanoid } from '@reduxjs/toolkit';
import { useState } from 'react';
import { Shop } from '../../Components/Shop/Shop';
import { lazy } from 'react';
import { Suspense } from 'react';
import { PokeballLoader } from '../../Components/PokeballLoader/PokeballLoader';

const PokeNewsComponent = lazy(
  () => import('../../Components/PokeNews/PokeNews')
);
const BattleComponent = lazy(() => import('../../Components/Battle/Battle'));

const PokeDex = () => {
  const [isOpenShelf, setIsOpenShelf] = useState(false);
  const [isOpenStore, setIsOpenStore] = useState(false);
  const [isOpenBattle, setIsOpenBattle] = useState(false);

  const handleOnClickShelf = () => {
    setIsOpenShelf(prevState => !prevState);
    setIsOpenStore(false);
    setIsOpenBattle(false);
  };
  const handleOnCickStore = () => {
    setIsOpenStore(prevState => !prevState);
    setIsOpenShelf(false);
    setIsOpenBattle(false);
  };

  const handleOnCickBattle = () => {
    setIsOpenBattle(prevState => !prevState);
    setIsOpenShelf(false);
    setIsOpenStore(false);
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
        <li key={nanoid()}>
          <button
            className={css.listBtn}
            type="button"
            onClick={() => handleOnCickBattle()}
          >
            Battle vs AI
          </button>
        </li>
      </ul>
      <Section>
        <div className={css.userWrapper}>
          <Suspense fallback={<PokeballLoader />}>
            {isOpenShelf ? <UserShelf /> : null}
            {isOpenStore ? <Shop /> : null}
            {!isOpenShelf && !isOpenStore && !isOpenBattle && (
              <PokeNewsComponent />
            )}
            {isOpenBattle ? <BattleComponent /> : null}
          </Suspense>
        </div>
      </Section>
    </div>
  );
};

export default PokeDex;
