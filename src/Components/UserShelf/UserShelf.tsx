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
import Notiflix from 'notiflix';
import { selectBattleUser } from '../../Redux/battle/battleSelectors';
import { setUserBattleCards } from '../../Redux/battle/battleSlice';
import { deleteUserBattleCards } from '../../Redux/battle/battleSlice';


export const UserShelf = () => {
  const cardsArr = useSelector(selectAuthUser);
  const cards = cardsArr.cards.slice(1);
  const battleUser = useSelector(selectBattleUser);
  const userCards = battleUser.cards;
  const dispatch: AppDispatch = useDispatch();
  const handleOnClickQuickSell = (id: number, ovrl: number) => {
    const price = calculatePrice(ovrl);
    dispatch(deleteCard({ id, price }));
    dispatch(deleteUserBattleCards(id));
  };

  const handleOnClickTakeForBattle = (id: number) => {
    if (battleUser.cards?.length! >= 3) {
      Notiflix.Notify.failure('You reach limit of pokemons for battle 3/3');
      return;
    }
    const battleCard = cards.find((card: any) => card.overview.id === id);
    console.log(battleCard);
    dispatch(setUserBattleCards(battleCard));
  };

  const handleOnClickUnPickPokemon = (id: number) => {
    dispatch(deleteUserBattleCards(id));
  };
  return cards.length === 0 ? (
    <p>You don't have any Pokémon in your shelf. Buy packs to get Pokémon</p>
  ) : (
    <ul className={css.list}>
      {cards.map((card: any) => (
        <li key={nanoid()} className={css.item}>
          <NavLink className={css.link} to={`/pokemon/${card.overview.id}`}>
            <PokemonCard pokemon={card} />
          </NavLink>
          <div className={css.btnBox}>
            <button
              className={`${css.btn} ${
                userCards
                  .map(card => card.overview!.name)
                  .includes(card.overview.name)
                  ? css.noActiveBtn
                  : ''
              }`}
              type="button"
              onClick={() =>
                handleOnClickQuickSell(
                  card.overview.id,
                  card.overview.base_experience
                )
              }
            >
              Quick Sell for {calculatePrice(card.overview.base_experience)}
            </button>
            <button
              className={`${css.btn} ${
                userCards
                  .map(card => card.overview!.name)
                  .includes(card.overview.name)
                  ? css.noActiveBtn
                  : ''
              }`}
              type="button"
              onClick={() => handleOnClickTakeForBattle(card.overview.id)}
            >
              Take for battle: {battleUser.cards?.length}/3
            </button>
            <button
              className={`${css.btn} ${
                !userCards
                  .map(card => card.overview!.name)
                  .includes(card.overview.name)
                  ? css.noActiveBtn
                  : ''
              }`}
              type="button"
              onClick={() => handleOnClickUnPickPokemon(card.overview.id)}
            >
              Unpick
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};
