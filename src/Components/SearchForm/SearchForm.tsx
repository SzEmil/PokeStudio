import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../Redux/store';
import { fetchPokemonByName } from '../../Redux/pokemons/pokemonsOperations';
import { FormEvent } from 'react';

export const SearchForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const input = (
      form.elements.namedItem('pokeName') as HTMLInputElement
    ).value.toLowerCase();
    console.log(input);
    form.reset();
    dispatch(fetchPokemonByName(input));
  };
  return (
    <form onSubmit={handleOnSubmit}>
      <input
        type="text"
        placeholder="Search pokemon by name or id"
        name="pokeName"
      />
      <button type="submit">Search</button>
    </form>
  );
};
