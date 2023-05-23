import { createSlice } from '@reduxjs/toolkit';
import { fetchAIPokemons } from './battleOperations';

type PokeData = Record<string, unknown>;

type cardsData = {
  overview?: {
    id: number;
  };
};
export type BattleStateType = {
  user: {
    cards: cardsData[];
  };
  computer: {
    cards: PokeData[] | null;
  };
};

const battleInitialState: BattleStateType = {
  user: {
    cards: [],
  },
  computer: {
    cards: [],
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
  },
  extraReducers(builder) {
    builder.addCase(fetchAIPokemons.fulfilled, (state, action) => {
      state.computer.cards = [...action.payload];
    });
  },
});

export const { setUserBattleCards, deleteUserBattleCards } =
  battleSlice.actions;
export const battleReducer = battleSlice.reducer;
