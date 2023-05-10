import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchPokemonById } from '../../Redux/pokemonInfo/pokemonInfoOperations';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../Redux/store';
import { useSelector } from 'react-redux';
import {
  selectPokemonDetails,
  selectRandomPokemonIsLoading,
  selectisLoadingMoreInfo,
} from '../../Redux/pokemonInfo/pokemonInfoSelectors';
import { fetchPokemonInfo } from '../../Redux/pokemonInfo/pokemonInfoOperations';
import css from './Pokemon.module.css';
import { PokemonCard } from '../../Components/PokemonCard/PokemonCard';
import { Section } from '../../Components/Section/Section';

const Pokemon = () => {
  const dispatch: AppDispatch = useDispatch();
  const pokemon: any = useSelector(selectPokemonDetails);
  const { id } = useParams();
  const isRandomLoaded = useSelector(selectRandomPokemonIsLoading);
  const isRandomMoreInfoLoaded = useSelector(selectisLoadingMoreInfo);

  useEffect(() => {
    dispatch(fetchPokemonById(id));
  }, []);

  useEffect(() => {
    if (pokemon.overview === null) return;
    if (pokemon?.overview.species) {
      dispatch(fetchPokemonInfo(pokemon.overview.species.url));
    }
  }, [pokemon.overview, dispatch]);

  return (
    <>
      {isRandomLoaded ? (
        <p>Loading component</p>
      ) : (
        <Section>
          <div className={css.wrapper}>
            {pokemon.overview === null ||
            isRandomMoreInfoLoaded ||
            pokemon.details === null ? (
              <p>Loading more data...</p>
            ) : (
              <div className={css.pokemonWrapper}>
                <div className={css.cardWrapper}>
                  <PokemonCard pokemon={pokemon} />
                </div>
                <div className={css.descriptionBox}>
                  {pokemon.details.flavor_text_entries
                    .filter(
                      (
                        item: ReturnType<typeof pokemon.details>,
                        index: number,
                        self: any
                      ) =>
                        item.language.name === 'en' &&
                        self.findIndex(
                          (t: any) => t.flavor_text === item.flavor_text
                        ) === index
                    )
                    .map(
                      (
                        entry: ReturnType<typeof pokemon.details>,
                        index: number
                      ) => {
                        if (index % 2 === 0) {
                          return (
                            <p key={index} className={css.descriptionText}>
                              {entry.flavor_text}
                            </p>
                          );
                        } else {
                          return null;
                        }
                      }
                    )}
                </div>
              </div>
            )}
          </div>
        </Section>
      )}
    </>
  );
};

export default Pokemon;
//`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`
//https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png
