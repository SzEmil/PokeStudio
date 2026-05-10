import { StatsState } from './statsSlice';

export const selectStats = (s: { stats: StatsState }) => s.stats;
export const selectAchievements = (s: { stats: StatsState }) => s.stats.achievements;
