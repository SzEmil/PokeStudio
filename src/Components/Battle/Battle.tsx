import css from './Battle.module.css';
import { useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { selectPokemons } from '../../Redux/pokemons/pokemonsSelectors';
import { PokeFront } from '../pokeFront/pokeFront';
import {
  selectBattleComputer,
  selectBattleUser,
  // selectIsGameEnded,
  // selectIsGamePaused,
  selectIsGameStarted,
  selectComputerMove,
  selectUserMove,
} from '../../Redux/battle/battleSelectors';
import { selectAuthUser } from '../../Redux/auth/authSelectors';
import { fetchAIPokemons } from '../../Redux/battle/battleOperations';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../Redux/store';
import { addToArena } from '../../Redux/battle/battleSlice';
import {
  damageForComputer,
  damageForUser,
} from '../../Redux/battle/battleSlice';
import { startGame, stopGame } from '../../Redux/battle/battleSlice';
import { addToArenaComputer } from '../../Redux/battle/battleSlice';
import Notiflix from 'notiflix';
import { useState, useEffect } from 'react';

const Battle = () => {
  const [computerPokemonNumber, setComputerPokemonNumber] = useState(0);

  const dispatch: AppDispatch = useDispatch();
  const user = useSelector(selectBattleUser);
  const userCards = user.cards;
  const battleComputer = useSelector(selectBattleComputer);
  const userData = useSelector(selectAuthUser);

  const userMove = useSelector(selectUserMove);
  const computerMove = useSelector(selectComputerMove);

  const isGameStarted = useSelector(selectIsGameStarted);
  // const isGamePaused = useSelector(selectIsGamePaused);
  // const isGameEnded = useSelector(selectIsGameEnded);

  let pokemonOnArenaUser: any = user.pokemonOnArena;
  let pokemonOnArenaComputer: any = battleComputer.pokemonOnArena;

  const pokeArr = useSelector(selectPokemons);
  const chosenPokemons = pokeArr.filter(pokemon => {
    const pokemonName = pokemon.name;
    return userCards!.some((card: any) => card.overview.name === pokemonName);
  });
  const AIPokemonsFront = pokeArr.filter(pokemon => {
    const pokemonName = pokemon.name;
    return battleComputer.cards!.some((card: any) => card.name === pokemonName);
  });

  useEffect(() => {
    if (isGameStarted === false) {
      pokemonOnArenaComputer = null;
    }
  }, [isGameStarted]);

  const handleOnClickDifficulty = (type: string) => {
    dispatch(fetchAIPokemons(type));
  };
  const handleOnClickTakeOnArena = (name: string) => {
    const arenaCard = userCards.filter(card => card.overview!.name === name);
    dispatch(addToArena(arenaCard[0]));
  };

  const handleMakeDamageUser = (damage: number, id: number) => {
    if (userMove === false)
      return Notiflix.Notify.failure('wait for youre turn User!');
    let health = pokemonOnArenaComputer.stats[0].base_stat;
    health -= damage;
    dispatch(damageForComputer({ health, id }));
  };

  const handleMakeDamageComputer = () => {
    if (computerMove === false)
      return Notiflix.Notify.failure('wait for youre turn Computer!');
    const id = pokemonOnArenaUser.overview.id;
    let health = pokemonOnArenaUser.overview.stats[0].base_stat;
    health -= pokemonOnArenaComputer.stats[1].base_stat / 10;

    dispatch(damageForUser({ health, id }));
  };
  const handleOnClickStartGame = () => {
    if (userCards.length < 3 || battleComputer.cards!.length < 3) {
      Notiflix.Notify.warning(
        'Pick difficulty level or add pokemons for battle'
      );
    }
    if (!pokemonOnArenaUser) {
      Notiflix.Notify.warning('U must pick pokemon to start');
      return;
    } else {
      dispatch(startGame());
      dispatch(
        addToArenaComputer(battleComputer.cards![computerPokemonNumber])
      );
      setComputerPokemonNumber(prevVal => (prevVal += 1));
    }
  };
  const handleOnClickStopGame = () => {
    dispatch(stopGame());
    setComputerPokemonNumber(0);
  };

  useEffect(() => {
    if (isGameStarted === false) return;

    console.log('wykonano damage na bocie');
    //tutaj zasczepić logike AI
    if (
      pokemonOnArenaComputer.stats[0].base_stat <= 0 &&
      computerPokemonNumber > 2
    ) {
      dispatch(stopGame());
      return Notiflix.Notify.success(
        `Congrats ${userData.username}, You have won a battle!`
      );
    }
    if (pokemonOnArenaComputer.stats[0].base_stat <= 0) {
      dispatch(
        addToArenaComputer(battleComputer.cards![computerPokemonNumber])
      );
      setComputerPokemonNumber(prevVal => (prevVal += 1));
    }
    if (userMove === false && computerMove === true) handleMakeDamageComputer();
  }),
    [handleMakeDamageUser];

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
        <p>Game started?: {isGameStarted === true && <span>Game ON</span>}</p>
      </div>
      <div className={css.battle}>
        <div className={css.chosenPokemons}>
          <h2 className={css.name}>{userData.username}</h2>
          {user.cards!.length < 3 ? (
            <p>Add more cards to start battle</p>
          ) : (
            <ul className={css.list}>
              {chosenPokemons?.map(pokemon => (
                <li
                  key={nanoid()}
                  className={css.item}
                  onClick={() => handleOnClickTakeOnArena(pokemon.name)}
                >
                  <div className={css.pokeFrontBox}>
                    <PokeFront pokemon={pokemon} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div
          className={css.arena}
          style={
            isGameStarted
              ? { backgroundImage: 'url(https://i.redd.it/dnlz6c3xni951.jpg)' }
              : {}
          }
        >
          <button onClick={() => handleMakeDamageComputer()}>
            Make damage for user
          </button>
          <button onClick={() => handleOnClickStartGame()}>Start game</button>
          <button onClick={() => handleOnClickStopGame()}>Stop Game</button>
          {pokemonOnArenaUser === null ? null : (
            <div className={css.pokemonArenaUser}>
              <img
                className={css.pokeArenaImage}
                alt="picked Pokemon"
                src={pokemonOnArenaUser.overview.sprites.back_default}
              />
              <h2>{pokemonOnArenaUser.overview.name}</h2>
              <div
                className={css.healthBar}
                style={{
                  width: `${pokemonOnArenaUser.overview.stats[0].base_stat}px`,
                }}
              >
                <div className={css.health}>
                  <div className={css.healthText}>
                    HP:
                    {pokemonOnArenaUser.overview.stats[0].base_stat}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() =>
                  handleMakeDamageUser(
                    pokemonOnArenaUser.overview.stats[1].base_stat / 10,
                    pokemonOnArenaComputer.id
                  )
                }
              >
                Hit {pokemonOnArenaUser.overview.stats[1].base_stat}
              </button>
            </div>
          )}

          {pokemonOnArenaComputer === null && isGameStarted === false ? null : (
            <div className={css.pokemonArenaComputer}>
              <img
                className={css.pokeArenaImage}
                alt="picked Pokemon"
                src={pokemonOnArenaComputer.sprites.front_default}
              />
              <h2>{pokemonOnArenaComputer.name}</h2>
              <div
                className={css.healthBar}
                style={{
                  width: `${pokemonOnArenaComputer.stats[0].base_stat}px`,
                }}
              >
                <div className={css.health}>
                  <div className={css.healthText}>
                    HP:
                    {pokemonOnArenaComputer.stats[0].base_stat}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

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
