import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Section } from '../../Components/Section/Section';
import { HotToday } from '../../Components/HotToday/HotToday';
import { PokemonList } from '../../Components/PokemonList/PokemonList';
import { SearchBar } from '../../Components/SearchBar/SearchBar';
import { AppDispatch } from '../../Redux/store';
import { fetchPokemons } from '../../Redux/pokemons/pokemonsOperations';
import {
  selectPokemons,
  selectFilteredPokemons,
} from '../../Redux/pokemons/pokemonsSelectors';
import {
  selectFilterGeneration,
  selectFilterSort,
} from '../../Redux/filter/filterSelectors';
import {
  setGeneration,
  setSort,
  clearFilters,
  SortMode,
} from '../../Redux/filter/filterSlice';
import { GENERATIONS } from '../../data/types';
import { Button } from '../../Components/UI/Button';
import { Pokeball } from '../../Components/UI/Pokeball';
import { useAuth } from '../../hooks/useAuth';
import {
  HiOutlineSparkles,
  HiOutlineBolt,
  HiOutlineFire,
  HiOutlineRocketLaunch,
} from 'react-icons/hi2';
import { LuSwords, LuGift } from 'react-icons/lu';
import css from './Home.module.css';

const SORTS: { value: SortMode; label: string }[] = [
  { value: 'id-asc', label: 'ID ↑' },
  { value: 'id-desc', label: 'ID ↓' },
  { value: 'name-asc', label: 'A — Z' },
  { value: 'name-desc', label: 'Z — A' },
];

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isLoggedIn } = useAuth();
  const pokeList = useSelector(selectPokemons);
  const pokeData = useSelector(selectFilteredPokemons);
  const generation = useSelector(selectFilterGeneration);
  const sort = useSelector(selectFilterSort);

  useEffect(() => {
    if (pokeList.length === 0) dispatch(fetchPokemons());
  }, [dispatch, pokeList.length]);

  return (
    <div className={css.page}>
      {/* HERO */}
      <section className={css.hero}>
        <div className={css.heroBg} aria-hidden>
          <div className={css.heroOrb1} />
          <div className={css.heroOrb2} />
          <div className={css.heroOrb3} />
          <div className={css.heroGrid} />
        </div>
        <div className={css.heroInner}>
          <motion.div
            className={css.heroLeft}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className={css.heroTag}>
              <HiOutlineSparkles /> v2.0 — A whole new adventure
            </span>
            <h1 className={css.heroTitle}>
              Discover, collect & battle <br />
              all <span className={css.heroAccent}>1,025+</span> Pokémon
            </h1>
            <p className={css.heroLead}>
              PokéStudio is your open-world Pokédex companion. Browse every species,
              study their stats and types, build dream teams, open premium packs, and
              prove yourself in the Battle Arena.
            </p>
            <div className={css.heroCta}>
              <NavLink to="/pokedex">
                <Button
                  variant="primary"
                  size="lg"
                  iconLeft={<HiOutlineRocketLaunch />}
                >
                  {isLoggedIn ? 'Open Pokédex' : 'Get started'}
                </Button>
              </NavLink>
              <NavLink to="/battle-arena">
                <Button variant="ghost" size="lg" iconLeft={<LuSwords />}>
                  Battle Arena
                </Button>
              </NavLink>
            </div>
            <div className={css.heroStats}>
              <div className={css.heroStat}>
                <strong>1,025+</strong>
                <span>Species</span>
              </div>
              <div className={css.heroStat}>
                <strong>18</strong>
                <span>Types</span>
              </div>
              <div className={css.heroStat}>
                <strong>9</strong>
                <span>Generations</span>
              </div>
              <div className={css.heroStat}>
                <strong>∞</strong>
                <span>Battles</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className={css.heroRight}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={css.heroCardLabel}>
              <Pokeball size={18} /> POKÉMON OF THE DAY
            </div>
            <HotToday />
          </motion.div>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <Section>
        <div className={css.quickGrid}>
          <NavLink to="/pokedex" className={`${css.quick} ${css.quickShelf}`}>
            <div className={css.quickIcon}>
              <Pokeball size={28} />
            </div>
            <h3>Your Shelf</h3>
            <p>Manage your Pokémon collection</p>
          </NavLink>
          <NavLink to="/pokedex" className={`${css.quick} ${css.quickShop}`}>
            <div className={css.quickIcon}>
              <LuGift size={26} />
            </div>
            <h3>Booster Packs</h3>
            <p>Open Silver, Gold or Legendary packs</p>
          </NavLink>
          <NavLink to="/battle-arena" className={`${css.quick} ${css.quickBattle}`}>
            <div className={css.quickIcon}>
              <LuSwords size={26} />
            </div>
            <h3>Battle Arena</h3>
            <p>3v3 turn-based combat vs AI</p>
          </NavLink>
          <NavLink to="/profile" className={`${css.quick} ${css.quickProfile}`}>
            <div className={css.quickIcon}>
              <HiOutlineFire size={26} />
            </div>
            <h3>Achievements</h3>
            <p>Earn badges & track your progress</p>
          </NavLink>
        </div>
      </Section>

      {/* BROWSE */}
      <Section>
        <div className={css.browseHead}>
          <div>
            <h2 className={css.h2}>
              <HiOutlineBolt /> Browse the Pokédex
            </h2>
            <p className={css.subtle}>
              {pokeData.length.toLocaleString()} Pokémon available
            </p>
          </div>
          <SearchBar filterType="home" />
        </div>

        <div className={css.controls}>
          <div className={css.genRow}>
            <button
              type="button"
              className={`${css.gen} ${generation === null ? css.genActive : ''}`}
              onClick={() => dispatch(setGeneration(null))}
            >
              All Gens
            </button>
            {GENERATIONS.map(g => (
              <button
                key={g.id}
                type="button"
                onClick={() => dispatch(setGeneration(g.id))}
                className={`${css.gen} ${generation === g.id ? css.genActive : ''}`}
                style={
                  generation === g.id
                    ? { background: g.color, borderColor: g.color }
                    : { borderColor: `${g.color}55` }
                }
              >
                {g.label.split(' — ')[0]}
              </button>
            ))}
          </div>
          <div className={css.sortRow}>
            <span className={css.sortLabel}>Sort</span>
            <div className={css.sortChips}>
              {SORTS.map(s => (
                <button
                  key={s.value}
                  type="button"
                  className={`${css.sort} ${sort === s.value ? css.sortActive : ''}`}
                  onClick={() => dispatch(setSort(s.value))}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              className={css.clearAll}
              onClick={() => dispatch(clearFilters())}
            >
              Reset filters
            </button>
          </div>
        </div>

        <div className={css.list}>
          <PokemonList pokemons={pokeData} />
        </div>
      </Section>
    </div>
  );
};

export default Home;
