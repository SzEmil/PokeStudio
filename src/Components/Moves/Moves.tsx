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

  const toggleList = () => {
    setIsOpen(!isOpen);
  };

  const handleOnClickInfo = (url: string | undefined) => {
    dispatch(fetchPokemonMoves(url));
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
              <div className={css.moveTypeBar}>
                <p>{move.move.name}</p>
                <button
                  type="button"
                  onClick={() => handleOnClickInfo(move.move.url)}
                >
                  Details
                </button>
              </div>
              {movesDetails === null ||
              move.move.name !== movesDetails.name ? null : (
                <>
                  {pokeDetails.isMovesLoading ? (
                    <p>Loading data...</p>
                  ) : (
                    <div>
                      <p>Accuracy: {movesDetails.accuracy}</p>
                      <p>Power: {movesDetails.power}</p>
                      <p>
                        {
                          movesDetails.flavor_text_entries.find(
                            (item: ReturnType<typeof movesDetails>) =>
                              item.language.name === 'en'
                          ).flavor_text
                        }
                      </p>
                      <p>Damage Class: {movesDetails.damage_class.name}</p>
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
