import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchPokemonById } from '../../Redux/pokemonInfo/pokemonInfoOperations';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../Redux/store';
import { useSelector } from 'react-redux';
import { selectPokemonDetails } from '../../Redux/pokemonInfo/pokemonInfoSelectors';
const Pokemon = () => {
  const dispatch: AppDispatch = useDispatch();
  const pokemon = useSelector(selectPokemonDetails);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchPokemonById(id));
  }, []);

  return (
    <>
      {pokemon.overview === null ? (
        <p>Loading component</p>
      ) : (
        <div>
          {id}
          <h2>{pokemon.overview!.name}</h2>
        </div>
      )}
    </>
  );
};

export default Pokemon;
