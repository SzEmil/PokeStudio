import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchPokemons } from './Redux/pokemons/pokemonsOperations';
import { useSelector } from 'react-redux';
import {
  selectPokemons,
} from './Redux/pokemons/pokemonsSelectors';
import { AppDispatch } from './Redux/store';
import { SharedLayout } from './Components/SharedLayout/SharedLayout';
import { lazy } from 'react';

const HomePage = lazy(() => import('../src/Pages/Home/Home'));

export const App = () => {
  const dispatch: AppDispatch = useDispatch();

  const handleOnClick = () => {
    dispatch(fetchPokemons());
  };
  const pokeData = useSelector(selectPokemons);

  const handlePokeData = () => {
    console.log(pokeData);
  };

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
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </>
  );
};
