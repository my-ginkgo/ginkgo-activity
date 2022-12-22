import { ActivityBlocks, ActivityMetrics, ActivitySettings, ActivityType, ActivityUserInfo, MetabolicMetrics } from '../models/activity.model';
declare const _default: {
    calcAll: (blocks: ActivityBlocks, settings: ActivitySettings, userInfo: ActivityUserInfo, metrics: ActivityMetrics, type: ActivityType) => MetabolicMetrics;
    calcCalorieConumptionSpecific: (type: ActivityType, level: number, weight: number, totalDistance: number, avgpower: number, totalTime: number) => number;
    calcCalorieRequirements: (mb: number, level: number) => number;
};
export default _default;
