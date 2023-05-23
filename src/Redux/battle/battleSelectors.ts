import { BattleStateType } from './battleSlice';

export const selectBattleUser = (state: { battle: BattleStateType }) =>
  state.battle.user;
  export const selectBattleComputer = (state: { battle: BattleStateType }) =>
  state.battle.computer;