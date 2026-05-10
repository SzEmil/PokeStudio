import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type StatsState = {
  battlesWon: number;
  battlesLost: number;
  packsOpened: number;
  legendaryPulled: number;
  cardsCollected: number;
  cardsSold: number;
  achievements: string[];
  dailyClaimed: string | null; // todayKey
  dailyStreak: number;
  questCompleted: string[];
  /* XP & level system */
  xp: number;
  /* Mini-games */
  whosThatPokemonStreak: number;
  whosThatPokemonBest: number;
  triviaCorrect: number;
  triviaPlayed: number;
  catchesAttempted: number;
  catchesSucceeded: number;
};

const initialState: StatsState = {
  battlesWon: 0,
  battlesLost: 0,
  packsOpened: 0,
  legendaryPulled: 0,
  cardsCollected: 0,
  cardsSold: 0,
  achievements: [],
  dailyClaimed: null,
  dailyStreak: 0,
  questCompleted: [],
  xp: 0,
  whosThatPokemonStreak: 0,
  whosThatPokemonBest: 0,
  triviaCorrect: 0,
  triviaPlayed: 0,
  catchesAttempted: 0,
  catchesSucceeded: 0,
};

const slice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    addBattleWon(state) {
      state.battlesWon += 1;
      state.xp += 60;
    },
    addBattleLost(state) {
      state.battlesLost += 1;
      state.xp += 10;
    },
    addPackOpened(state, action: PayloadAction<{ legendary?: boolean }>) {
      state.packsOpened += 1;
      state.xp += 8;
      if (action.payload?.legendary) {
        state.legendaryPulled += 1;
        state.xp += 50;
      }
    },
    addCardCollected(state) {
      state.cardsCollected += 1;
      state.xp += 4;
    },
    addCardSold(state) {
      state.cardsSold += 1;
      state.xp += 2;
    },
    unlockAchievement(state, action: PayloadAction<string>) {
      if (!state.achievements.includes(action.payload)) {
        state.achievements.push(action.payload);
        state.xp += 25;
      }
    },
    setDailyClaimed(state, action: PayloadAction<string>) {
      state.dailyClaimed = action.payload;
      state.dailyStreak += 1;
      state.xp += 10;
    },
    completeQuest(state, action: PayloadAction<string>) {
      if (!state.questCompleted.includes(action.payload)) {
        state.questCompleted.push(action.payload);
      }
    },
    addXp(state, action: PayloadAction<number>) {
      state.xp += action.payload;
    },
    /* Who's That Pokémon? */
    whosThatGuessCorrect(state) {
      state.whosThatPokemonStreak += 1;
      if (state.whosThatPokemonStreak > state.whosThatPokemonBest) {
        state.whosThatPokemonBest = state.whosThatPokemonStreak;
      }
      state.xp += 6;
    },
    whosThatGuessWrong(state) {
      state.whosThatPokemonStreak = 0;
    },
    whosThatReset(state) {
      state.whosThatPokemonStreak = 0;
    },
    /* Trivia */
    triviaAnswer(state, action: PayloadAction<{ correct: boolean }>) {
      state.triviaPlayed += 1;
      if (action.payload.correct) {
        state.triviaCorrect += 1;
        state.xp += 5;
      }
    },
    /* Wild encounter */
    catchAttempt(state, action: PayloadAction<{ success: boolean }>) {
      state.catchesAttempted += 1;
      if (action.payload.success) {
        state.catchesSucceeded += 1;
        state.xp += 12;
      }
    },
    resetStats(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  addBattleWon,
  addBattleLost,
  addPackOpened,
  addCardCollected,
  addCardSold,
  unlockAchievement,
  setDailyClaimed,
  completeQuest,
  addXp,
  whosThatGuessCorrect,
  whosThatGuessWrong,
  whosThatReset,
  triviaAnswer,
  catchAttempt,
  resetStats,
} = slice.actions;
export const statsReducer = slice.reducer;

/* Level math:
   Each level requires (level * 100) XP. Total to reach L =  L*(L-1)/2 * 100.
   Solve: xp = N*(N-1)/2*100 -> N = (1 + sqrt(1 + 8*xp/100)) / 2 */
export function levelFromXp(xp: number): {
  level: number;
  current: number;
  needed: number;
  totalForCurrent: number;
  pct: number;
} {
  const level = Math.floor((1 + Math.sqrt(1 + (8 * xp) / 100)) / 2);
  const totalForCurrent = (level * (level - 1) / 2) * 100;
  const totalForNext = ((level + 1) * level / 2) * 100;
  const current = xp - totalForCurrent;
  const needed = totalForNext - totalForCurrent;
  const pct = needed > 0 ? (current / needed) * 100 : 0;
  return { level, current, needed, totalForCurrent, pct };
}

export const LEVEL_TITLES = [
  { from: 1, title: 'Aspiring Trainer' },
  { from: 5, title: 'Rookie Trainer' },
  { from: 10, title: 'Skilled Trainer' },
  { from: 20, title: 'Pro Trainer' },
  { from: 35, title: 'Elite Trainer' },
  { from: 50, title: 'Master Trainer' },
  { from: 80, title: 'Champion' },
];

export function levelTitle(level: number): string {
  let t = LEVEL_TITLES[0].title;
  for (const lt of LEVEL_TITLES) if (level >= lt.from) t = lt.title;
  return t;
}
