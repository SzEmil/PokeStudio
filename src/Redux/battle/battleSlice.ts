import { createSlice } from '@reduxjs/toolkit';
import { fetchAIPokemons } from './battleOperations';

// type PokeData = Record<string, unknown>;

type statType = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};

type cardsData = {
  overview?: {
    stats: statType[];
    id: number;
    name?: string;
  };
};

type PokemonOnArenaComputer = {
  stats: statType[];
  id: number;
  name?: string;
};

export type BattleStateType = {
  user: {
    cards: cardsData[];
    pokemonOnArena: null | cardsData;
  };
  computer: {
    cards: PokemonOnArenaComputer[] | null;
    pokemonOnArena: null | PokemonOnArenaComputer;
  };
  game: {
    isStarted: boolean;
    isPaused: boolean;
    isEnded: boolean;
    userMove: boolean;
    computerMove: boolean;
  };
};

const battleInitialState: BattleStateType = {
  user: {
    cards: [],
    pokemonOnArena: null,
  },
  computer: {
    cards: [],
    pokemonOnArena: null,
  },
  game: {
    isStarted: false,
    isPaused: false,
    isEnded: false,
    userMove: false,
    computerMove: false,
  },
};

const battleSlice = createSlice({
  name: 'battle',
  initialState: battleInitialState,
  reducers: {
    setUserBattleCards(state, action) {
      state.user.cards?.push(action.payload);
    },
    deleteUserBattleCards(state, action) {
      const cardIdToDelete = action.payload;
      state.user.cards = state.user.cards.filter(card => {
        return card.overview?.id !== cardIdToDelete;
      });
    },
    addToArena(state, action) {
      state.user.pokemonOnArena = action.payload;
    },
    addToArenaComputer(state, action) {
      state.computer.pokemonOnArena = action.payload;
    },
    damageForComputer(state, action) {
      state.computer.pokemonOnArena!.stats[0].base_stat = action.payload.health;
      const cardIndex = state.computer.cards!.findIndex(
        card => card.id === action.payload.id
      );
      state.computer.cards![cardIndex].stats[0].base_stat =
        action.payload.health;

      state.game.userMove = false;
      state.game.computerMove = true;
    },
    damageForUser(state, action) {
      if (state.user.pokemonOnArena === null) return;
      state.user.pokemonOnArena!.overview!.stats[0].base_stat =
        action.payload.health;
      const cardIndex = state.user.cards!.findIndex(
        card => card.overview!.id === action.payload.id
      );
      state.user.cards![cardIndex].overview!.stats[0].base_stat =
        action.payload.health;

      state.game.userMove = true;
      state.game.computerMove = false;
    },
    defendUser(state) {
      state.game.userMove = false;
      state.game.computerMove = true;
    },
    defendComputer(state) {
      state.game.userMove = true;
      state.game.computerMove = false;
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
      state.game.isEnded = false;
    },
    stopGame(state) {
      state.game.isPaused = false;
      state.game.isStarted = false;
      state.game.isEnded = true;
      state.computer.pokemonOnArena = null;
      state.user.pokemonOnArena = null;
      state.computer.cards = [];
      state.user.cards = [];
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
  damageForComputer,
  startGame,
  stopGame,
  addToArenaComputer,
  damageForUser,
  defendUser,
  defendComputer,
} = battleSlice.actions;
export const battleReducer = battleSlice.reducer;
