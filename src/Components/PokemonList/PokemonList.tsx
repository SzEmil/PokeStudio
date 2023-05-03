import { useSelector } from 'react-redux';
import { selectFilteredPokemons } from '../../Redux/pokemons/pokemonsSelectors';
import { nanoid } from '@reduxjs/toolkit';
import { PokeCard } from '../pokeCard/pokeCard';
import { selectIsLoading } from '../../Redux/pokemons/pokemonsSelectors';
import css from './PokemonList.module.css';
import { ColorRing } from 'react-loader-spinner';

export const PokemonList = () => {
  const pokeData = useSelector(selectFilteredPokemons);
  const isLoading = useSelector(selectIsLoading);
  return (
    <>
      {isLoading ? (
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
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
