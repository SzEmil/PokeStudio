import { SearchForm } from '../../Components/SearchForm/SearchForm';
import { Section } from '../../Components/Section/Section';
import { useSelector } from 'react-redux';
import { selectAuthUser } from '../../Redux/auth/authSelectors';
import { PokemonCard } from '../../Components/PokemonCard/PokemonCard';
import css from './PokeDex.module.css';
import { nanoid } from '@reduxjs/toolkit';
import { NavLink } from 'react-router-dom';

const PokeDex = () => {
  const cardsArr = useSelector(selectAuthUser);
  const cards = cardsArr.cards.slice(1);

  return (
    <div className={css.pokeDex}>
      <Section>
        <SearchForm />
        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            width: '100%',
          }}
        >
          {cards.map((card: any) => (
            <li key={nanoid()} style={{ width: '400px' }}>
              <NavLink className={css.link} to={`/pokemon/${card.overview.id}`}>
                <PokemonCard pokemon={card} />
              </NavLink>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
};

export default PokeDex;
