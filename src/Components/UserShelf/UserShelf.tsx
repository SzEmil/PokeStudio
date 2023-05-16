import { nanoid } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { PokemonCard } from '../PokemonCard/PokemonCard';
import { NavLink } from 'react-router-dom';
import css from './UserShelf.module.css';
import { selectAuthUser } from '../../Redux/auth/authSelectors';

export const UserShelf = () => {
  const cardsArr = useSelector(selectAuthUser);
  const cards = cardsArr.cards.slice(1);

  return cards.length === 0 ? (
    <p>You don't have any Pokémon in your shelf. Buy packs to get Pokémon</p>
  ) : (
    <ul className={css.list}>
      {cards.map((card: any) => (
        <li key={nanoid()} style={{ width: '400px' }}>
          <NavLink className={css.link} to={`/pokemon/${card.overview.id}`}>
            <PokemonCard pokemon={card} />
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
