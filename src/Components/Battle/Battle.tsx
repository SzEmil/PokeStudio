import css from './Battle.module.css';
import { useSelector } from 'react-redux';
import { selectBattleUser } from '../../Redux/battle/battleSelectors';
import { nanoid } from '@reduxjs/toolkit';
import { selectPokemons } from '../../Redux/pokemons/pokemonsSelectors';
import { PokeFront } from '../pokeFront/pokeFront';
import { selectBattleComputer } from '../../Redux/battle/battleSelectors';
import { selectAuthUser } from '../../Redux/auth/authSelectors';
import { fetchAIPokemons } from '../../Redux/battle/battleOperations';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../Redux/store';

const Battle = () => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector(selectBattleUser);
  const userCards = user.cards;
  const battleComputer = useSelector(selectBattleComputer);
  const userData = useSelector(selectAuthUser);

  const pokeArr = useSelector(selectPokemons);
  const chosenPokemons = pokeArr.filter(pokemon => {
    const pokemonName = pokemon.name;
    return userCards!.some((card: any) => card.overview.name === pokemonName);
  });
  const AIPokemonsFront = pokeArr.filter(pokemon => {
    const pokemonName = pokemon.name;
    return battleComputer.cards!.some((card: any) => card.name === pokemonName);
  });

  const handleOnClickDifficulty = (type: string) => {
    if (battleComputer.cards?.length! > 0) return;
    dispatch(fetchAIPokemons(type));
  };
  return (
    <>
      <div className={css.menu}>
        <h3 className={css.difficultyText}>Difficulty:</h3>
        <div className={css.difficultyBox}>
          <button
            className={css.btn}
            type="button"
            onClick={() => handleOnClickDifficulty('easy')}
          >
            Easy
          </button>
          <button
            className={css.btn}
            type="button"
            onClick={() => handleOnClickDifficulty('medium')}
          >
            Medium
          </button>
        </div>
      </div>
      <div className={css.battle}>
        <div className={css.chosenPokemons}>
          <h2 className={css.name}>{userData.username}</h2>
          {user.cards!.length < 3 ? (
            <p>Add more cards to start battle</p>
          ) : (
            <ul className={css.list}>
              {chosenPokemons?.map(pokemon => (
                <li key={nanoid()} className={css.item}>
                  <div className={css.pokeFrontBox}>
                    <PokeFront pokemon={pokemon} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={css.arena}></div>

        <div className={css.chosenPokemonsAI}>
          <h2 className={css.name}>AI</h2>
          {battleComputer.cards!.length < 3 ? (
            <ul className={css.list}>
              <li key={nanoid()} className={css.item}>
                <div className={css.pokeFrontBox}></div>
              </li>
            </ul>
          ) : (
            <ul className={css.list}>
              {AIPokemonsFront.map(pokemon => (
                <li key={nanoid()} className={css.itemAI}>
                  <div className={css.pokeFrontBox}>
                    <PokeFront pokemon={pokemon} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Battle;
