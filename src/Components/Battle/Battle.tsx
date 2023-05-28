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
import {
  startGame,
  stopGame,
  // defendComputer,
  defendUser,
} from '../../Redux/battle/battleSlice';
import { addToArenaComputer } from '../../Redux/battle/battleSlice';
import Notiflix from 'notiflix';
import { useState, useEffect } from 'react';
import { RxGear } from 'react-icons/rx';

const Battle = () => {
  const [computerPokemonNumber, setComputerPokemonNumber] = useState(0);
  const [defeatedPokemons, setDefeatedPokemons] = useState(['']);
  const [menuOpen, setMenuOpen] = useState(true);
  const [isUserDefending, setIsUserDefending] = useState(false);
  const [isComputerDefending, setIsComputerDefending] = useState(false);

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
  //user make damage for computer
  const handleMakeDamageUser = (id: number) => {
    if (userMove === false)
      return Notiflix.Notify.failure('wait for youre turn User!');
    const damageFromUser = pokemonOnArenaUser.overview!.stats[1].base_stat / 10;
    let health = pokemonOnArenaComputer.stats[0].base_stat;
    const computerDefence = pokemonOnArenaComputer.stats[2].base_stat;

    if (isComputerDefending) {
      let damage = damageFromUser - computerDefence;
      if (damage < 0) damage = 0;
      health -= damage;
      setIsComputerDefending(false);
    } else {
      health -= damageFromUser;
    }
    dispatch(damageForComputer({ health, id }));
  };
  //computer make damage for user
  const handleMakeDamageComputer = () => {
    if (computerMove === false)
      return Notiflix.Notify.failure('wait for youre turn Computer!');
    const id = pokemonOnArenaUser.overview.id;
    const userDefence = pokemonOnArenaUser.overview!.stats[2].base_stat / 10;
    const damageFromComputer = pokemonOnArenaComputer.stats[1].base_stat / 10;
    let health = pokemonOnArenaUser.overview.stats[0].base_stat;
    if (isUserDefending) {
      let damage = damageFromComputer - userDefence;
      if (damage < 0) damage = 0;
      health -= damage;
      setIsUserDefending(false);
    } else {
      health -= damageFromComputer;
    }

    dispatch(damageForUser({ health, id }));
  };
  const handleOnClickDefendUser = () => {
    setIsUserDefending(true);
    dispatch(defendUser());
  };

  // const handleOnClickDefendComputer = () => {
  //   setIsComputerDefending(true);
  //   dispatch(defendComputer());
  // };

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
      setMenuOpen(false);
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
    setDefeatedPokemons(['']);
    // setMenuOpen(true);
  };

  useEffect(() => {
    if (isGameStarted === false) return;

    console.log('game logic');
    //tutaj zasczepić logike AI
    //if user lost pokemon
    if (pokemonOnArenaComputer.stats[0].base_stat <= 0) {
      const indexOfHpPokemon = battleComputer.cards!.findIndex(
        pokemon => pokemon.stats[0].base_stat > 0
      );

      if (indexOfHpPokemon < 0) {
        handleOnClickStopGame();
        return Notiflix.Notify.success(
          `Congrats ${userData.username}, You have won a battle!`
        );
      }
      if (pokemonOnArenaComputer.stats[0].base_stat <= 0) {
        dispatch(addToArenaComputer(battleComputer.cards![indexOfHpPokemon]));
        setComputerPokemonNumber(prevVal => (prevVal += 1));
      }
    }
    //computer response for user move
    if (userMove === false && computerMove === true) {
      setTimeout(() => {
        console.log('pc atakuje');
        handleMakeDamageComputer();
      }, 2000);
    }

    //if computer lost pokemon
    if (pokemonOnArenaUser.overview.stats[0].base_stat <= 0) {
      const indexOfHpPokemon = userCards.findIndex(
        pokemon => pokemon.overview!.stats[0].base_stat > 0
      );

      if (indexOfHpPokemon < 0) {
        handleOnClickStopGame();
        return Notiflix.Notify.success(
          `You lost! Dont worry ${userData.username}, You can try again!`
        );
      }

      if (indexOfHpPokemon >= 0) {
        dispatch(addToArena(userCards[indexOfHpPokemon]));
        setDefeatedPokemons(prevVal => [
          ...prevVal,
          pokemonOnArenaUser.overview.name,
        ]);
      }
    }
  }),
    [handleMakeDamageUser];

  return (
    <>
      <div className={css.battle}>
        <div className={css.chosenPokemons}>
          <h2 className={css.name}>{userData.username}</h2>
          {user.cards!.length < 3 ? (
            <p className={css.errorMessage}>Add more cards to start battle!</p>
          ) : (
            <ul className={css.list}>
              {chosenPokemons?.map(pokemon => {
                let itemClass = css.item;

                if (pokemonOnArenaUser !== null) {
                  itemClass = defeatedPokemons.includes(pokemon.name)
                    ? `${css.item} ${css.defeated}`
                    : css.item;
                }

                return (
                  <li
                    key={nanoid()}
                    className={itemClass}
                    onClick={() => handleOnClickTakeOnArena(pokemon.name)}
                  >
                    <div className={css.pokeFrontBox}>
                      <PokeFront pokemon={pokemon} />
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div
          className={css.arena}
          // style={
          //   isGameStarted
          //     ? { backgroundImage: 'url(https://i.redd.it/dnlz6c3xni951.jpg)' }
          //     : {}
          // }
          style={{
            backgroundImage: 'url(https://i.redd.it/dnlz6c3xni951.jpg)',
          }}
        >
          {isGameStarted && (
            <p className={css.moveBox}>
              Move: {userMove ? <span>User</span> : <span>Computer</span>}
            </p>
          )}
          {!menuOpen ? (
            <div
              className={css.menuGear}
              onClick={() => setMenuOpen(prevVal => !prevVal)}
            >
              <RxGear size={'36px'} />
            </div>
          ) : null}
          {menuOpen ? (
            <div className={css.menuBackdrop}>
              <div className={css.menu}>
                <button
                  type="button"
                  className={css.menuCloseBtn}
                  onClick={() => setMenuOpen(prevVal => !prevVal)}
                >
                  X
                </button>

                <h2 className={css.menuTitle}>Menu</h2>
                <ul className={css.menuList}>
                  <li key={nanoid()} className={css.menuItem}>
                    <button
                      className={css.btn}
                      onClick={() => handleOnClickStartGame()}
                    >
                      Start game
                    </button>
                  </li>
                  <li key={nanoid()} className={css.menuItem}>
                    <div className={css.difficultyBox}>
                      <h3 className={css.menuText}>Difficulty:</h3>
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
                  </li>
                  <li key={nanoid()} className={css.menuItem}>
                    <button
                      className={css.btn}
                      onClick={() => handleOnClickStopGame()}
                    >
                      End game
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : null}

          {pokemonOnArenaUser === null || isGameStarted === false ? null : (
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
          {pokemonOnArenaUser === null ||
          isGameStarted === false ||
          menuOpen === true ? null : (
            <div className={css.userGui}>
              <button
                className={css.userBtn}
                type="button"
                onClick={() => handleMakeDamageUser(pokemonOnArenaComputer.id)}
              >
                Hit {pokemonOnArenaUser.overview.stats[1].base_stat}
              </button>
              <button
                className={css.userBtn}
                type="button"
                onClick={() => handleMakeDamageUser(pokemonOnArenaComputer.id)}
              >
                Special Attack {pokemonOnArenaUser.overview.stats[3].base_stat}
              </button>

              <button
                className={css.userBtn}
                type="button"
                onClick={() => handleOnClickDefendUser()}
              >
                Defend {pokemonOnArenaUser.overview.stats[2].base_stat}
              </button>
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
              {AIPokemonsFront?.map(pokemon => {
                let itemClass = css.itemAI;

                if (
                  pokemonOnArenaComputer !== null &&
                  pokemonOnArenaComputer.stats[0].base_stat <= 0 &&
                  pokemon.name === pokemonOnArenaComputer.name
                ) {
                  itemClass += ` ${css.defeated}`;
                }

                return (
                  <li key={nanoid()} className={itemClass}>
                    <div className={css.pokeFrontBox}>
                      <PokeFront pokemon={pokemon} />
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Battle;
