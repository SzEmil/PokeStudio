import { useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { PokeFront } from '../pokeFront/pokeFront';
import { selectIsLoading } from '../../Redux/pokemons/pokemonsSelectors';
import css from './PokemonList.module.css';
import { PokeballLoader } from '../PokeballLoader/PokeballLoader';
import { useDispatch } from 'react-redux';
import { fetchPokemons } from '../../Redux/pokemons/pokemonsOperations';
import { AppDispatch } from '../../Redux/store';
import { useState } from 'react';
import { BtnMoveScroll } from '../BtnMoveScroll/BtnMoveScroll';
import { Pokemon } from '../../Redux/pokemons/pokemonsSlice';

type PokemonListPropsType = {
  pokemons: Pokemon[];
};

export const PokemonList = ({ pokemons }: PokemonListPropsType) => {
  const dispatch: AppDispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const [listCounter, setListCounter] = useState(12);

  const handleOnClick = async () => {
    await dispatch(fetchPokemons(listCounter));
    setListCounter(prevVal => (prevVal += 12));
  };
  return (
    <>
      {isLoading ? (
        <PokeballLoader />
      ) : (
        <div className={css.listBox}>
          <ul className={css.list}>
            {pokemons.length !== 0 ? (
              pokemons?.map(pokemon => (
                <li key={nanoid()}>
                  <PokeFront pokemon={pokemon} />
                </li>
              ))
            ) : (
              <div>
                Loading data...
                <PokeballLoader />
              </div>
            )}
          </ul>
          <div className={css.btnBox}>
            <button className={css.btn} type="button" onClick={handleOnClick}>
              Load more
            </button>
          </div>

          <div className={css.btnScrollWrapper}>
            <div>
              <BtnMoveScroll btnType="up" />
            </div>
            <div className={css.btnMoveScrollBox}>
              <BtnMoveScroll btnType="down" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

