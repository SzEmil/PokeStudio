import css from './PokemonCard.module.css';
import { motion } from 'framer-motion';
import { useState, MouseEvent } from 'react';
import {
  prettyName,
  paddedId,
  rarityFromExperience,
  RARITY_LABEL,
  RARITY_GLOW,
  getTypes,
  spriteHome,
  spriteOfficial,
  totalStats,
} from '../../utils/pokeUtils';
import { TYPE_COLORS } from '../../data/types';
import { TypeBadge } from '../UI/TypeBadge';
import { ElementParticles } from './ElementParticles';
import { elementalEffect } from './elementalEffects';

export const PokemonCard = ({ pokemon }: any) => {
  const overview = pokemon?.overview;
  const details = pokemon?.details;

  const [tilt, setTilt] = useState({ rx: 0, ry: 0, mx: 50, my: 50 });
  const [hover, setHover] = useState(false);

  if (!overview || !details) return null;

  const id = overview.id;
  const types = getTypes(overview);
  const primaryColor = types[0] ? TYPE_COLORS[types[0]] : '#aab2c8';
  const elem = elementalEffect(types);
  const rarity = details?.is_legendary
    ? 'legendary'
    : rarityFromExperience(overview.base_experience ?? 0);
  const totals = totalStats(overview.stats ?? []);
  const flavor =
    details.flavor_text_entries?.find((e: any) => e.language?.name === 'en')?.flavor_text ?? '';

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    setTilt({
      rx: (0.5 - y) * 10,
      ry: (x - 0.5) * 14,
      mx: x * 100,
      my: y * 100,
    });
  };

  const onLeave = () => {
    setTilt({ rx: 0, ry: 0, mx: 50, my: 50 });
    setHover(false);
  };

  const sprite = overview.sprites?.other?.home?.front_default
    ? overview.sprites.other.home.front_default
    : overview.sprites?.other?.['official-artwork']?.front_default ?? spriteHome(id);

  return (
    <motion.div
      className={css.cardWrap}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={`${css.card} ${css[rarity]}`}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={onLeave}
        style={{
          background: elem.background,
          transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          boxShadow: hover
            ? `0 30px 60px ${RARITY_GLOW[rarity]}, 0 0 28px ${primaryColor}66, 0 4px 12px rgba(0, 0, 0, 0.5)`
            : `0 14px 30px rgba(0, 0, 0, 0.45), 0 0 14px ${primaryColor}33`,
        }}
      >
        {/* Type-themed pattern overlay */}
        <div
          className={css.elementPattern}
          aria-hidden
          style={{ background: elem.pattern }}
        />

        {/* Animated elemental particles */}
        <ElementParticles variant={elem.particleClass} color={primaryColor} count={20} />

        {/* Hover spotlight following cursor */}
        <div
          className={css.spotlight}
          aria-hidden
          style={{
            background: `radial-gradient(220px circle at ${tilt.mx}% ${tilt.my}%, ${primaryColor}66, transparent 60%)`,
            opacity: hover ? 1 : 0,
          }}
        />

        <div className={css.foil} aria-hidden />

        <div className={css.frame}>
          <div className={css.head}>
            <div className={css.headLeft}>
              <span className={css.id}>{paddedId(id)}</span>
              <h3 className={css.name}>{prettyName(overview.name)}</h3>
              <div className={css.typeRow}>
                {types.map(t => (
                  <TypeBadge key={t} type={t} size="sm" />
                ))}
              </div>
            </div>
            <div
              className={css.elementSeal}
              style={{
                background: `radial-gradient(circle at 30% 30%, ${primaryColor}, ${primaryColor}44)`,
                boxShadow: `0 0 18px ${primaryColor}77, inset 0 1px 0 rgba(255, 255, 255, 0.35)`,
              }}
              title={types[0] ?? 'Pokémon'}
            >
              <span>{elem.emoji}</span>
            </div>
          </div>

          <div className={css.imageBox}>
            <div
              className={css.imageGlow}
              aria-hidden
              style={{
                background: `radial-gradient(closest-side, ${primaryColor}55, transparent 70%)`,
              }}
            />
            <img
              src={sprite}
              alt={overview.name}
              className={css.image}
              onError={e => {
                const t = e.currentTarget;
                if (t.dataset.fallback) return;
                t.dataset.fallback = '1';
                t.src = spriteOfficial(id);
              }}
            />
          </div>

          <div className={css.body}>
            <div className={css.rarityRow}>
              <span
                className={css.rarityBadge}
                style={{
                  borderColor: `${primaryColor}66`,
                  color: primaryColor,
                  background: `${primaryColor}11`,
                }}
              >
                <span className={css.rarityDot} />
                {RARITY_LABEL[rarity]}
              </span>
            </div>
            <p className={css.flavor}>
              {flavor ? flavor.replace(/\f|\n/g, ' ') : 'No description available.'}
            </p>
            <div className={css.statRow}>
              <div className={css.stat}>
                <span>BST</span>
                <strong>{totals}</strong>
              </div>
              <div className={css.stat}>
                <span>EXP</span>
                <strong>{overview.base_experience ?? '-'}</strong>
              </div>
              <div className={css.stat}>
                <span>HT/WT</span>
                <strong>
                  {overview.height / 10}m · {overview.weight / 10}kg
                </strong>
              </div>
            </div>
          </div>

          <div className={css.holoStrip} aria-hidden />
        </div>
      </div>
    </motion.div>
  );
};
