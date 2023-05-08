import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchRandomPokemon } from '../../Redux/pokemonInfo/pokemonInfoOperations';
import { AppDispatch } from '../../Redux/store';
import { selectRandomPokemon } from '../../Redux/pokemonInfo/pokemonInfoSelectors';
import { useSelector } from 'react-redux';
import { selectRandomPokemonIsLoading } from '../../Redux/pokemonInfo/pokemonInfoSelectors';
import css from './HotToday.module.css';
import { selectRandomPokemonDate } from '../../Redux/pokemonInfo/pokemonInfoSelectors';
import { PokeballLoader } from '../PokeballLoader/PokeballLoader';
import { fetchMoreDetailsPokemon } from '../../Redux/pokemonInfo/pokemonInfoOperations';
import { selectisLoadingMoreInfo } from '../../Redux/pokemonInfo/pokemonInfoSelectors';
import { PokeCard } from '../PokeCard/PokeCard';

export const HotToday = () => {
  function getFormattedDate() {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear().toString();
    return `${day}-${month}-${year}`;
  }
  function randomPokeId() {
    return Math.floor(Math.random() * 898) + 1;
  }

  const dispatch: AppDispatch = useDispatch();
  const hotPokemon: any = useSelector(selectRandomPokemon);
  const isRandomLoaded = useSelector(selectRandomPokemonIsLoading);
  const isRandomMoreInfoLoaded = useSelector(selectisLoadingMoreInfo);
  const todayDate = getFormattedDate();
  const dateOfRandomPokemon = useSelector(selectRandomPokemonDate);

  const renderRandomPokemon = () => {
    if (hotPokemon.overview === null && hotPokemon.details === null) {
      dispatch(fetchRandomPokemon(randomPokeId()));
      return;
    } else if (
      hotPokemon.overview !== null &&
      hotPokemon.details !== null &&
      todayDate !== dateOfRandomPokemon
    ) {
      dispatch(fetchRandomPokemon(randomPokeId()));
      return;
    }
  };

  useEffect(() => {
    renderRandomPokemon();
  }, []);

  useEffect(() => {
    if (hotPokemon.overview === null) return;
    if (hotPokemon.details !== null) return;
    if (hotPokemon?.overview.species) {
      dispatch(fetchMoreDetailsPokemon(hotPokemon.overview.species.url));
    }
  }, [hotPokemon.overview, dispatch]);

  return (
    <>
      {isRandomLoaded ? (
        <PokeballLoader />
      ) : (
        <div className={css.wrapper}>
          {hotPokemon.overview === null ||
          isRandomMoreInfoLoaded ||
          hotPokemon.details === null ? (
            <p>loading data...</p>
          ) : (
            <>
              <PokeCard pokemon={hotPokemon} />
            </>
          )}
        </div>
      )}
    </>
  );
};
