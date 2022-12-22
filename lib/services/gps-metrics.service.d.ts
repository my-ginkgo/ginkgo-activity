import { ActivityBlocks, ActivitySettings, GpsMetrics } from '../models';
declare const _default: {
    calcAll: (blocks: ActivityBlocks, settings: ActivitySettings) => Partial<GpsMetrics>;
    calcValues: (blocks: ActivityBlocks) => Pick<GpsMetrics, "altitudeMin" | "altitudeMax" | "totalDistance" | "speedMax" | "speedMin" | "totalTime" | "avgSpeed" | "avgAltitude">;
    calcRanges: (blocks: ActivityBlocks, settings: ActivitySettings) => Partial<GpsMetrics>;
};
export default _default;
