import css from './Battle.module.css';
import { useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { selectPokemons } from '../../Redux/pokemons/pokemonsSelectors';
import { PokeFront } from '../pokeFront/pokeFront';
import {
  selectBattleComputer,
  selectBattleUser,
  selectIsGameEnded,
  // selectIsGamePaused,
  selectIsGameStarted,
  selectComputerMove,
  selectUserMove,
} from '../../Redux/battle/battleSelectors';
import { PokemonCard } from '../PokemonCard/PokemonCard';
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
  defendComputer,
  defendUser,
} from '../../Redux/battle/battleSlice';
import { addToArenaComputer } from '../../Redux/battle/battleSlice';
import Notiflix from 'notiflix';
import { useState, useEffect } from 'react';
import { RxGear } from 'react-icons/rx';
import {
  userLostCard,
  getMoneyForBattle,
} from '../../Redux/auth/authOperations';

const Battle = () => {
  const [computerPokemonNumber, setComputerPokemonNumber] = useState(0);
  const [defeatedPokemons, setDefeatedPokemons] = useState(['']);
  const [menuOpen, setMenuOpen] = useState(true);
  const [isUserDefending, setIsUserDefending] = useState(false);
  const [isComputerDefending, setIsComputerDefending] = useState(false);
  const [isComputerDefendingAnimation, setIsComputerDefendingAnimation] =
    useState(false);
  const [gameResult, setGameResult] = useState<string>('');
  const [gameEnded, setGameEnded] = useState(false);
  const [endedScreenOpen, setEndedScreenOpen] = useState(false);
  const [difficultyType, setDifficultyType] = useState<string>();
  const [userProAttackCharge, setUserProAttackCharge] = useState(0);
  const [computerProAttackCharge, setComputerProAttackCharge] = useState(0);
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [lostPokemons, setLostPokemons] = useState([]);
  const [defeatedComputerPokemons, setDefeatedComputerPokemons] = useState([
    '',
  ]);
  const [isUserAttacking, setIsUserAttacking] = useState(false);
  const [isComputerAttacking, setIsComputerAttacking] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const user = useSelector(selectBattleUser);
  const userCards = user.cards;
  const battleComputer = useSelector(selectBattleComputer);
  const userData = useSelector(selectAuthUser);

  const userMove = useSelector(selectUserMove);
  const computerMove = useSelector(selectComputerMove);

  const isGameStarted = useSelector(selectIsGameStarted);
  // const isGamePaused = useSelector(selectIsGamePaused);
  const isGameFinished = useSelector(selectIsGameEnded);

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
    setDifficultyType(type);
  };
  const handleOnClickTakeOnArena = (name: string) => {
    const arenaCard = userCards.filter(card => card.overview!.name === name);
    dispatch(addToArena(arenaCard[0]));
  };
  //user make damage for computer

  const handleMakeDamageUser = (id: number, damageFromUser: number) => {
    if (userMove === false)
      return Notiflix.Notify.failure('wait for youre turn User!');
    console.log('user atakuje');
    let health = pokemonOnArenaComputer.stats[0].base_stat;
    const computerDefence = pokemonOnArenaComputer.stats[2].base_stat / 10;
    console.log(isComputerDefending, 'poza warunkiem');

    if (isComputerDefending) {
      console.log(isComputerDefending);
      let damage = damageFromUser - computerDefence;
      if (damage < 0) damage = 0;
      health -= damage;
      setIsComputerDefending(false);
      setTimeout(() => {
        setIsComputerDefendingAnimation(false);
      }, 2000);
    } else {
      health -= damageFromUser;
    }
    const healtForDispatch = health.toFixed(2);

    dispatch(damageForComputer({ healtForDispatch, id }));

    if (userProAttackCharge !== 3) {
      setUserProAttackCharge(prevVal => (prevVal += 1));
      console.log(userProAttackCharge);
    }
    setIsUserAttacking(true);

    setTimeout(() => {
      setIsUserAttacking(false);
    }, 1500);
  };
  //computer make damage for user
  const handleMakeDamageComputer = (damageFromComputer: number) => {
    if (computerMove === false)
      return Notiflix.Notify.failure('wait for youre turn Computer!');
    console.log(isComputerDefending, 'poza warunkiem');
    setIsComputerDefending(false);
    setIsComputerDefendingAnimation(false);
    const id = pokemonOnArenaUser.overview.id;
    const userDefence = pokemonOnArenaUser.overview!.stats[2].base_stat / 10;
    let health = pokemonOnArenaUser.overview.stats[0].base_stat;
    if (isUserDefending) {
      let damage = damageFromComputer - userDefence;
      if (damage < 0) damage = 0;
      health -= damage;
      setTimeout(() => {
        setIsUserDefending(false);
      }, 2000);
    } else {
      health -= damageFromComputer;
    }
    if (computerProAttackCharge !== 3) {
      setComputerProAttackCharge(prevVal => (prevVal += 1));
      console.log(userProAttackCharge);
    }

    setIsComputerAttacking(true);
    const healtForDispatch = health.toFixed(2);
    dispatch(damageForUser({ healtForDispatch, id }));
    setTimeout(() => {
      setIsComputerAttacking(false);
    }, 1500);
  };
  const handleOnClickDefendUser = () => {
    setIsUserDefending(true);
    if (userProAttackCharge !== 3) {
      setUserProAttackCharge(prevVal => (prevVal += 1));
    }
    dispatch(defendUser());
    setIsComputerDefending(false);
    setTimeout(() => {
      setIsComputerDefendingAnimation(false);
    }, 2000);
  };

  const handleDefendComputer = () => {
    setIsComputerDefendingAnimation(true);
    setIsComputerDefending(true);
    setTimeout(() => {
      setIsUserDefending(false);
    }, 2000);
    if (computerProAttackCharge !== 3) {
      setComputerProAttackCharge(prevVal => (prevVal += 1));
      console.log(userProAttackCharge);
    }
    dispatch(defendComputer());
    setTimeout(() => {
      setIsComputerDefendingAnimation(false);
    }, 2000);
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
    setUserProAttackCharge(0);

    // setMenuOpen(true);
  };
  const handleGiveReward = (type: string, mode: string | undefined) => {
    if (type === 'won') {
      let money = 0;
      if (mode === 'easy') money = 1000;
      if (mode === 'medium') money = 1500;
      dispatch(getMoneyForBattle(money));
    }
    if (type === 'lost') {
      const idTab = userCards.map(card => card.overview!.id);
      let idToLost: number[] = [];
      if (mode === 'easy')
        idToLost.push(idTab[Math.floor(Math.random() * idTab.length)]);
      if (mode === 'medium') {
        while (idToLost.length < 2) {
          const randomIndex = Math.floor(Math.random() * idTab.length);
          if (!idToLost.includes(idTab[randomIndex])) {
            idToLost.push(idTab[randomIndex]);
          }
        }
      }
      const userLostThisCards: any = userCards.filter(
        (card: { overview?: { id: number } }) =>
          idToLost.includes(card.overview!.id)
      );
      setLostPokemons(userLostThisCards);
      dispatch(userLostCard(idToLost));
    }
  };

  useEffect(() => {
    if (isGameStarted === false) return;

    console.log('game logic');
    //tutaj zasczepić logike AI
    //if computer lost pokemon
    if (pokemonOnArenaComputer.stats[0].base_stat <= 0) {
      const indexOfHpPokemon = battleComputer.cards!.findIndex(
        pokemon => pokemon.stats[0].base_stat > 0
      );

      if (indexOfHpPokemon < 0) {
        setGameResult('won');
        setGameEnded(true);
        setEndedScreenOpen(true);
        handleOnClickStopGame();
        handleGiveReward('won', difficultyType);
        return Notiflix.Notify.success(
          `Congrats ${userData.username}, You have won a battle!`
        );
      }
      if (pokemonOnArenaComputer.stats[0].base_stat <= 0) {
        setTimeout(() => {
          dispatch(addToArenaComputer(battleComputer.cards![indexOfHpPokemon]));
        }, 1500);
        setTimeout(() => {
          setDefeatedComputerPokemons(prevVal => [
            ...prevVal,
            pokemonOnArenaComputer.name,
          ]);
        }, 100);
      }
    }
    //computer response for user move
    if (userMove === false && computerMove === true) {
      const damageFromComputer = pokemonOnArenaComputer.stats[1].base_stat / 10;
      const computerSpecialAttack =
        pokemonOnArenaComputer.stats[3].base_stat / 10;
      console.log(computerProAttackCharge);
      if (computerProAttackCharge === 3 && Math.random() > 0.1) {
        handleMakeDamageComputer(computerSpecialAttack);
        console.log('pc SUPERatakuje');
        console.log(isComputerDefending);
        setComputerProAttackCharge(0);
      } else if (Math.random() < 0.3) {
        handleDefendComputer();
        console.log('pc DEFENDUJE SIE');
        console.log(isComputerDefending);
      } else if (userProAttackCharge === 3 && Math.random() < 0.5) {
        handleDefendComputer();
        console.log('pc DEFENDUJE SIE');
        console.log(isComputerDefending);
      } else {
        handleMakeDamageComputer(damageFromComputer);
        console.log('pc ATAKUJE');
        console.log(isComputerDefending);
      }
    }

    //if user lost pokemon
    if (pokemonOnArenaUser.overview.stats[0].base_stat <= 0) {
      const indexOfHpPokemon = userCards.findIndex(
        pokemon => pokemon.overview!.stats[0].base_stat > 0
      );

      if (indexOfHpPokemon < 0) {
        setGameResult('lost');
        setGameEnded(true);
        setEndedScreenOpen(true);
        handleOnClickStopGame();
        handleGiveReward('lost', difficultyType);
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
    [
      handleMakeDamageUser,
      handleOnClickDefendUser,
      handleDefendComputer,
      handleMakeDamageComputer,
    ];

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
                    className={`${itemClass} ${
                      pokemonOnArenaUser !== null &&
                      pokemonOnArenaUser.overview.name === pokemon.name
                        ? css.pickedPokemonBar
                        : ''
                    }`}
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
                      className={`${css.btn} ${
                        isGameStarted === false ? '' : css.disabledBtn
                      }`}
                      onClick={() => handleOnClickStartGame()}
                      disabled={isGameStarted ? true : false}
                    >
                      Start game
                    </button>
                  </li>
                  <li key={nanoid()} className={css.menuItem}>
                    <div className={css.difficultyBox}>
                      <h3 className={css.menuText}>Difficulty:</h3>
                      <button
                        className={`${css.btn} ${
                          isGameStarted === false ? '' : css.disabledBtn
                        }`}
                        type="button"
                        onClick={() => handleOnClickDifficulty('easy')}
                      >
                        Easy
                      </button>
                      <button
                        className={`${css.btn} ${
                          isGameStarted === false ? '' : css.disabledBtn
                        }`}
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
                      onClick={() => setIsRulesOpen(prevVal => !prevVal)}
                    >
                      Rules
                    </button>
                  </li>
                  <li key={nanoid()} className={css.menuItem}>
                    <button
                      className={`${css.btn} ${
                        isGameStarted ? '' : css.disabledBtn
                      }`}
                      onClick={() => handleOnClickStopGame()}
                      disabled={isGameStarted ? false : true}
                    >
                      End game
                    </button>
                  </li>
                </ul>
              </div>
              <div
                className={`${css.menuRulesBox} ${
                  isRulesOpen ? css.menuRulesBoxOpen : ''
                }`}
              >
                <h2 className={css.rulesTitle}>Rules</h2>
                <p className={css.rulesText}>
                  During the game you will use three of your pokemons. Use the
                  buttons to perform the appropriate action, such as attack or
                  defense. Your special attack takes 3 rounds to recharge.
                  Attack and defence stats of pokemons stats are divided by 10.
                  When you lose on easy you lose one pokemon. If you lose on
                  Medium, you lose two Pokemon. When you win on easy you get
                  1000 coins. After winning on medium level you get 2000 coins.
                  Have fun pokemon trainer!
                </p>
              </div>
            </div>
          ) : null}

          {isGameFinished &&
          menuOpen === false &&
          gameEnded === true &&
          endedScreenOpen === true ? (
            <div className={css.gameFinished}>
              <div className={css.gameFinishedModal}>
                <button
                  type="button"
                  className={css.menuCloseBtn}
                  onClick={() => setEndedScreenOpen(prevVal => !prevVal)}
                >
                  X
                </button>
                <h2 className={css.gameFinishedTitle}>
                  {gameResult === 'won' ? (
                    <span>Congrats You have won a duel!</span>
                  ) : (
                    <span>You lost!</span>
                  )}
                </h2>
                {gameResult === 'won' && difficultyType === 'easy' && (
                  <div>
                    <p className={css.gameFinishedText}>
                      You have won 1000 coins!
                    </p>
                  </div>
                )}
                {gameResult === 'won' && difficultyType === 'medium' && (
                  <p className={css.gameFinishedText}>
                    You have won 1500 coins!
                  </p>
                )}
                {gameResult === 'lost' && difficultyType === 'easy' && (
                  <div>
                    <p className={css.gameFinishedText}>
                      You have lost one of youre cards!. You didnt get coins for
                      this!
                    </p>
                    <ul>
                      {lostPokemons!.map((pokemon: any) => (
                        <li key={nanoid()} className={css.lostPokemon}>
                          {<PokemonCard pokemon={pokemon} />}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {gameResult === 'lost' && difficultyType === 'medium' && (
                  <div>
                    <p className={css.gameFinishedText}>
                      You have lost two of youre cards!. You didnt get coins for
                      this!
                    </p>
                    <ul className={css.lostPokemonList}>
                      {lostPokemons!.map((pokemon: any) => (
                        <li key={nanoid()} className={css.lostPokemon}>
                          {<PokemonCard pokemon={pokemon} />}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ) : null}

          {pokemonOnArenaUser === null || isGameStarted === false ? null : (
            <div className={css.pokemonArenaUser}>
              <img
                className={`${css.pokeArenaImage} ${
                  isUserDefending ? css.pokemonDefending : ''
                } ${isUserAttacking ? css.userAtacking : ''}`}
                alt="picked Pokemon"
                src={
                  pokemonOnArenaUser.overview.sprites.back_default
                    ? pokemonOnArenaUser.overview.sprites.back_default
                    : pokemonOnArenaUser.overview.sprites.front_default
                }
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
                className={`${css.pokeArenaImage} ${
                  isComputerDefendingAnimation ? css.pokemonDefending : ''
                } ${isComputerAttacking ? css.computerAtacking : ''}`}
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
              <h2 className={css.guiPokemonName}>
                {pokemonOnArenaUser.overview.name}
              </h2>
              <div>
                <button
                  className={css.userBtn}
                  type="button"
                  onClick={() =>
                    handleMakeDamageUser(
                      pokemonOnArenaComputer.id,
                      pokemonOnArenaUser.overview.stats[1].base_stat / 10
                    )
                  }
                >
                  Hit {pokemonOnArenaUser.overview.stats[1].base_stat}
                </button>
                <button
                  className={`${css.userBtn} ${
                    userProAttackCharge < 3 ? css.disabledBtn : ''
                  }`}
                  type="button"
                  onClick={() => {
                    handleMakeDamageUser(
                      pokemonOnArenaComputer.id,
                      pokemonOnArenaUser.overview.stats[3].base_stat / 10
                    );
                    setUserProAttackCharge(0);
                  }}
                  disabled={userProAttackCharge < 3 ? true : false}
                >
                  Special Attack{' '}
                  {pokemonOnArenaUser.overview.stats[3].base_stat}
                </button>

                <button
                  className={css.userBtn}
                  type="button"
                  onClick={() => handleOnClickDefendUser()}
                >
                  Defend {pokemonOnArenaUser.overview.stats[2].base_stat}
                </button>
              </div>

              <ul className={css.userGuiPokemonStats}>
                {pokemonOnArenaUser?.overview.stats.map(
                  (stat: ReturnType<typeof pokemonOnArenaUser>) => (
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
          )}

          {pokemonOnArenaComputer === null ||
          isGameStarted === false ||
          menuOpen === true ? null : (
            <div className={css.computerGui}>
              <h2 className={css.guiPokemonName}>
                {pokemonOnArenaComputer.name}
              </h2>
              <ul className={css.userGuiPokemonStats}>
                {pokemonOnArenaComputer?.stats.map(
                  (stat: ReturnType<typeof pokemonOnArenaComputer>) => (
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
                let itemClass = css.item;

                if (pokemonOnArenaComputer !== null) {
                  itemClass = defeatedComputerPokemons.includes(pokemon.name)
                    ? `${css.itemAI} ${css.defeated}`
                    : css.item;
                }

                return (
                  <li
                    key={nanoid()}
                    className={`${itemClass} ${
                      pokemonOnArenaComputer !== null &&
                      pokemonOnArenaComputer.name === pokemon.name
                        ? css.pickedPokemonBar
                        : ''
                    }`}
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
      </div>
    </>
  );
};

export default Battle;
