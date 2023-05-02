// import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchPokemons } from './Redux/pokemons/pokemonsOperations';
import { useSelector } from 'react-redux';
import { selectPokemons } from './Redux/pokemons/pokemonsSelectors';
import { nanoid } from '@reduxjs/toolkit';
import { AppDispatch } from './Redux/store';

export const App = () => {
  const dispatch: AppDispatch = useDispatch();

  const handleOnClick = () => {
    dispatch(fetchPokemons());
  };
  const pokeData = useSelector(selectPokemons);

  console.log(pokeData);

  const handlePokeData = () => {
    console.log(pokeData);
  };

  // const handlePokeIndex = (url:string)=>{
  //   return url
  // }
  return (
    <>
      <div>
        <button type="button" onClick={handleOnClick}>
          FETCH POKEMONS
        </button>
        <button type="button" onClick={handlePokeData}>
          WHAT IN THE BOX
        </button>
      </div>
      <ul>
        {pokeData.length !== 0 ? (
          pokeData?.map(pokemon => <li key={nanoid()}>{pokemon.name}</li>)
        ) : (
          <p> Poke Array is null </p>
        )}
      </ul>
    </>
  );
};
