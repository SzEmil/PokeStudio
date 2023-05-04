import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchRandomPokemon } from '../../Redux/pokemonInfo/pokemonInfoOperations';
import { AppDispatch } from '../../Redux/store';
import { selectRandomPokemon } from '../../Redux/pokemonInfo/pokemonInfoSelectors';
import { useSelector } from 'react-redux';
import { selectRandomPokemonIsLoading } from '../../Redux/pokemonInfo/pokemonInfoSelectors';
import css from './HotToday.module.css';

export const HotToday = () => {
  const dispatch: AppDispatch = useDispatch();

  function randomPokeId() {
    return Math.floor(Math.random() * 898) + 1;
  }

  // useEffect(() => {
  //   dispatch(fetchRandomPokemon(randomPokeId()));
  // }, [dispatch]);

  const hotPokemon: any = useSelector(selectRandomPokemon);
  const isRandomLoaded = useSelector(selectRandomPokemonIsLoading);
  return (
    <>
      {isRandomLoaded ? (
        <p>Loading random mob</p>
      ) : (
        <div className={css.wrapper}>
          <div className={css.card}>
            <h2>Hot Pokemon For Today!!</h2>
            <img
              className={css.image}
              src={hotPokemon?.sprites.other.home.front_default}
            />
            <h2>{hotPokemon?.name}</h2>
            <button onClick={() => console.log(hotPokemon)}>
              co tam w randomie slychac
            </button>
          </div>
        </div>
      )}
    </>
  );
};
