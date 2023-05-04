import { HotToday } from '../../Components/HotToday/HotToday';
import { PokemonList } from '../../Components/PokemonList/PokemonList';
import { SearchBar } from '../../Components/SearchBar/SearchBar';
import { Section } from '../../Components/Section/Section';
import css from './Home.module.css';
const Home = () => {
  return (
    <>
      <Section>
        <div className={css.wrapper}>
          <div className={css.pokeList}>
            <SearchBar />
            <PokemonList />
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
