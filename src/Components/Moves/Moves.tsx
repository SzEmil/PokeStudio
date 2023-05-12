import { nanoid } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { selectPokemonDetails } from '../../Redux/pokemonInfo/pokemonInfoSelectors';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../Redux/store';
import { fetchPokemonMoves } from '../../Redux/pokemonInfo/pokemonInfoOperations';
import { useState } from 'react';
import { selectPokemonDetailsMovesInfo } from '../../Redux/pokemonInfo/pokemonInfoSelectors';
import css from './Moves.module.css';

type movesType = {
  move: {
    name: string;
    url: string;
  };
  version_group_details: [
    {
      level_learned_at: number;
      move_learn_method: {
        name: string;
        url: string;
      };
      version_group: {
        name: string;
        url: string;
      };
    }
  ];
};
type movePropsType = {
  moves: movesType[];
};

export const Moves = ({ moves }: movePropsType) => {
  const dispatch: AppDispatch = useDispatch();
  const movesDetails: any = useSelector(selectPokemonDetailsMovesInfo);
  const pokeDetails = useSelector(selectPokemonDetails);
  const [isOpen, setIsOpen] = useState(false);
  const [movesOpen, setMovesOpen] = useState(false);

  const toggleList = () => {
    setIsOpen(!isOpen);
  };
  const toggleMoves = () => {
    setMovesOpen(!movesOpen);
  };
  const handleOnClickInfo = (url: string | undefined) => {
    dispatch(fetchPokemonMoves(url));
    toggleMoves();
  };
  return (
    <div className={css.container}>
      <div className={css.movesCard}>
        <div className={css.movesCardBar}>
          <h3 className={css.movesCardTitle}>Moves</h3>
          <button
            type="button"
            onClick={toggleList}
            className={`${css.button} ${isOpen ? css.isVisible : ''}`}
          >
            ^
          </button>
        </div>
        <ul className={`${css.list} ${isOpen ? css.visible : ''}`}>
          {moves.map(move => (
            <li className={css.listItem} key={`${move.move.name}_${nanoid()}`}>
              <div
                className={`${css.moveTypeBar} ${
                  movesOpen ? css.moveTypeVisible : ''
                }`}
              >
                <p className={css.moveTitle}>{move.move.name}</p>
                <button
                  className={css.moreInfoBtn}
                  type="button"
                  onClick={() => handleOnClickInfo(move.move.url)}
                >
                  ?
                </button>
              </div>
              {movesDetails === null ||
              move.move.name !== movesDetails.name ? null : (
                <>
                  {pokeDetails.isMovesLoading ? (
                    <p>Loading data...</p>
                  ) : (
                    <div className={css.moveTypeWrapper}>
                      <p className={css.moveType}>
                        {
                          movesDetails.flavor_text_entries.find(
                            (item: ReturnType<typeof movesDetails>) =>
                              item.language.name === 'en'
                          ).flavor_text
                        }
                      </p>
                      <p className={css.moveType}>
                        Accuracy:{' '}
                        <span className={css.moveTypeModifier}>
                          {movesDetails.accuracy}
                        </span>
                      </p>
                      <p className={css.moveType}>
                        Power:{' '}
                        <span className={css.moveTypeModifier}>
                          {movesDetails.power}
                        </span>
                      </p>
                      <p className={css.moveType}>
                        Damage Class:{' '}
                        <span className={css.moveTypeModifier}>
                          {movesDetails.damage_class.name}
                        </span>
                      </p>
                    </div>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
