import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchRandomPokemon } from '../../Redux/pokemonInfo/pokemonInfoOperations';
import { AppDispatch } from '../../Redux/store';
import { selectRandomPokemon } from '../../Redux/pokemonInfo/pokemonInfoSelectors';
import { useSelector } from 'react-redux';
import { selectRandomPokemonIsLoading } from '../../Redux/pokemonInfo/pokemonInfoSelectors';

export const HotToday = () => {
  const dispatch: AppDispatch = useDispatch();

  function randomPokeId() {
    return Math.floor(Math.random() * 898) + 1;
  }

  useEffect(() => {
    dispatch(fetchRandomPokemon(randomPokeId()));
  }, [dispatch]);

  const hotPokemon: any = useSelector(selectRandomPokemon);
  const isRandomLoaded = useSelector(selectRandomPokemonIsLoading);
  return (
    <>
      {isRandomLoaded ?(
        <p>Loading random mob</p>
      ) : (
        <div>
          <h2>{hotPokemon?.name}</h2>
          <button onClick={() => console.log(hotPokemon)}>
            co tam w randomie slychac
          </button>
          <img src={hotPokemon?.sprites.other.home.front_default} />
        </div>
      )}
    </>
  );
};
