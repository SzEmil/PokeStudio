import { useSelector } from 'react-redux';
import { selectFilteredPokemons } from '../../Redux/pokemons/pokemonsSelectors';
import { nanoid } from '@reduxjs/toolkit';
import { PokeCard } from '../pokeCard/pokeCard';
import { selectIsLoading } from '../../Redux/pokemons/pokemonsSelectors';
import css from './PokemonList.module.css';
import { ColorRing } from 'react-loader-spinner';
import { PokeballLoader } from '../PokeballLoader/PokeballLoader';

export const PokemonList = () => {
  const pokeData = useSelector(selectFilteredPokemons);
  const isLoading = useSelector(selectIsLoading);
  return (
    <>
      {isLoading ? (
        <PokeballLoader />
      ) : (
        <ul className={css.list}>

          {pokeData.length !== 0 ? (
            pokeData?.map(pokemon => (
              <li key={nanoid()}>
                <PokeCard pokemon={pokemon} />
              </li>
            ))
          ) : (
            <p> Poke Array is null </p>
          )}
        </ul>
      )}
    </>
  );
};
