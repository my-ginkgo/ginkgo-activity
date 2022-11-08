export declare const GPSMetrics: {
    calcAll: (blocks: import("./models").ActivityBlocks, settings: import("./models").ActivitySettings, userInfo: import("./models").ActivityUserInfo, type: import("./models").ActivityType) => Partial<import("./models").GpsMetrics>;
    calcValues: (blocks: import("./models").ActivityBlocks) => Pick<import("./models").GpsMetrics, "altitudeMin" | "altitudeMax" | "totalDistance" | "speedMax" | "speedMin" | "totalTime" | "avgSpeed" | "avgAltitude">;
    calcRanges: (blocks: import("./models").ActivityBlocks, settings: import("./models").ActivitySettings) => Partial<import("./models").GpsMetrics>;
};
