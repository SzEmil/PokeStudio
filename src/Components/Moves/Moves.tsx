import { nanoid } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import {
  selectPokemonDetails,
  selectPokemonDetailsMovesInfo,
} from '../../Redux/pokemonInfo/pokemonInfoSelectors';
import { fetchPokemonMoves } from '../../Redux/pokemonInfo/pokemonInfoOperations';
import { AppDispatch } from '../../Redux/store';
import { prettyName } from '../../utils/pokeUtils';
import { TypeBadge } from '../UI/TypeBadge';
import css from './Moves.module.css';
import { HiOutlineInformationCircle, HiOutlineXMark } from 'react-icons/hi2';

type MoveType = {
  move: { name: string; url: string };
};
type Props = { moves: MoveType[] };

export const Moves = ({ moves }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const movesDetails: any = useSelector(selectPokemonDetailsMovesInfo);
  const pokeDetails = useSelector(selectPokemonDetails);
  const [activeUrl, setActiveUrl] = useState<string | null>(null);

  const handleOpenInfo = (url: string) => {
    if (activeUrl === url) {
      setActiveUrl(null);
    } else {
      dispatch(fetchPokemonMoves(url));
      setActiveUrl(url);
    }
  };

  return (
    <div className={css.container}>
      <div className={css.head}>
        <h3 className={css.title}>Moves ({moves.length})</h3>
      </div>
      <ul className={css.list}>
        {moves.map(m => {
          const isActive = activeUrl === m.move.url;
          const flavor = movesDetails?.flavor_text_entries?.find(
            (e: any) => e.language?.name === 'en'
          )?.flavor_text;
          return (
            <li className={css.listItem} key={`${m.move.name}_${nanoid()}`}>
              <button
                type="button"
                className={`${css.row} ${isActive ? css.rowActive : ''}`}
                onClick={() => handleOpenInfo(m.move.url)}
              >
                <span className={css.moveName}>{prettyName(m.move.name)}</span>
                <span className={css.toggle}>
                  {isActive ? <HiOutlineXMark size={14} /> : <HiOutlineInformationCircle size={14} />}
                </span>
              </button>
              {isActive && movesDetails?.name === m.move.name && (
                <div className={css.detail}>
                  {pokeDetails.isMovesLoading ? (
                    <p className={css.muted}>Loading…</p>
                  ) : (
                    <>
                      {flavor && <p className={css.flavor}>{flavor.replace(/[\f\n]/g, ' ')}</p>}
                      <div className={css.metrics}>
                        {movesDetails.type?.name && <TypeBadge type={movesDetails.type.name} size="sm" />}
                        {movesDetails.damage_class?.name && (
                          <span className={css.metric}>
                            <span>Class</span>
                            <strong>{movesDetails.damage_class.name}</strong>
                          </span>
                        )}
                        <span className={css.metric}>
                          <span>Power</span>
                          <strong>{movesDetails.power ?? '—'}</strong>
                        </span>
                        <span className={css.metric}>
                          <span>Acc</span>
                          <strong>{movesDetails.accuracy ?? '—'}</strong>
                        </span>
                        <span className={css.metric}>
                          <span>PP</span>
                          <strong>{movesDetails.pp ?? '—'}</strong>
                        </span>
                      </div>
                    </>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
