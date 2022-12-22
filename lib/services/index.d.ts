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
    calcCalorieConumptionSpecific: (type: import("..").ActivityType, level: number, weight: number, totalDistance: number, avgpower: number, totalTime: number) => number;
    calcCalorieRequirements: (mb: number, level: number) => number;
};
export declare const ACTIVITY: {
    initNewActivity: (type: import("..").ActivityType, name: string) => import("..").Activity;
    calcActivitySettings: (type: import("..").ActivityType) => import("..").ActivitySettings;
    convertDataFromJsonTE: (content: {
        data: import("../models/telemetryExtractor").TelemetryExport;
        fps: string;
    }, newActivity: import("..").Activity) => import("..").Activity;
    convertDataFromGPX: (content: string, newActivity: import("..").Activity) => import("..").Activity;
    normilizeTelemetryJSON: (message: string) => {
        data: import("../models/telemetryExtractor").TelemetryExport;
        fps: string;
    };
    convertStravaTypeToGinkgo: (type: string, sport_type: string, workout_type: number | undefined) => import("..").ActivityType;
    fromStravaActivityToGinkgoActivity: (stravaActivity: import("..").StravaActivity, userInfo: {
        activityLevel: number;
        id: string;
        username: string;
        gender: string;
        weight: number;
        height: number;
        birthdate: string;
    }) => import("..").Activity | null | undefined;
};
export declare const MAP: {
    calcBearing: (startLat: number, startLng: number, destLat: number, destLng: number) => number;
    toDegrees: (radians: number) => number;
    toRad: (value: number) => number;
    calcCrow: (lat1: number, lon1: number, lat2: number, lon2: number) => number;
};
