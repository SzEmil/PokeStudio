import { PokemonType, TYPE_COLORS } from '../../data/types';

export type ElementalEffect = {
  background: string;
  pattern: string;
  glow: string;
  particleClass: string;
  emoji: string;
};

const baseGlass =
  'linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02))';

export function elementalEffect(types: PokemonType[]): ElementalEffect {
  const primary = types[0];
  const secondary = types[1];
  const c1 = primary ? TYPE_COLORS[primary] : '#aab2c8';
  const c2 = secondary ? TYPE_COLORS[secondary] : c1;

  // Base background blends primary + secondary type colors
  const background = `radial-gradient(ellipse at top, ${c1}66 0%, transparent 60%),
    radial-gradient(ellipse at bottom right, ${c2}55 0%, transparent 60%),
    ${baseGlass}, rgba(20, 27, 44, 0.85)`;
  const glow = `${c1}55`;

  // Type-specific decorative pattern overlay
  let pattern = '';
  let particleClass = 'pe_default';
  let emoji = '✨';
  switch (primary) {
    case 'fire':
      pattern = `radial-gradient(circle at 80% 90%, ${c1}55 0, transparent 30%),
        repeating-radial-gradient(circle at 50% 110%, ${c1}22 0, transparent 24px)`;
      particleClass = 'pe_fire';
      emoji = '🔥';
      break;
    case 'water':
      pattern = `repeating-linear-gradient(-30deg, ${c1}11 0, transparent 12px, ${c1}22 16px, transparent 24px)`;
      particleClass = 'pe_water';
      emoji = '💧';
      break;
    case 'electric':
      pattern = `repeating-linear-gradient(115deg, transparent 0, transparent 30px, ${c1}55 30px, ${c1}55 32px)`;
      particleClass = 'pe_electric';
      emoji = '⚡';
      break;
    case 'grass':
      pattern = `radial-gradient(circle at 12% 86%, ${c1}55 0, transparent 28%), radial-gradient(circle at 90% 14%, ${c1}33 0, transparent 22%)`;
      particleClass = 'pe_grass';
      emoji = '🌿';
      break;
    case 'ice':
      pattern = `radial-gradient(circle at 30% 30%, ${c1}33 0, transparent 22%), radial-gradient(circle at 70% 70%, ${c1}33 0, transparent 22%)`;
      particleClass = 'pe_ice';
      emoji = '❄️';
      break;
    case 'psychic':
      pattern = `conic-gradient(from 0deg at 50% 50%, ${c1}33, transparent, ${c1}33, transparent, ${c1}33)`;
      particleClass = 'pe_psychic';
      emoji = '🔮';
      break;
    case 'ghost':
      pattern = `radial-gradient(circle at 30% 70%, ${c1}66 0, transparent 35%), radial-gradient(circle at 70% 30%, ${c1}33 0, transparent 35%)`;
      particleClass = 'pe_ghost';
      emoji = '👻';
      break;
    case 'dragon':
      pattern = `linear-gradient(135deg, ${c1}33 0%, transparent 30%, ${c1}33 60%, transparent 90%)`;
      particleClass = 'pe_dragon';
      emoji = '🐉';
      break;
    case 'dark':
      pattern = `radial-gradient(ellipse at center, transparent 30%, ${c1}55 100%)`;
      particleClass = 'pe_dark';
      emoji = '🌑';
      break;
    case 'fairy':
      pattern = `radial-gradient(circle at 22% 22%, ${c1}55 0, transparent 18%), radial-gradient(circle at 80% 80%, ${c1}55 0, transparent 18%), radial-gradient(circle at 50% 50%, ${c1}33 0, transparent 26%)`;
      particleClass = 'pe_fairy';
      emoji = '🧚';
      break;
    case 'fighting':
      pattern = `repeating-linear-gradient(-15deg, transparent 0, transparent 18px, ${c1}33 18px, ${c1}33 22px)`;
      particleClass = 'pe_default';
      emoji = '🥊';
      break;
    case 'poison':
      pattern = `radial-gradient(circle at 30% 70%, ${c1}55 0, transparent 30%), radial-gradient(circle at 70% 30%, ${c1}33 0, transparent 25%)`;
      particleClass = 'pe_poison';
      emoji = '☠️';
      break;
    case 'rock':
      pattern = `repeating-linear-gradient(45deg, ${c1}22 0, transparent 12px, ${c1}33 18px, transparent 30px)`;
      particleClass = 'pe_default';
      emoji = '⛰️';
      break;
    case 'ground':
      pattern = `linear-gradient(180deg, transparent 60%, ${c1}55 100%), repeating-linear-gradient(0deg, ${c1}11 0, transparent 8px)`;
      particleClass = 'pe_default';
      emoji = '🪨';
      break;
    case 'flying':
      pattern = `repeating-linear-gradient(75deg, transparent 0, transparent 50px, ${c1}33 50px, ${c1}33 52px)`;
      particleClass = 'pe_flying';
      emoji = '🪶';
      break;
    case 'bug':
      pattern = `radial-gradient(circle at 22% 22%, ${c1}33 0, transparent 18%), radial-gradient(circle at 80% 60%, ${c1}33 0, transparent 18%)`;
      particleClass = 'pe_default';
      emoji = '🐛';
      break;
    case 'steel':
      pattern = `repeating-linear-gradient(135deg, transparent 0, transparent 22px, ${c1}33 22px, ${c1}33 24px)`;
      particleClass = 'pe_default';
      emoji = '🛡️';
      break;
    case 'normal':
    default:
      pattern = `radial-gradient(circle at 50% 50%, ${c1}22 0, transparent 50%)`;
      particleClass = 'pe_default';
      emoji = '✨';
      break;
  }

  return { background, pattern, glow, particleClass, emoji };
}
