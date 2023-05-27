import { BattleStateType } from './battleSlice';

export const selectBattleUser = (state: { battle: BattleStateType }) =>
  state.battle.user;
export const selectBattleComputer = (state: { battle: BattleStateType }) =>
  state.battle.computer;

export const selectIsGameStarted = (state: { battle: BattleStateType }) =>
  state.battle.game.isStarted;

export const selectIsGamePaused = (state: { battle: BattleStateType }) =>
  state.battle.game.isPaused;

export const selectIsGameEnded = (state: { battle: BattleStateType }) =>
  state.battle.game.isEnded;

  export const selectUserMove = (state: { battle: BattleStateType }) =>
  state.battle.game.userMove;

  
  export const selectComputerMove = (state: { battle: BattleStateType }) =>
  state.battle.game.computerMove;