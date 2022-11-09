export declare const GPS: {
    calcAll: (blocks: import("..").ActivityBlocks, settings: import("..").ActivitySettings) => Partial<import("..").GpsMetrics>;
    calcValues: (blocks: import("..").ActivityBlocks) => Pick<import("..").GpsMetrics, "altitudeMin" | "altitudeMax" | "totalDistance" | "speedMax" | "speedMin" | "totalTime" | "avgSpeed" | "avgAltitude">;
    calcRanges: (blocks: import("..").ActivityBlocks, settings: import("..").ActivitySettings) => Partial<import("..").GpsMetrics>;
};
export declare const HR: {
    calcAll: (blocks: import("..").ActivityBlocks, settings: import("..").ActivitySettings) => Partial<import("..").HeartMetrics>;
    calcValues: (blocks: import("..").ActivityBlocks) => Pick<import("..").HeartMetrics, "hrMax" | "hrMin" | "avgHr">;
    calcRanges: (blocks: import("..").ActivityBlocks, settings: import("..").ActivitySettings) => Pick<import("..").HeartMetrics, "heartRanges">;
};
export declare const MP: {
    calcAll: (blocks: import("..").ActivityBlocks, settings: import("..").ActivitySettings, userInfo: import("..").ActivityUserInfo, metrics: import("..").ActivityMetrics, type: import("..").ActivityType) => import("..").MetabolicMetrics;
};
