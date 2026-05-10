import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  fetchPokemonById,
  fetchPokemonInfo,
  fetchEvolutionChain,
} from '../../Redux/pokemonInfo/pokemonInfoOperations';
import { AppDispatch } from '../../Redux/store';
import {
  selectPokemonDetails,
  selectRandomPokemonIsLoading,
  selectisLoadingMoreInfo,
  selectEvolutionChain,
  selectIsEvolutionLoading,
} from '../../Redux/pokemonInfo/pokemonInfoSelectors';
import { EvolutionChain } from '../../Components/EvolutionChain/EvolutionChain';
import css from './Pokemon.module.css';
import { Section } from '../../Components/Section/Section';
import { Moves } from '../../Components/Moves/Moves';
import { PokeGallery } from '../../Components/PokeGallery/PokeGallery';
import { PokemonCard } from '../../Components/PokemonCard/PokemonCard';
import { PokeballLoader } from '../../Components/PokeballLoader/PokeballLoader';
import { TypeBadge } from '../../Components/UI/TypeBadge';
import { StatBar } from '../../Components/UI/StatBar';
import { Button } from '../../Components/UI/Button';
import {
  getTypes,
  paddedId,
  prettyName,
  totalStats,
  generationOf,
  rarityFromExperience,
  RARITY_LABEL,
  spriteOfficial,
} from '../../utils/pokeUtils';
import { getEffectiveness, ALL_TYPES, PokemonType, STAT_LABEL } from '../../data/types';
import {
  HiOutlineArrowLeft,
  HiOutlineArrowRight,
  HiOutlineSparkles,
} from 'react-icons/hi2';
import { LuShield, LuFlame, LuZap } from 'react-icons/lu';

const Pokemon = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const pokemon: any = useSelector(selectPokemonDetails);
  const isRandomLoaded = useSelector(selectRandomPokemonIsLoading);
  const isMoreLoading = useSelector(selectisLoadingMoreInfo);
  const evolutionChain = useSelector(selectEvolutionChain);
  const isEvolutionLoading = useSelector(selectIsEvolutionLoading);
  const [activeTab, setActiveTab] = useState<
    'about' | 'stats' | 'moves' | 'evolution' | 'gallery'
  >('about');

  useEffect(() => {
    dispatch(fetchPokemonById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (pokemon?.overview?.species?.url) {
      dispatch(fetchPokemonInfo(pokemon.overview.species.url));
    }
  }, [pokemon?.overview, dispatch]);

  useEffect(() => {
    if (pokemon?.details?.evolution_chain?.url) {
      dispatch(fetchEvolutionChain(pokemon.details.evolution_chain.url));
    }
  }, [pokemon?.details?.evolution_chain?.url, dispatch]);

  const overview = pokemon?.overview;
  const details = pokemon?.details;
  const types: PokemonType[] = useMemo(() => getTypes(overview), [overview]);

  const numId = Number(id) || overview?.id || 0;
  const gen = numId ? generationOf(numId) : null;

  /* Type effectiveness analysis (defender perspective) */
  const matchups = useMemo(() => {
    if (types.length === 0) return null;
    const result: { type: PokemonType; mult: number }[] = ALL_TYPES.map(t => ({
      type: t,
      mult: getEffectiveness(t, types),
    }));
    return {
      weak: result.filter(r => r.mult > 1),
      resistant: result.filter(r => r.mult > 0 && r.mult < 1),
      immune: result.filter(r => r.mult === 0),
    };
  }, [types]);

  if (isRandomLoaded || !overview || isMoreLoading || !details) {
    return (
      <Section>
        <PokeballLoader label="Summoning Pokémon" />
      </Section>
    );
  }

  const rarity = details.is_legendary
    ? 'legendary'
    : rarityFromExperience(overview.base_experience ?? 0);

  const flavor =
    details.flavor_text_entries
      ?.filter((e: any) => e.language?.name === 'en')
      .map((e: any) => e.flavor_text.replace(/[\f\n]/g, ' '))[0] ?? 'No description available.';

  const goNeighbor = (delta: number) => {
    const next = numId + delta;
    if (next < 1 || next > 1025) return;
    navigate(`/pokemon/${next}`);
  };

  const TABS = [
    { key: 'about', label: 'About', icon: <HiOutlineSparkles /> },
    { key: 'stats', label: 'Stats', icon: <LuFlame /> },
    { key: 'evolution', label: 'Evolution', icon: <LuZap /> },
    { key: 'moves', label: 'Moves', icon: <LuZap /> },
    { key: 'gallery', label: 'Gallery', icon: <LuShield /> },
  ] as const;

  return (
    <div className={css.page}>
      <div
        className={css.heroBanner}
        style={{
          background: `radial-gradient(ellipse at top, ${
            details.color?.name ? details.color.name : '#6390f0'
          }55, transparent 60%)`,
        }}
      >
        <Section>
          <div className={css.topBar}>
            <NavLink to="/" className={css.back}>
              <HiOutlineArrowLeft size={16} /> Back
            </NavLink>
            <div className={css.neighborNav}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => goNeighbor(-1)}
                disabled={numId <= 1}
                iconLeft={<HiOutlineArrowLeft />}
              >
                Prev
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => goNeighbor(+1)}
                disabled={numId >= 1025}
                iconRight={<HiOutlineArrowRight />}
              >
                Next
              </Button>
            </div>
          </div>

          <div className={css.heroLayout}>
            <div className={css.heroVisual}>
              <motion.img
                key={overview.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                src={
                  overview.sprites?.other?.['official-artwork']?.front_default ??
                  spriteOfficial(overview.id)
                }
                alt={overview.name}
                className={css.heroImage}
              />
              <div className={css.heroId}>{paddedId(overview.id)}</div>
            </div>

            <div className={css.heroInfo}>
              <div className={css.metaRow}>
                {gen && (
                  <span className={css.genChip} style={{ borderColor: `${gen.color}66` }}>
                    {gen.label}
                  </span>
                )}
                <span className={css.rarityChip}>{RARITY_LABEL[rarity]}</span>
                {details.is_legendary && <span className={css.specialChip}>Legendary</span>}
                {details.is_mythical && <span className={css.specialChip}>Mythical</span>}
              </div>
              <h1 className={css.title}>{prettyName(overview.name)}</h1>
              <div className={css.typeRow}>
                {types.map(t => (
                  <TypeBadge key={t} type={t} size="lg" />
                ))}
              </div>
              <p className={css.flavor}>{flavor}</p>

              <dl className={css.factGrid}>
                <div className={css.fact}>
                  <dt>Height</dt>
                  <dd>{overview.height / 10}m</dd>
                </div>
                <div className={css.fact}>
                  <dt>Weight</dt>
                  <dd>{overview.weight / 10}kg</dd>
                </div>
                <div className={css.fact}>
                  <dt>Base XP</dt>
                  <dd>{overview.base_experience ?? '-'}</dd>
                </div>
                <div className={css.fact}>
                  <dt>BST</dt>
                  <dd>{totalStats(overview.stats ?? [])}</dd>
                </div>
                <div className={css.fact}>
                  <dt>Hatch</dt>
                  <dd>{details.hatch_counter ?? '-'}</dd>
                </div>
                <div className={css.fact}>
                  <dt>Capture</dt>
                  <dd>{details.capture_rate ?? '-'}</dd>
                </div>
              </dl>
            </div>
          </div>
        </Section>
      </div>

      <Section>
        <div className={css.tabBar}>
          {TABS.map(t => (
            <button
              key={t.key}
              type="button"
              className={`${css.tab} ${activeTab === t.key ? css.tabActive : ''}`}
              onClick={() => setActiveTab(t.key as typeof activeTab)}
            >
              <span className={css.tabIcon}>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        {activeTab === 'about' && (
          <div className={css.grid2}>
            <div className={css.panel}>
              <h3 className={css.panelTitle}>Abilities</h3>
              <ul className={css.abilityList}>
                {overview.abilities?.map((a: any) => (
                  <li key={a.ability.name} className={css.abilityRow}>
                    <span className={css.abilityName}>{prettyName(a.ability.name)}</span>
                    {a.is_hidden && <span className={css.hiddenBadge}>Hidden</span>}
                  </li>
                ))}
              </ul>
            </div>
            <div className={css.panel}>
              <h3 className={css.panelTitle}>Type matchups</h3>
              {matchups && (
                <div className={css.matchups}>
                  <div>
                    <h4>
                      <LuFlame /> Weak to
                    </h4>
                    <div className={css.matchRow}>
                      {matchups.weak.length === 0 ? (
                        <span className={css.muted}>None</span>
                      ) : (
                        matchups.weak.map(m => (
                          <span key={m.type} className={css.matchChip}>
                            <TypeBadge type={m.type} size="sm" />
                            <strong>×{m.mult}</strong>
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                  <div>
                    <h4>
                      <LuShield /> Resists
                    </h4>
                    <div className={css.matchRow}>
                      {matchups.resistant.length === 0 ? (
                        <span className={css.muted}>None</span>
                      ) : (
                        matchups.resistant.map(m => (
                          <span key={m.type} className={css.matchChip}>
                            <TypeBadge type={m.type} size="sm" />
                            <strong>×{m.mult}</strong>
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                  {matchups.immune.length > 0 && (
                    <div>
                      <h4>Immune to</h4>
                      <div className={css.matchRow}>
                        {matchups.immune.map(m => (
                          <span key={m.type} className={css.matchChip}>
                            <TypeBadge type={m.type} size="sm" />
                            <strong>×0</strong>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className={`${css.panel} ${css.cardPanel}`}>
              <h3 className={css.panelTitle}>Trading card</h3>
              <PokemonCard pokemon={pokemon} />
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className={css.panel}>
            <h3 className={css.panelTitle}>Base stats</h3>
            <div className={css.statList}>
              {overview.stats?.map((s: any) => (
                <StatBar
                  key={s.stat.name}
                  label={STAT_LABEL[s.stat.name] ?? s.stat.name}
                  value={s.base_stat}
                  max={255}
                />
              ))}
              <StatBar
                label="TOTAL"
                value={totalStats(overview.stats ?? [])}
                max={780}
                color="linear-gradient(90deg, var(--brand), var(--brand-2))"
              />
            </div>
          </div>
        )}

        {activeTab === 'evolution' && (
          <div className={css.panel}>
            <h3 className={css.panelTitle}>Evolution chain</h3>
            <EvolutionChain
              chain={evolutionChain as any}
              loading={isEvolutionLoading as boolean}
              currentId={overview.id}
            />
          </div>
        )}

        {activeTab === 'moves' && (
          <div className={css.panel}>
            <Moves moves={overview.moves} />
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className={css.panel}>
            <PokeGallery sprites={overview.sprites} />
          </div>
        )}
      </Section>
    </div>
  );
};

export default Pokemon;
