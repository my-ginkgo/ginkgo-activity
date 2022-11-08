export declare const GPSMetrics: {
    calcAll: (blocks: import("../models").ActivityBlocks, settings: import("../models").ActivitySettings) => Partial<import("../models").GpsMetrics>;
    calcValues: (blocks: import("../models").ActivityBlocks) => Pick<import("../models").GpsMetrics, "altitudeMin" | "altitudeMax" | "totalDistance" | "speedMax" | "speedMin" | "totalTime" | "avgSpeed" | "avgAltitude">;
    calcRanges: (blocks: import("../models").ActivityBlocks, settings: import("../models").ActivitySettings) => Partial<import("../models").GpsMetrics>;
};
export declare const HRMetrics: {
    calcAll: (blocks: import("../models").ActivityBlocks, settings: import("../models").ActivitySettings) => Partial<import("../models").HeartMetrics>;
    calcValues: (blocks: import("../models").ActivityBlocks) => Pick<import("../models").HeartMetrics, "hrMax" | "hrMin" | "avgHr">;
    calcRanges: (blocks: import("../models").ActivityBlocks, settings: import("../models").ActivitySettings) => Pick<import("../models").HeartMetrics, "heartRanges">;
};
