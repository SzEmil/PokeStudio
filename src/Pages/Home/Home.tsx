import { HotToday } from '../../Components/HotToday/HotToday';
import { PokemonList } from '../../Components/PokemonList/PokemonList';
import { SearchBar } from '../../Components/SearchBar/SearchBar';
import { Section } from '../../Components/Section/Section';
import { useEffect } from 'react';
import css from './Home.module.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../Redux/store';
import { fetchPokemons } from '../../Redux/pokemons/pokemonsOperations';
import { useSelector } from 'react-redux';
import { selectPokemons } from '../../Redux/pokemons/pokemonsSelectors';
import { selectFilteredPokemons } from '../../Redux/pokemons/pokemonsSelectors';
const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const pokeList = useSelector(selectPokemons);

  const pokeData = useSelector(selectFilteredPokemons);
  const fetchStartData = () => {
    if (pokeList.length !== 0) return;
    if (pokeList.length === 0) return dispatch(fetchPokemons());
  };

  useEffect(() => {
    fetchStartData();
  }, []);

  return (
    <>
      <Section>
        <div className={css.wrapper}>
          <div className={css.pokeList}>
            <div className={css.searchBar}>
              <SearchBar filterType="home" />
            </div>
            <div className={css.pokemonList}>
              <PokemonList pokemons={pokeData} />
            </div>
          </div>
          <div className={css.hotPokemon}>
            <HotToday />
          </div>
        </div>
      </Section>
    </>
  );
};

export default Home;
