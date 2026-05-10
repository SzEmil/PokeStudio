import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { selectAuthUser } from '../../Redux/auth/authSelectors';
import { selectTeam } from '../../Redux/team/teamSelectors';
import { setSlot, clearSlot, renameTeam, clearTeam } from '../../Redux/team/teamSlice';
import { AppDispatch } from '../../Redux/store';
import {
  prettyName,
  paddedId,
  totalStats,
  spriteHome,
  spriteOfficial,
  getTypes,
  getStat,
} from '../../utils/pokeUtils';
import { ALL_TYPES, PokemonType, getEffectiveness } from '../../data/types';
import { TypeBadge } from '../UI/TypeBadge';
import { Button } from '../UI/Button';
import { StatBar } from '../UI/StatBar';
import css from './TeamBuilder.module.css';
import { LuPlus, LuTrash2, LuShield, LuSwords, LuPenLine } from 'react-icons/lu';

export const TeamBuilder = () => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector(selectAuthUser);
  const team = useSelector(selectTeam);
  const [pickFor, setPickFor] = useState<number | null>(null);
  const [editName, setEditName] = useState(false);
  const [draftName, setDraftName] = useState(team.name);

  const cards: any[] = useMemo(() => (user.cards ?? []).slice(1), [user.cards]);

  const handlePick = (slotIndex: number, card: any) => {
    if (!card?.overview) return;
    const o = card.overview;
    dispatch(
      setSlot({
        index: slotIndex,
        pokemon: {
          id: o.id,
          name: o.name,
          sprite: spriteHome(o.id),
          types: getTypes(o),
          stats: o.stats.map((s: any) => ({ name: s.stat.name, value: s.base_stat })),
          total: totalStats(o.stats),
        },
      })
    );
    setPickFor(null);
  };

  const totalBst = team.slots.reduce((sum, s) => sum + (s?.total ?? 0), 0);
  const filled = team.slots.filter(Boolean).length;

  const teamTypes: PokemonType[] = useMemo(() => {
    const set = new Set<PokemonType>();
    team.slots.forEach(s => s?.types.forEach(t => set.add(t as PokemonType)));
    return Array.from(set);
  }, [team.slots]);

  const coverage = useMemo(() => {
    if (filled === 0) return null;
    /* For each enemy type, find the best (highest) effectiveness any team member could deal */
    const offensive: Record<string, number> = {};
    ALL_TYPES.forEach(enemy => {
      let best = 0;
      teamTypes.forEach(team => {
        const m = getEffectiveness(team as PokemonType, [enemy]);
        if (m > best) best = m;
      });
      offensive[enemy] = best;
    });
    /* Defensive: average team's vulnerability to each enemy attacker */
    const defensive: Record<string, number> = {};
    ALL_TYPES.forEach(enemy => {
      const muls = team.slots
        .filter((s): s is NonNullable<typeof s> => s !== null)
        .map(s => getEffectiveness(enemy, s.types as PokemonType[]));
      if (muls.length === 0) {
        defensive[enemy] = 1;
      } else {
        defensive[enemy] = muls.reduce((a, b) => a + b, 0) / muls.length;
      }
    });
    return { offensive, defensive };
  }, [team.slots, teamTypes, filled]);

  const avgStats = useMemo(() => {
    if (filled === 0) return null;
    const names = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];
    return names.map(n => {
      const vals = team.slots
        .filter((s): s is NonNullable<typeof s> => s !== null)
        .map(s => getStat(s.stats.map((x: any) => ({ ...x, base_stat: x.value, stat: { name: x.name, url: '' } })) as any, n));
      return { name: n, value: Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) };
    });
  }, [team.slots, filled]);

  return (
    <div className={css.wrap}>
      <header className={css.head}>
        <div>
          <span className={css.eyebrow}>Strategy</span>
          {editName ? (
            <div className={css.editRow}>
              <input
                className={css.nameInput}
                value={draftName}
                onChange={e => setDraftName(e.target.value)}
                onBlur={() => {
                  dispatch(renameTeam(draftName.trim() || 'Dream Team'));
                  setEditName(false);
                }}
                onKeyDown={e => e.key === 'Enter' && (e.target as HTMLInputElement).blur()}
                autoFocus
                maxLength={28}
              />
            </div>
          ) : (
            <h2 className={css.title}>
              {team.name}
              <button className={css.iconBtn} onClick={() => setEditName(true)} aria-label="Rename">
                <LuPenLine size={16} />
              </button>
            </h2>
          )}
          <p className={css.lead}>
            Build the ultimate 6-Pokémon squad and analyze its type coverage.
          </p>
        </div>
        <div className={css.headStats}>
          <div>
            <strong>{filled}/6</strong>
            <span>Members</span>
          </div>
          <div>
            <strong>{totalBst}</strong>
            <span>Total BST</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => dispatch(clearTeam())}
            iconLeft={<LuTrash2 />}
          >
            Reset
          </Button>
        </div>
      </header>

      <div className={css.slots}>
        {team.slots.map((slot, i) => (
          <motion.div
            key={i}
            className={`${css.slot} ${slot ? css.slotFilled : ''}`}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
          >
            {slot ? (
              <>
                <button
                  className={css.slotRemove}
                  type="button"
                  onClick={() => dispatch(clearSlot(i))}
                  aria-label="Remove from team"
                >
                  ×
                </button>
                <img
                  src={slot.sprite}
                  alt={slot.name}
                  className={css.slotImg}
                  onError={e => {
                    e.currentTarget.src = spriteOfficial(slot.id);
                  }}
                />
                <div className={css.slotName}>{prettyName(slot.name)}</div>
                <div className={css.slotId}>{paddedId(slot.id)}</div>
                <div className={css.slotTypes}>
                  {slot.types.map(t => (
                    <TypeBadge key={t} type={t} size="sm" />
                  ))}
                </div>
                <div className={css.slotBst}>BST {slot.total}</div>
              </>
            ) : (
              <button
                type="button"
                className={css.slotEmpty}
                onClick={() => setPickFor(i)}
              >
                <LuPlus size={28} />
                <span>Slot {i + 1}</span>
              </button>
            )}
          </motion.div>
        ))}
      </div>

      {pickFor !== null && (
        <div className={css.pickerBackdrop} onClick={() => setPickFor(null)}>
          <motion.div
            className={css.picker}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            onClick={e => e.stopPropagation()}
          >
            <header className={css.pickerHead}>
              <h3>Pick a Pokémon for slot {pickFor + 1}</h3>
              <button className={css.iconBtn} onClick={() => setPickFor(null)}>
                ×
              </button>
            </header>
            {cards.length === 0 ? (
              <p className={css.empty}>
                Your shelf is empty. Open packs in the Store to add Pokémon to your collection.
              </p>
            ) : (
              <div className={css.pickList}>
                {cards.map((card: any) => (
                  <button
                    type="button"
                    key={card.overview.id}
                    className={css.pickItem}
                    onClick={() => handlePick(pickFor, card)}
                  >
                    <img
                      src={spriteHome(card.overview.id)}
                      alt={card.overview.name}
                      onError={e => {
                        e.currentTarget.src = spriteOfficial(card.overview.id);
                      }}
                    />
                    <div className={css.pickInfo}>
                      <strong>{prettyName(card.overview.name)}</strong>
                      <span>{paddedId(card.overview.id)}</span>
                      <div className={css.pickTypes}>
                        {getTypes(card.overview).map(t => (
                          <TypeBadge key={t} type={t} size="sm" />
                        ))}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      )}

      {filled > 0 && coverage && avgStats && (
        <div className={css.analysis}>
          <div className={css.panel}>
            <h3>
              <LuSwords /> Offensive coverage
            </h3>
            <p className={css.subtle}>
              Best multiplier any of your Pokémon can deal vs each defending type.
            </p>
            <div className={css.coverageRow}>
              {ALL_TYPES.map(t => {
                const v = coverage.offensive[t] ?? 1;
                return (
                  <div key={t} className={`${css.covChip} ${css[classFor(v)]}`}>
                    <TypeBadge type={t} size="sm" />
                    <strong>×{v}</strong>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={css.panel}>
            <h3>
              <LuShield /> Defensive vulnerability
            </h3>
            <p className={css.subtle}>
              Average damage you take from each attacker type. Lower is safer.
            </p>
            <div className={css.coverageRow}>
              {ALL_TYPES.map(t => {
                const v = coverage.defensive[t] ?? 1;
                const r = Math.round(v * 100) / 100;
                return (
                  <div key={t} className={`${css.covChip} ${css[classDefFor(v)]}`}>
                    <TypeBadge type={t} size="sm" />
                    <strong>×{r}</strong>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={css.panel}>
            <h3>Squad average stats</h3>
            <div className={css.statList}>
              {avgStats.map(s => (
                <StatBar key={s.name} label={s.name.toUpperCase()} value={s.value} max={200} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function classFor(v: number): 'covZero' | 'covLow' | 'covHigh' | 'covNeutral' {
  if (v === 0) return 'covZero';
  if (v < 1) return 'covLow';
  if (v > 1) return 'covHigh';
  return 'covNeutral';
}

function classDefFor(v: number): 'covZero' | 'covLow' | 'covHigh' | 'covNeutral' {
  if (v === 0) return 'covZero';
  if (v < 1) return 'covHigh';
  if (v > 1) return 'covLow';
  return 'covNeutral';
}
