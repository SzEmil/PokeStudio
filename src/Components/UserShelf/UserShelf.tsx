import { nanoid } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { PokemonCard } from '../PokemonCard/PokemonCard';
import { NavLink } from 'react-router-dom';
import css from './UserShelf.module.css';
import { selectAuthUser } from '../../Redux/auth/authSelectors';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../Redux/store';
import { calculatePrice } from '../BtnQuickSellCard/BtnQuickSellCard';
import { deleteCard } from '../../Redux/auth/authOperations';

export const UserShelf = () => {
  const cardsArr = useSelector(selectAuthUser);
  const cards = cardsArr.cards.slice(1);
  const dispatch: AppDispatch = useDispatch();
  const handleOnClick = (id: number, ovrl: number) => {
    const price = calculatePrice(ovrl);
    console.log('rozpoczeto quickSell');
    dispatch(deleteCard({ id, price }));
  };

  return cards.length === 0 ? (
    <p>You don't have any Pokémon in your shelf. Buy packs to get Pokémon</p>
  ) : (
    <ul className={css.list}>
      {cards.map((card: any) => (
        <li key={nanoid()} style={{ width: '400px' }} className={css.item}>
          <NavLink className={css.link} to={`/pokemon/${card.overview.id}`}>
            <PokemonCard pokemon={card} />
          </NavLink>
          <div className={css.btnBox}>
            <button
              className={css.btn}
              type="button"
              onClick={() =>
                handleOnClick(card.overview.id, card.overview.base_experience)
              }
            >
              Quick Sell for {calculatePrice(card.overview.base_experience)}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};
