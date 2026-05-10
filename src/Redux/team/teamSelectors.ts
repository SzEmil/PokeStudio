import { TeamState } from './teamSlice';

export const selectTeam = (s: { team: TeamState }) => s.team;
export const selectTeamSlots = (s: { team: TeamState }) => s.team.slots;
