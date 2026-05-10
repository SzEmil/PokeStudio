export type Achievement = {
  id: string;
  name: string;
  description: string;
  icon: string; // emoji or label
  test: (s: {
    battlesWon: number;
    battlesLost: number;
    packsOpened: number;
    legendaryPulled: number;
    cardsCollected: number;
    cardsSold: number;
    dailyStreak: number;
  }) => boolean;
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-pack',
    name: 'New Trainer',
    description: 'Open your first booster pack.',
    icon: '🎁',
    test: s => s.packsOpened >= 1,
  },
  {
    id: 'pack-collector',
    name: 'Pack Collector',
    description: 'Open 10 booster packs.',
    icon: '📦',
    test: s => s.packsOpened >= 10,
  },
  {
    id: 'pack-master',
    name: 'Pack Master',
    description: 'Open 50 booster packs.',
    icon: '🏆',
    test: s => s.packsOpened >= 50,
  },
  {
    id: 'legendary-pulled',
    name: 'Touched by Legend',
    description: 'Pull a legendary Pokémon from a pack.',
    icon: '🌟',
    test: s => s.legendaryPulled >= 1,
  },
  {
    id: 'legendary-trio',
    name: 'Mythic Trio',
    description: 'Pull 3 legendary Pokémon.',
    icon: '✨',
    test: s => s.legendaryPulled >= 3,
  },
  {
    id: 'first-win',
    name: 'First Victory',
    description: 'Win your first battle in the Arena.',
    icon: '⚔️',
    test: s => s.battlesWon >= 1,
  },
  {
    id: 'champion',
    name: 'Arena Champion',
    description: 'Win 10 battles.',
    icon: '👑',
    test: s => s.battlesWon >= 10,
  },
  {
    id: 'undefeated',
    name: 'Undefeated',
    description: 'Win 25 battles.',
    icon: '🛡️',
    test: s => s.battlesWon >= 25,
  },
  {
    id: 'collector',
    name: 'Collector',
    description: 'Add 10 Pokémon to your shelf.',
    icon: '📚',
    test: s => s.cardsCollected >= 10,
  },
  {
    id: 'tycoon',
    name: 'Pokémon Tycoon',
    description: 'Quick-sell 10 Pokémon.',
    icon: '💰',
    test: s => s.cardsSold >= 10,
  },
  {
    id: 'persistent',
    name: 'Daily Dedication',
    description: 'Claim 7 daily quests in a row.',
    icon: '📅',
    test: s => s.dailyStreak >= 7,
  },
  {
    id: 'underdog',
    name: 'Lessons Learned',
    description: 'Lose 5 battles. Don’t worry, every loss makes you stronger.',
    icon: '🔥',
    test: s => s.battlesLost >= 5,
  },
];
