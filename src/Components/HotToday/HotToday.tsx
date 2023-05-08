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
import { nanoid } from '@reduxjs/toolkit';
import { fetchMoreDetailsPokemon } from '../../Redux/pokemonInfo/pokemonInfoOperations';
import { selectisLoadingMoreInfo } from '../../Redux/pokemonInfo/pokemonInfoSelectors';

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

  const handleGrowFirstLetter = (name: string) => {
    const bigLetter = name[0].toUpperCase();
    return name.replace(bigLetter.toLocaleLowerCase(), bigLetter);
  };

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
              <div className={css.cardBox}>
                <div className={css.titleBox}>
                  <h2 className={css.title}>Pokemon of a day</h2>
                </div>
                <div
                  className={css.card}
                  style={{
                    background: `radial-gradient(circle,${hotPokemon?.details.color.name} 10%,rgba(255, 255, 255, 0) 87%)`,
                  }}
                >
                  <div className={css.headBar}>
                    <h2 className={css.name}>
                      {handleGrowFirstLetter(hotPokemon?.overview?.name)}
                      <span className={css.nameTag}>
                        #{hotPokemon?.overview?.id}
                      </span>
                    </h2>
                    <div>
                      <ul>
                        {hotPokemon?.overview.types.map(
                          (type: { type: { name: string } }) => (
                            <li key={`${type.type.name}+${nanoid()}`}>
                              {type.type.name}
                            </li>
                          )
                        )}
                      </ul>
                      <span>{hotPokemon?.overview.base_experience}</span>
                    </div>
                  </div>
                  <img
                    className={css.image}
                    src={hotPokemon?.overview.sprites.other.home.front_default}
                  />
                  <div className={css.description}>
                    <p className={css.descriptionText}>
                      {
                        hotPokemon.details.flavor_text_entries.find(
                          (item: ReturnType<typeof hotPokemon.details>) =>
                            item.language.name === 'en'
                        ).flavor_text
                      }
                    </p>
                  </div>
                  <div className={css.overview}>
                    <div>
                      <h2 className={css.overviewTitle}>Statistics</h2>
                      <ul className={css.stats}>
                        {hotPokemon?.overview.stats.map(
                          (stat: ReturnType<typeof hotPokemon>) => (
                            <li key={nanoid()}>
                              <p className={css.statsText}>
                                {stat.stat.name}:{' '}
                                <span className={css.statsTextOvrl}>
                                  {stat.base_stat}
                                </span>
                              </p>
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    <div>
                      <h2 className={css.overviewTitle}>Abilities</h2>
                      <ul className={css.abilities}>
                        {hotPokemon?.overview.abilities.map(
                          (
                            ability: ReturnType<
                              typeof hotPokemon.overview.abilities
                            >
                          ) => (
                            <li className={css.ability}>
                              <p
                                className={css.abilitiesText}
                                style={{
                                  backgroundColor: `${hotPokemon?.details.color.name}`,
                                }}
                              >
                                {ability.ability.name}
                              </p>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
