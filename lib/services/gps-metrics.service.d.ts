import { ActivityBlocks, ActivitySettings, GpsMetrics } from '../models';
export declare const calcAll: (blocks: ActivityBlocks, settings: ActivitySettings) => Partial<GpsMetrics>;
export declare const calcValues: (blocks: ActivityBlocks) => Pick<GpsMetrics, 'altitudeMin' | 'altitudeMax' | 'totalDistance' | 'speedMax' | 'speedMin' | 'totalTime' | 'avgSpeed' | 'avgAltitude'>;
export declare const calcRanges: (blocks: ActivityBlocks, settings: ActivitySettings) => Partial<GpsMetrics>;
declare const _default: {
    calcAll: (blocks: ActivityBlocks, settings: ActivitySettings) => Partial<GpsMetrics>;
    calcValues: (blocks: ActivityBlocks) => Pick<GpsMetrics, "altitudeMin" | "altitudeMax" | "totalDistance" | "speedMax" | "speedMin" | "totalTime" | "avgSpeed" | "avgAltitude">;
    calcRanges: (blocks: ActivityBlocks, settings: ActivitySettings) => Partial<GpsMetrics>;
};
export default _default;
