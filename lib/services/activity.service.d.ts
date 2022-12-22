import { Activity, ActivitySettings, ActivityType, StravaActivity } from '../models';
import { TelemetryExport } from '../models/telemetryExtractor';
declare const _default: {
    initNewActivity: (type: ActivityType, name: string) => Activity;
    calcActivitySettings: (type: ActivityType) => ActivitySettings;
    convertDataFromJsonTE: (content: {
        data: TelemetryExport;
        fps: string;
    }, newActivity: Activity) => Activity;
    convertDataFromGPX: (content: string, newActivity: Activity) => Activity;
    normilizeTelemetryJSON: (message: string) => {
        data: TelemetryExport;
        fps: string;
    };
    convertStravaTypeToGinkgo: (type: string, sport_type: string, workout_type: number | undefined) => ActivityType;
    fromStravaActivityToGinkgoActivity: (stravaActivity: StravaActivity, userId: string, userInfo: {
        activityLevel: number;
        id: string;
        username: string;
        gender: string;
        weight: number;
        height: number;
        birthdate: string;
    }) => Activity;
};
export default _default;
