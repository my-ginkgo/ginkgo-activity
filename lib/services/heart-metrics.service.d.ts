import { ActivityBlocks, ActivitySettings, HeartMetrics } from '../models/activity.model';
export declare const calcAll: (blocks: ActivityBlocks, settings: ActivitySettings) => Partial<HeartMetrics>;
export declare const calcValues: (blocks: ActivityBlocks) => Pick<HeartMetrics, 'hrMax' | 'hrMin' | 'avgHr'>;
export declare const calcRanges: (blocks: ActivityBlocks, settings: ActivitySettings) => Pick<HeartMetrics, 'heartRanges'>;
declare const _default: {
    calcAll: (blocks: ActivityBlocks, settings: ActivitySettings) => Partial<HeartMetrics>;
    calcValues: (blocks: ActivityBlocks) => Pick<HeartMetrics, "hrMax" | "hrMin" | "avgHr">;
    calcRanges: (blocks: ActivityBlocks, settings: ActivitySettings) => Pick<HeartMetrics, "heartRanges">;
};
export default _default;
