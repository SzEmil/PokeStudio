import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Pokeball } from '../UI/Pokeball';
import { Confetti } from '../UI/Confetti';
import { PokemonCard } from '../PokemonCard/PokemonCard';
import { Button } from '../UI/Button';
import { BtnAddCard } from '../BtnAddCard/BtnAddCard';
import { BtnQuickSellCard } from '../BtnQuickSellCard/BtnQuickSellCard';
import {
  prettyName,
  rarityFromExperience,
  RARITY_LABEL,
} from '../../utils/pokeUtils';
import css from './PackReveal.module.css';

type Phase = 'shake' | 'burst' | 'reveal';
type Tier = 'Silver' | 'Gold' | 'Legendary';

interface Props {
  open: boolean;
  tier: Tier;
  packedPokemon: any;
  isLoading: boolean;
  onClose: () => void;
}

const TIER_COLORS: Record<Tier, { primary: string; secondary: string; particles: string[] }> = {
  Silver: {
    primary: '#cdd2da',
    secondary: '#6f7585',
    particles: ['#cdd2da', '#9aa0ac', '#ffffff', '#6f7585'],
  },
  Gold: {
    primary: '#ffcb05',
    secondary: '#ff8c00',
    particles: ['#ffcb05', '#ff8c00', '#ffe26b', '#ff5e5e'],
  },
  Legendary: {
    primary: '#c084fc',
    secondary: '#6f35fc',
    particles: ['#c084fc', '#6f35fc', '#ffcb05', '#ff5e5e', '#ffffff'],
  },
};

export const PackReveal = ({
  open,
  tier,
  packedPokemon,
  isLoading,
  onClose,
}: Props) => {
  const [phase, setPhase] = useState<Phase>('shake');
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (!open) return;
    setPhase('shake');
    setShowConfetti(false);

    const t1 = setTimeout(() => setPhase('burst'), 1900);
    const t2 = setTimeout(() => {
      setPhase('reveal');
      setShowConfetti(true);
    }, 2700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [open]);

  if (!open) return null;

  const colors = TIER_COLORS[tier];
  const isLegendary =
    packedPokemon?.details?.is_legendary ||
    (packedPokemon?.overview?.base_experience ?? 0) >= 300 ||
    tier === 'Legendary';
  const rarity = packedPokemon?.overview
    ? packedPokemon?.details?.is_legendary
      ? 'legendary'
      : rarityFromExperience(packedPokemon.overview.base_experience ?? 0)
    : 'common';

  return (
    <motion.div
      className={css.backdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Aurora background that pulses with the tier color */}
      <div
        className={css.aurora}
        style={{
          background: `radial-gradient(ellipse 60% 80% at 50% 50%, ${colors.primary}33, transparent 60%), radial-gradient(ellipse 80% 60% at 50% 50%, ${colors.secondary}22, transparent 70%)`,
        }}
      />

      <motion.div
        className={css.stage}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.4 }}
        onClick={e => e.stopPropagation()}
      >
        <button className={css.close} onClick={onClose} aria-label="Close">
          ×
        </button>

        {phase !== 'reveal' && (
          <div className={css.opener}>
            {phase === 'shake' && (
              <>
                <motion.div
                  className={css.glowRing}
                  style={{ borderColor: colors.primary }}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: [0.6, 1.05, 0.95, 1.05, 1], opacity: [0, 1, 1, 1, 1] }}
                  transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.div
                  className={css.ballWrap}
                  animate={{
                    rotate: [0, -18, 18, -14, 14, -8, 8, 0],
                    y: [0, -6, 0, -4, 0, -3, 0, 0],
                  }}
                  transition={{ duration: 1.7, ease: 'easeInOut' }}
                >
                  <Pokeball size={140} />
                </motion.div>
                <p className={css.tagline}>
                  <span style={{ color: colors.primary }}>{tier}</span> pack — opening…
                </p>
              </>
            )}

            {phase === 'burst' && (
              <>
                {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
                  <motion.span
                    key={i}
                    className={css.ray}
                    style={{
                      background: `linear-gradient(${i * 45}deg, ${colors.primary}cc, transparent 80%)`,
                      transform: `rotate(${i * 45}deg)`,
                    }}
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={{ scaleY: 1, opacity: [0, 1, 0.7, 0] }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                  />
                ))}
                <motion.div
                  className={css.shockwave}
                  style={{ borderColor: colors.primary }}
                  initial={{ scale: 0.4, opacity: 1 }}
                  animate={{ scale: 4, opacity: 0 }}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                />
                <motion.div
                  className={css.shockwave}
                  style={{ borderColor: colors.secondary, animationDelay: '0.2s' }}
                  initial={{ scale: 0.4, opacity: 1 }}
                  animate={{ scale: 5, opacity: 0 }}
                  transition={{ duration: 1.1, ease: 'easeOut', delay: 0.15 }}
                />
                <motion.div
                  className={css.flash}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.5 }}
                />
                <motion.div
                  className={css.ballWrap}
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 1.6, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Pokeball size={140} />
                </motion.div>
              </>
            )}
          </div>
        )}

        {phase === 'reveal' && (
          <div className={`${css.reveal} ${isLegendary ? css.revealLegendary : ''}`}>
            {showConfetti && <Confetti count={isLegendary ? 90 : 60} colors={colors.particles} />}
            {packedPokemon?.overview && packedPokemon?.details ? (
              <>
                <motion.div
                  className={css.cardSlot}
                  initial={{ rotateY: 180, scale: 0.7, opacity: 0 }}
                  animate={{ rotateY: 0, scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <PokemonCard pokemon={packedPokemon} />
                </motion.div>
                <motion.div
                  className={css.callout}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <span
                    className={css.rarityBanner}
                    style={{
                      background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                    }}
                  >
                    {RARITY_LABEL[rarity]}
                  </span>
                  <h3>You found {prettyName(packedPokemon.overview.name)}!</h3>
                  <p>
                    {isLegendary
                      ? 'A LEGENDARY pull! Add this rare beast to your shelf or quick-sell for serious coin.'
                      : 'Add it to your shelf for battles, or quick-sell it for instant coins.'}
                  </p>
                  <div className={css.actions}>
                    <BtnAddCard />
                    <BtnQuickSellCard ovrl={packedPokemon.overview.base_experience} />
                  </div>
                  <Button variant="ghost" size="sm" onClick={onClose}>
                    Open another later
                  </Button>
                </motion.div>
              </>
            ) : (
              <div className={css.loadingCard}>
                {isLoading ? 'Loading details…' : 'No data yet…'}
              </div>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};
