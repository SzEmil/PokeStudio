import { useSelector } from 'react-redux';
import { PokeFront } from '../pokeFront/pokeFront';
import { selectIsLoading } from '../../Redux/pokemons/pokemonsSelectors';
import css from './PokemonList.module.css';
import { PokeballLoader } from '../PokeballLoader/PokeballLoader';
import { useState } from 'react';
import { BtnMoveScroll } from '../BtnMoveScroll/BtnMoveScroll';
import { Pokemon } from '../../Redux/pokemons/pokemonsSlice';
import { selectFilterInput } from '../../Redux/filter/filterSelectors';
import { Button } from '../UI/Button';
import { HiOutlineArrowDown } from 'react-icons/hi2';

type PokemonListPropsType = {
  pokemons: Pokemon[];
  pageSize?: number;
};

export const PokemonList = ({ pokemons, pageSize = 24 }: PokemonListPropsType) => {
  const isLoading = useSelector(selectIsLoading);
  const [listCounter, setListCounter] = useState(pageSize);
  const filterInput = useSelector(selectFilterInput);
  const slicedPokemons = pokemons.slice(0, listCounter);

  if (isLoading && pokemons.length === 0) {
    return <PokeballLoader label="Loading Pokédex" />;
  }

  return (
    <div className={css.listBox}>
      {slicedPokemons.length !== 0 ? (
        <ul className={css.list}>
          {slicedPokemons.map((pokemon, i) => (
            <li key={pokemon.url || pokemon.name} className={css.item}>
              <PokeFront pokemon={pokemon} index={i % pageSize} />
            </li>
          ))}
        </ul>
      ) : (
        <div className={css.notFound}>
          <h3>No Pokémon match "{filterInput}"</h3>
          <p>Try another name or clear the filter.</p>
        </div>
      )}

      {slicedPokemons.length < pokemons.length && (
        <div className={css.btnBox}>
          <Button
            variant="ghost"
            size="md"
            onClick={() => setListCounter(prev => prev + pageSize)}
            iconRight={<HiOutlineArrowDown />}
          >
            Load more — {pokemons.length - slicedPokemons.length} left
          </Button>
        </div>
      )}

      <div className={css.btnScrollWrapper}>
        <BtnMoveScroll btnType="up" />
        <BtnMoveScroll btnType="down" />
      </div>
    </div>
  );
};
