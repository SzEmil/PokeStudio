import { HotToday } from '../../Components/HotToday/HotToday';
import { PokemonList } from '../../Components/PokemonList/PokemonList';
import { SearchBar } from '../../Components/SearchBar/SearchBar';
const Home = () => {
  return (
    <>
      <SearchBar />
      <PokemonList />
      <HotToday />
    </>
  );
};

export default Home;
