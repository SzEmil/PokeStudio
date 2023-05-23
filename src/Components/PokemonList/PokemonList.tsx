import { useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { PokeFront } from '../pokeFront/pokeFront';
import { selectIsLoading } from '../../Redux/pokemons/pokemonsSelectors';
import css from './PokemonList.module.css';
import { PokeballLoader } from '../PokeballLoader/PokeballLoader';
import { useState } from 'react';
import { BtnMoveScroll } from '../BtnMoveScroll/BtnMoveScroll';
import { Pokemon } from '../../Redux/pokemons/pokemonsSlice';
import { selectFilterInput } from '../../Redux/filter/filterSelectors';

type PokemonListPropsType = {
  pokemons: Pokemon[];
};

export const PokemonList = ({ pokemons }: PokemonListPropsType) => {
  const isLoading = useSelector(selectIsLoading);
  const [listCounter, setListCounter] = useState(12);
  const filterInput = useSelector(selectFilterInput);
  const slicedPokemons = pokemons.slice(0, listCounter);

  const handleOnClick = () => {
    setListCounter(prevVal => (prevVal += 12));
  };
  return (
    <>
      {isLoading ? (
        <PokeballLoader />
      ) : (
        <div className={css.listBox}>
          <ul className={css.list}>
            {slicedPokemons.length !== 0 ? (
              slicedPokemons?.map(pokemon => (
                <li key={nanoid()} className={css.item}>
                  <PokeFront pokemon={pokemon} />
                </li>
              ))
            ) : (
              <div className={css.notFound}>
                <p>There is no pokemon named: "{filterInput}".</p>
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
