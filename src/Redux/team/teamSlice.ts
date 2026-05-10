import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TeamSlot = {
  id: number;
  name: string;
  sprite: string;
  types: string[];
  stats: { name: string; value: number }[];
  total: number;
} | null;

export type TeamState = {
  slots: TeamSlot[]; // length 6
  name: string;
};

const empty: TeamSlot[] = [null, null, null, null, null, null];

const initialState: TeamState = {
  slots: empty,
  name: 'Dream Team',
};

const slice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    setSlot(state, action: PayloadAction<{ index: number; pokemon: TeamSlot }>) {
      const { index, pokemon } = action.payload;
      state.slots[index] = pokemon;
    },
    clearSlot(state, action: PayloadAction<number>) {
      state.slots[action.payload] = null;
    },
    renameTeam(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    clearTeam(state) {
      state.slots = [null, null, null, null, null, null];
    },
  },
});

export const { setSlot, clearSlot, renameTeam, clearTeam } = slice.actions;
export const teamReducer = slice.reducer;
