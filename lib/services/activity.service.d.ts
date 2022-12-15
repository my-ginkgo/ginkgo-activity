import { Activity, ActivitySettings, ActivityType } from '../models';
import { TelemetryExport } from '../models/telemetryExtractor';
export declare const initNewActivity: (type: ActivityType, name: string) => Activity;
export declare const calcActivitySettings: (type: ActivityType) => ActivitySettings;
export declare const convertDataFromJsonTE: (content: {
    data: TelemetryExport;
    fps: string;
}, newActivity: Activity) => Activity;
export declare const convertDataFromGPX: (content: string, newActivity: Activity) => Activity;
export declare const normilizeTelemetryJSON: (message: string) => {
    data: TelemetryExport;
    fps: string;
};
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
};
export default _default;
