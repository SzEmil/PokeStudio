import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAIPokemons } from './battleOperations';

type Stat = {
  base_stat: number;
  effort: number;
  stat: { name: string; url: string };
};

type Card = any;

export type BattleStateType = {
  user: {
    cards: Card[];
    pokemonOnArena: null | Card;
  };
  computer: {
    cards: any[] | null;
    pokemonOnArena: null | any;
  };
  game: {
    isStarted: boolean;
    isPaused: boolean;
    isEnded: boolean;
    userMove: boolean;
    computerMove: boolean;
  };
};

const initial: BattleStateType = {
  user: { cards: [], pokemonOnArena: null },
  computer: { cards: [], pokemonOnArena: null },
  game: {
    isStarted: false,
    isPaused: false,
    isEnded: false,
    userMove: false,
    computerMove: false,
  },
};

const slice = createSlice({
  name: 'battle',
  initialState: initial,
  reducers: {
    setUserBattleCards(state, action) {
      state.user.cards.push(action.payload);
    },
    deleteUserBattleCards(state, action: PayloadAction<number>) {
      state.user.cards = state.user.cards.filter(c => c.overview?.id !== action.payload);
    },
    addToArena(state, action) {
      state.user.pokemonOnArena = action.payload;
    },
    addToArenaComputer(state, action) {
      state.computer.pokemonOnArena = action.payload;
    },
    setUserHp(state, action: PayloadAction<{ id: number; hp: number }>) {
      const { id, hp } = action.payload;
      if (state.user.pokemonOnArena?.overview?.id === id) {
        const stats: Stat[] = state.user.pokemonOnArena.overview.stats;
        const i = stats.findIndex(s => s.stat.name === 'hp');
        if (i >= 0) stats[i].base_stat = hp;
      }
      const card = state.user.cards.find(c => c.overview?.id === id);
      if (card) {
        const stats: Stat[] = card.overview.stats;
        const i = stats.findIndex(s => s.stat.name === 'hp');
        if (i >= 0) stats[i].base_stat = hp;
      }
    },
    setComputerHp(state, action: PayloadAction<{ id: number; hp: number }>) {
      const { id, hp } = action.payload;
      if (state.computer.pokemonOnArena?.id === id) {
        const stats: Stat[] = state.computer.pokemonOnArena.stats;
        const i = stats.findIndex(s => s.stat.name === 'hp');
        if (i >= 0) stats[i].base_stat = hp;
      }
      if (state.computer.cards) {
        const card = state.computer.cards.find(c => c.id === id);
        if (card) {
          const stats: Stat[] = card.stats;
          const i = stats.findIndex(s => s.stat.name === 'hp');
          if (i >= 0) stats[i].base_stat = hp;
        }
      }
    },
    setTurn(state, action: PayloadAction<'user' | 'computer'>) {
      state.game.userMove = action.payload === 'user';
      state.game.computerMove = action.payload === 'computer';
    },
    startGame(state) {
      state.game.isStarted = true;
      state.game.isPaused = false;
      state.game.isEnded = false;
      state.game.computerMove = false;
      state.game.userMove = true;
    },
    pauseGame(state) {
      state.game.isPaused = true;
    },
    stopGame(state) {
      state.game.isPaused = false;
      state.game.isStarted = false;
      state.game.isEnded = true;
      state.computer.pokemonOnArena = null;
      state.user.pokemonOnArena = null;
      state.computer.cards = [];
    },
    resetBattleSquads(state) {
      state.user.cards = [];
      state.computer.cards = [];
      state.user.pokemonOnArena = null;
      state.computer.pokemonOnArena = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchAIPokemons.fulfilled, (state, action) => {
      state.computer.cards = [...action.payload];
    });
  },
});

export const {
  setUserBattleCards,
  deleteUserBattleCards,
  addToArena,
  addToArenaComputer,
  setUserHp,
  setComputerHp,
  setTurn,
  startGame,
  pauseGame,
  stopGame,
  resetBattleSquads,
} = slice.actions;

export const battleReducer = slice.reducer;
