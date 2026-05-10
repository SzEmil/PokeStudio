import { PokemonType, GENERATIONS, TYPE_COLORS } from '../data/types';

export const POKE_API = 'https://pokeapi.co/api/v2';

export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function prettyName(name: string): string {
  if (!name) return '';
  return name
    .split('-')
    .map(capitalize)
    .join(' ');
}

export function pokeIdFromUrl(url: string): number {
  const match = url.match(/\/pokemon\/(\d+)\/?/);
  return match ? Number(match[1]) : 0;
}

export function paddedId(id: number): string {
  return `#${String(id).padStart(4, '0')}`;
}

export function spriteHome(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;
}

export function spriteOfficial(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export function spritePixel(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

export function spritePixelBack(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`;
}

export function generationOf(id: number) {
  return GENERATIONS.find(g => id >= g.range[0] && id <= g.range[1]) ?? GENERATIONS[0];
}

/* Stat helpers */
export type SimpleStat = {
  base_stat: number;
  effort: number;
  stat: { name: string; url: string };
};

export function getStat(stats: SimpleStat[], name: string): number {
  return stats.find(s => s.stat.name === name)?.base_stat ?? 0;
}

export function totalStats(stats: SimpleStat[]): number {
  return stats.reduce((sum, s) => sum + s.base_stat, 0);
}

/* Card rarity from base_experience or stat total */
export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export function rarityFromExperience(exp: number): Rarity {
  if (exp >= 300) return 'legendary';
  if (exp >= 250) return 'epic';
  if (exp >= 180) return 'rare';
  if (exp >= 110) return 'uncommon';
  return 'common';
}

export const RARITY_GLOW: Record<Rarity, string> = {
  common: 'rgba(180, 200, 220, 0.45)',
  uncommon: 'rgba(122, 199, 76, 0.55)',
  rare: 'rgba(99, 144, 240, 0.6)',
  epic: 'rgba(167, 100, 239, 0.7)',
  legendary: 'rgba(255, 203, 5, 0.85)',
};

export const RARITY_LABEL: Record<Rarity, string> = {
  common: 'Common',
  uncommon: 'Uncommon',
  rare: 'Rare',
  epic: 'Epic',
  legendary: 'Legendary',
};

/* Type extraction */
export function getTypes(overview: any): PokemonType[] {
  if (!overview?.types) return [];
  return overview.types.map((t: any) => t.type.name as PokemonType);
}

export function typeGradient(types: PokemonType[]): string {
  if (types.length === 0) return 'linear-gradient(135deg, #2b2f3a, #1b1e28)';
  if (types.length === 1) {
    const c = TYPE_COLORS[types[0]];
    return `linear-gradient(135deg, ${c}cc 0%, ${c}55 60%, transparent 100%)`;
  }
  const c1 = TYPE_COLORS[types[0]];
  const c2 = TYPE_COLORS[types[1]];
  return `linear-gradient(135deg, ${c1}cc 0%, ${c2}cc 100%)`;
}

/* Battle math */
export function damageCalc({
  attackerLevel = 50,
  attackerStat,
  defenderStat,
  movePower,
  effectiveness,
  isSpecial = false,
  isCrit = false,
  stab = 1,
  random = Math.random(),
}: {
  attackerLevel?: number;
  attackerStat: number;
  defenderStat: number;
  movePower: number;
  effectiveness: number;
  isSpecial?: boolean;
  isCrit?: boolean;
  stab?: number;
  random?: number;
}): number {
  const _ = isSpecial; void _; // signalled for future logic
  // Simplified Pokemon damage formula
  const base =
    (((2 * attackerLevel) / 5 + 2) * movePower * (attackerStat / Math.max(1, defenderStat))) / 50 + 2;
  const critMod = isCrit ? 1.5 : 1;
  const rand = 0.85 + random * 0.15; // 0.85 - 1.0
  return Math.round(base * critMod * stab * effectiveness * rand);
}

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function todayKey(): string {
  const t = new Date();
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`;
}

export function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}
