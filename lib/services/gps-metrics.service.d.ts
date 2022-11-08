import { ActivityBlocks, ActivitySettings, ActivityType, ActivityUserInfo, GpsMetrics } from '../models/activity.model';
export declare const calcAll: (blocks: ActivityBlocks, settings: ActivitySettings, userInfo: ActivityUserInfo, type: ActivityType) => Partial<GpsMetrics>;
export declare const calcValues: (blocks: ActivityBlocks) => Pick<GpsMetrics, 'altitudeMin' | 'altitudeMax' | 'totalDistance' | 'speedMax' | 'speedMin' | 'totalTime' | 'avgSpeed' | 'avgAltitude'>;
export declare const calcRanges: (blocks: ActivityBlocks, settings: ActivitySettings) => Partial<GpsMetrics>;
