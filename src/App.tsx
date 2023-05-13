import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectPokemons } from './Redux/pokemons/pokemonsSelectors';
import { SharedLayout } from './Components/SharedLayout/SharedLayout';
import { lazy } from 'react';
import { selectRandomPokemon } from './Redux/pokemonInfo/pokemonInfoSelectors';
import Pokemon from '../src/Pages/Pokemon/Pokemon';
import { selectPokemonDetails } from './Redux/pokemonInfo/pokemonInfoSelectors';
import NotFound from '../src/Pages/NotFound/NotFound';
import { selectSearchPokemons } from './Redux/pokemons/pokemonsSelectors';

const HomePage = lazy(() => import('../src/Pages/Home/Home'));
// const NotFoundPage = lazy(() => import('../src/Pages/NotFound/NotFound'));
const PokeDexPage = lazy(() => import('../src/Pages/PokeDex/PokeDex'));
// const PokemonPage = lazy(() => import('../src/Pages/Pokemon/Pokemon'));

export const App = () => {
  const randomPoke = useSelector(selectRandomPokemon);
  const pokeData = useSelector(selectPokemons);
  const pokeDetails = useSelector(selectPokemonDetails);
  const searchPokemon = useSelector(selectSearchPokemons);
  const handlePokeData = () => {
    console.log(pokeData);
  };

  return (
    <>
      <div>
        <button type="button" onClick={handlePokeData}>
          WHAT IN THE BOX
        </button>
        <button onClick={() => console.log(randomPoke)}>
          co tam w randomie slychac
        </button>
        <button onClick={() => console.log(pokeDetails)}>Pokemon detale</button>
        <button onClick={() => console.log(searchPokemon)}>
          Serach Pokemon co tam masz
        </button>
      </div>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomePage />} />
          <Route path="pokedex" element={<PokeDexPage />} />
          <Route path="pokemon/:id" element={<Pokemon />}></Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
