import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import Notiflix from 'notiflix';
import { PokemonCard } from '../PokemonCard/PokemonCard';
import { selectAuthUser } from '../../Redux/auth/authSelectors';
import { AppDispatch } from '../../Redux/store';
import { calculatePrice } from '../BtnQuickSellCard/BtnQuickSellCard';
import { deleteCard } from '../../Redux/auth/authOperations';
import { addCardSold } from '../../Redux/stats/statsSlice';
import { selectBattleUser } from '../../Redux/battle/battleSelectors';
import { setUserBattleCards, deleteUserBattleCards } from '../../Redux/battle/battleSlice';
import { Button } from '../UI/Button';
import { TypeBadge } from '../UI/TypeBadge';
import { getTypes, totalStats } from '../../utils/pokeUtils';
import css from './UserShelf.module.css';
import { LuSparkles, LuShield, LuSwords, LuCoins, LuFilter } from 'react-icons/lu';
import { HiOutlineXMark } from 'react-icons/hi2';

type SortKey = 'recent' | 'name' | 'bst' | 'value';

export const UserShelf = () => {
  const userData = useSelector(selectAuthUser);
  const cards: any[] = useMemo(() => (userData.cards ?? []).slice(1), [userData.cards]);
  const battleUser = useSelector(selectBattleUser);
  const dispatch: AppDispatch = useDispatch();
  const [sort, setSort] = useState<SortKey>('recent');
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('');

  const inBattle = (id: number) =>
    !!battleUser.cards?.some((c: any) => c.overview?.id === id);

  const allTypes = useMemo(() => {
    const set = new Set<string>();
    cards.forEach((c: any) => getTypes(c.overview).forEach(t => set.add(t)));
    return Array.from(set);
  }, [cards]);

  const filtered = useMemo(() => {
    let list = cards;
    if (search) list = list.filter((c: any) => c.overview?.name?.includes(search.toLowerCase()));
    if (typeFilter) list = list.filter((c: any) => getTypes(c.overview).includes(typeFilter as any));
    const arr = [...list];
    arr.sort((a: any, b: any) => {
      if (sort === 'name') return a.overview.name.localeCompare(b.overview.name);
      if (sort === 'bst') return totalStats(b.overview.stats) - totalStats(a.overview.stats);
      if (sort === 'value')
        return (b.overview.base_experience ?? 0) - (a.overview.base_experience ?? 0);
      return 0; // recent (no order change)
    });
    return arr;
  }, [cards, sort, search, typeFilter]);

  const handleQuickSell = (id: number, ovrl: number) => {
    const price = calculatePrice(ovrl);
    dispatch(deleteCard({ id, price }));
    dispatch(deleteUserBattleCards(id));
    dispatch(addCardSold());
  };

  const handleTakeForBattle = (card: any) => {
    if ((battleUser.cards?.length ?? 0) >= 3) {
      Notiflix.Notify.failure('You already have 3 Pokémon ready for battle.');
      return;
    }
    dispatch(setUserBattleCards(card));
    Notiflix.Notify.success(`${card.overview.name} added to battle squad.`);
  };

  const handleUnpick = (id: number) => dispatch(deleteUserBattleCards(id));

  if (cards.length === 0) {
    return (
      <div className={css.empty}>
        <LuSparkles size={32} />
        <h3>Your shelf is empty</h3>
        <p>Open booster packs in the Store to start collecting Pokémon.</p>
      </div>
    );
  }

  return (
    <div className={css.wrap}>
      <header className={css.head}>
        <div className={css.headLeft}>
          <span className={css.eyebrow}>Collection</span>
          <h2>{cards.length} Pokémon on your shelf</h2>
          <p>Manage your roster, send your strongest into battle, or quick-sell duplicates.</p>
        </div>
        <div className={css.battleSquad}>
          <span className={css.squadLabel}>
            <LuShield /> Battle squad {battleUser.cards?.length ?? 0}/3
          </span>
        </div>
      </header>

      <div className={css.controls}>
        <div className={css.searchWrap}>
          <input
            type="text"
            placeholder="Search by name…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className={css.searchInput}
          />
        </div>
        <div className={css.filterChips}>
          <button
            type="button"
            onClick={() => setTypeFilter('')}
            className={`${css.chip} ${typeFilter === '' ? css.chipActive : ''}`}
          >
            <LuFilter /> All
          </button>
          {allTypes.map(t => (
            <button
              key={t}
              type="button"
              onClick={() => setTypeFilter(t === typeFilter ? '' : t)}
              className={`${css.chip} ${typeFilter === t ? css.chipActive : ''}`}
            >
              <TypeBadge type={t} size="sm" />
            </button>
          ))}
        </div>
        <div className={css.sortRow}>
          <span className={css.sortLabel}>Sort</span>
          {(['recent', 'name', 'bst', 'value'] as SortKey[]).map(k => (
            <button
              key={k}
              type="button"
              onClick={() => setSort(k)}
              className={`${css.sortChip} ${sort === k ? css.sortChipActive : ''}`}
            >
              {k === 'recent' ? 'Recent' : k === 'name' ? 'A→Z' : k === 'bst' ? 'BST ↓' : 'Value ↓'}
            </button>
          ))}
        </div>
      </div>

      <ul className={css.list}>
        {filtered.map((card: any, i) => (
          <motion.li
            key={`${card.overview.id}-${i}`}
            className={css.item}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: Math.min(i * 0.025, 0.4) }}
          >
            <NavLink className={css.cardLink} to={`/pokemon/${card.overview.id}`}>
              <PokemonCard pokemon={card} />
            </NavLink>
            <div className={css.btnRow}>
              <Button
                variant="ghost"
                size="sm"
                fullWidth
                disabled={inBattle(card.overview.id)}
                iconLeft={<LuCoins />}
                onClick={() =>
                  handleQuickSell(card.overview.id, card.overview.base_experience ?? 0)
                }
              >
                Sell · {calculatePrice(card.overview.base_experience ?? 0)}¢
              </Button>
              {inBattle(card.overview.id) ? (
                <Button
                  variant="danger"
                  size="sm"
                  fullWidth
                  iconLeft={<HiOutlineXMark />}
                  onClick={() => handleUnpick(card.overview.id)}
                >
                  Remove from squad
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  fullWidth
                  iconLeft={<LuSwords />}
                  onClick={() => handleTakeForBattle(card)}
                >
                  Add to squad ({battleUser.cards?.length ?? 0}/3)
                </Button>
              )}
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};
