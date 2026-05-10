import { useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Section } from '../../Components/Section/Section';
import { UserShelf } from '../../Components/UserShelf/UserShelf';
import { Shop } from '../../Components/Shop/Shop';
import { TeamBuilder } from '../../Components/TeamBuilder/TeamBuilder';
import { TypeMatchup } from '../../Components/TypeMatchup/TypeMatchup';
import { DailyQuest } from '../../Components/DailyQuest/DailyQuest';
import { Achievements } from '../../Components/Achievements/Achievements';
import { Compare } from '../../Components/Compare/Compare';
import { WhosThatPokemon } from '../../Components/WhosThatPokemon/WhosThatPokemon';
import { WildEncounter } from '../../Components/WildEncounter/WildEncounter';
import { Trivia } from '../../Components/Trivia/Trivia';
import { PokeballLoader } from '../../Components/PokeballLoader/PokeballLoader';
import PokeNews from '../../Components/PokeNews/PokeNews';
import css from './PokeDex.module.css';
import {
  HiOutlineSquares2X2,
  HiOutlineShoppingBag,
  HiOutlineNewspaper,
  HiOutlineTrophy,
  HiOutlineCalendar,
} from 'react-icons/hi2';
import { LuSwords, LuTarget, LuUsers, LuScale, LuEye, LuLeaf, LuBrain } from 'react-icons/lu';

const BattleComponent = lazy(() => import('../../Components/Battle/Battle'));

type TabKey =
  | 'home'
  | 'shelf'
  | 'shop'
  | 'team'
  | 'compare'
  | 'matchup'
  | 'battle'
  | 'wild'
  | 'guess'
  | 'trivia'
  | 'quest'
  | 'achievements'
  | 'news';

const TABS: { key: TabKey; label: string; icon: React.ReactNode; group?: string }[] = [
  { key: 'home', label: 'Hub', icon: <HiOutlineCalendar /> },
  { key: 'shelf', label: 'Shelf', icon: <HiOutlineSquares2X2 /> },
  { key: 'shop', label: 'Store', icon: <HiOutlineShoppingBag /> },
  { key: 'team', label: 'Team', icon: <LuUsers /> },
  { key: 'compare', label: 'Compare', icon: <LuScale /> },
  { key: 'matchup', label: 'Type Calc', icon: <LuTarget /> },
  { key: 'battle', label: 'Battle', icon: <LuSwords /> },
  { key: 'wild', label: 'Wild', icon: <LuLeaf /> },
  { key: 'guess', label: "Who's That?", icon: <LuEye /> },
  { key: 'trivia', label: 'Trivia', icon: <LuBrain /> },
  { key: 'quest', label: 'Daily', icon: <HiOutlineCalendar /> },
  { key: 'achievements', label: 'Trophies', icon: <HiOutlineTrophy /> },
  { key: 'news', label: 'Feed', icon: <HiOutlineNewspaper /> },
];

const PokeDex = () => {
  const [tab, setTab] = useState<TabKey>('home');

  return (
    <div className={css.page}>
      <Section>
        <header className={css.head}>
          <div>
            <span className={css.eyebrow}>Trainer Hub</span>
            <h1 className={css.title}>Pokédex</h1>
            <p className={css.lead}>
              Manage your collection, build dream teams, study type matchups, and
              prove your skill in the Arena — all in one place.
            </p>
          </div>
        </header>

        <div className={css.tabs} role="tablist">
          {TABS.map(t => (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={tab === t.key}
              className={`${css.tab} ${tab === t.key ? css.tabActive : ''}`}
              onClick={() => setTab(t.key)}
            >
              <span className={css.tabIcon}>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        <motion.div
          key={tab}
          className={css.body}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Suspense fallback={<PokeballLoader label="Loading module" />}>
            {tab === 'home' && <PokedexHome onJumpTab={setTab} />}
            {tab === 'shelf' && <UserShelf />}
            {tab === 'shop' && <Shop />}
            {tab === 'team' && <TeamBuilder />}
            {tab === 'compare' && <Compare />}
            {tab === 'matchup' && <TypeMatchup />}
            {tab === 'wild' && <WildEncounter />}
            {tab === 'guess' && <WhosThatPokemon />}
            {tab === 'trivia' && <Trivia />}
            {tab === 'battle' && <BattleComponent />}
            {tab === 'quest' && <DailyQuest />}
            {tab === 'achievements' && <Achievements />}
            {tab === 'news' && <PokeNews />}
          </Suspense>
        </motion.div>
      </Section>
    </div>
  );
};

export default PokeDex;

/* ---------- Hub home ---------- */

import { useSelector } from 'react-redux';
import { selectAuthUser } from '../../Redux/auth/authSelectors';
import { selectStats } from '../../Redux/stats/statsSelectors';

const PokedexHome = ({ onJumpTab }: { onJumpTab: (k: TabKey) => void }) => {
  const user = useSelector(selectAuthUser);
  const stats = useSelector(selectStats);
  const cards = Math.max(0, (user.cards?.length ?? 1) - 1);

  return (
    <div className={css.hub}>
      <DailyQuest />

      <div className={css.kpis}>
        <KPI label="Cards" value={cards} accent="brand" />
        <KPI label="Coins" value={user.coins ?? 0} accent="gold" />
        <KPI label="Battles won" value={stats.battlesWon} accent="green" />
        <KPI label="Packs opened" value={stats.packsOpened} accent="blue" />
        <KPI label="Legendaries" value={stats.legendaryPulled} accent="purple" />
        <KPI label="Achievements" value={stats.achievements.length} accent="red" />
      </div>

      <div className={css.shortcuts}>
        <Shortcut
          icon={<HiOutlineShoppingBag size={22} />}
          title="Open booster packs"
          desc="Spend coins on Silver, Gold, or Legendary packs"
          onClick={() => onJumpTab('shop')}
        />
        <Shortcut
          icon={<LuUsers size={22} />}
          title="Build your dream team"
          desc="Compose a 6-Pokémon squad and analyze coverage"
          onClick={() => onJumpTab('team')}
        />
        <Shortcut
          icon={<LuTarget size={22} />}
          title="Type calculator"
          desc="Pick the perfect attack with effectiveness math"
          onClick={() => onJumpTab('matchup')}
        />
        <Shortcut
          icon={<LuSwords size={22} />}
          title="Enter the Arena"
          desc="3v3 turn-based battle vs AI with type bonuses"
          onClick={() => onJumpTab('battle')}
        />
        <Shortcut
          icon={<LuScale size={22} />}
          title="Compare two Pokémon"
          desc="Side-by-side stats, type matchup and BST"
          onClick={() => onJumpTab('compare')}
        />
        <Shortcut
          icon={<LuLeaf size={22} />}
          title="Wild encounter"
          desc="Throw the Pokéball — time it right to catch"
          onClick={() => onJumpTab('wild')}
        />
        <Shortcut
          icon={<LuEye size={22} />}
          title="Who's That Pokémon?"
          desc="Guess the silhouette — keep the streak alive"
          onClick={() => onJumpTab('guess')}
        />
        <Shortcut
          icon={<LuBrain size={22} />}
          title="Pokémon Trivia"
          desc="Five rotating question types, 3 difficulties"
          onClick={() => onJumpTab('trivia')}
        />
      </div>
    </div>
  );
};

const KPI = ({
  label,
  value,
  accent,
}: {
  label: string;
  value: number | string;
  accent: 'brand' | 'gold' | 'green' | 'blue' | 'purple' | 'red';
}) => (
  <div className={`${css.kpi} ${css[`kpi_${accent}`]}`}>
    <strong>{value.toLocaleString?.() ?? value}</strong>
    <span>{label}</span>
  </div>
);

const Shortcut = ({
  icon,
  title,
  desc,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  onClick: () => void;
}) => (
  <button type="button" className={css.shortcut} onClick={onClick}>
    <span className={css.shortcutIcon}>{icon}</span>
    <span className={css.shortcutText}>
      <strong>{title}</strong>
      <small>{desc}</small>
    </span>
  </button>
);
