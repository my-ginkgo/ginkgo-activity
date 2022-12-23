import {Media} from './media.model';
import {KeyValue} from './ng-keyvalue.model';

export declare interface IDevice {
    deviceId: string;
    name: string;
    services: any[];
    connected: boolean;
    type: DeviceTypeEnum;
    info: DeviceInfo | null;
    batteryLevel: number;
}

export declare interface DeviceInfo {
    model: string;
    serialNr: string;
    swVersion: string;
    hwVersion: string;
    fwVersion: string;
    manufacturerName: string;
}

export declare interface WeatherBlock {
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
    current: Current;
    hourly: Current[];
    daily: Daily[];
}

export declare interface Current {
    dt: number;
    sunrise?: number;
    sunset?: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: Weather[];
    pop?: number;
}

export declare interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export declare interface Daily {
    dt: number;
    sunrise: number;
    sunset: number;
    moonrise: number;
    moonset: number;
    moon_phase: number;
    temp: Temp;
    feels_like: FeelsLike;
    pressure: number;
    humidity: number;
    dew_point: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: Weather[];
    clouds: number;
    pop: number;
    uvi: number;
    rain?: number;
}

export declare interface FeelsLike {
    day: number;
    night: number;
    eve: number;
    morn: number;
}

export declare interface Temp {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
}

export enum DeviceTypeEnum {
    unknown = 'Unknown',
    gopro = 'GoPro',
    hr = 'Heart Rate',
    phone = 'Phone',
}

export declare interface RxDBActivityData {
    id: string;
    blocks: ActivityBlocks;
}

export enum ReactionType {
    // @ts-ignore
    LIKE = 'like',
    // @ts-ignore
    APPLAUSE = 'applause',
    // @ts-ignore
    LOVE = 'love',
    // @ts-ignore
    REMOVE = 'remove'
}

export declare interface Reaction {
    user: { id: string; username: string; avatar: string },
    date: number,
    type: ReactionType
}

export declare interface Activity {
    name: string;
    type: ActivityType;
    blocks: ActivityBlocks;
    id: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    metrics: ActivityMetrics;
    settings: ActivitySettings;
    istants: ActivityIstants;
    devices: IDevice[];
    drills?: Drill[];
    media?: Media[];
    status: ActivityStatus;
    provider: ActivityProvider;
    cuts?: Cut[];
    userInfo: ActivityUserInfo | null;
    reactions: Reaction[];
    startDate: Date;
}


export enum ActivityProvider {
    ginkgo = 'Ginkgo',
    strava = 'Strava'
}

export declare interface Drill {
    name: string;
    id: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    metrics: ActivityMetrics;
    settings: ActivitySettings;
    start: number;
    end: number;
}

export declare interface Cut {
    name: string;
    id: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    start: number;
    end: number;
    blocksType: 'gps' | 'heart'[];
    metrics: ActivityMetrics;
}

export declare interface ActivityBlocks {
    geoPositionBlocks: GeoPositionBlock[];
    heartBlocks: HeartBlock[];
    weatherBlocks: WeatherBlock[];
    gyroscopeBlocks: GyroscopeBlock[];
    accelerationBlocks: AccellerationBlock[];
}

export declare interface ActivityIstants {
    heartBlocksCount: number;
    heartBlocksTotal: number;
    geoBlocksCount: number;
    speedBlocksTotal: number;
    altitudeBlocksTotal: number;
}

export declare interface HeartBlock {
    heartRate: number;
    heartRange: string;
    time: number;
    device: Pick<IDevice, 'deviceId' | 'type'> | null;
    exclude: boolean;
}

export declare interface GyroscopeBlock {
    x: number;
    y: number;
    z: number;
    time: number;
    device: Pick<IDevice, 'deviceId' | 'type'> | null;
    exclude: boolean;
}

export declare interface AccellerationBlock {
    x: number;
    y: number;
    z: number;
    time: number;
    device: Pick<IDevice, 'deviceId' | 'type'> | null;
    exclude: boolean;
}

export declare interface GpsMetrics {
    avgAltitude: number;
    avgSpeed: number;
    speedMin: number | null;
    speedMax: number | null;
    altitudeMin: number | null;
    altitudeMax: number | null;
    downhill: number;
    uphill: number;
    totalDistance: number;
    totalTime: number;
    distanceRange: string;
    speedTimeRanges: KeyValue<string, number>[];
    speedDistanceRanges: KeyValue<string, number>[];
    altitudeTimeRanges: KeyValue<string, number>[];
    altitudeDistanceRanges: KeyValue<string, number>[];
}

export declare interface HeartMetrics {
    avgHr: number | null;
    hrMin: number | null;
    hrMax: number | null;
    heartRanges: KeyValue<string, number>[];
}

export declare interface MetabolicMetrics {
    idealWeight: number;
    calorieRequirement: number;
    basalMetabolism: number;
    calorieConsumptionHr: number;
    calorieConsumptionSpecific: number;
    power: number;
}

export declare interface ActivityMetrics {
    heart: HeartMetrics;
    gps: GpsMetrics;
    metabolic: MetabolicMetrics;
}

export declare interface GeoPositionBlock {
    lat: number;
    long: number;
    accuracy: number | null;
    altitude: number;
    altitudeAccuracy: number | null;
    speed: number;
    speed3d: number | null;
    cts: number | null;
    speedRange: string;
    altitudeRange: string;
    accuracyRange: string;
    altitudeAccuracyRange: string;
    heading: number;
    time: number;
    device: Pick<IDevice, 'deviceId' | 'type'> | null;
    exclude: boolean;
}

export declare interface ActivitySettings {
    heart: ActivityHeartSettings;
    geoPosition: ActivityGeoPositionSettings;
}

export declare interface ActivityHeartSettings {
    heartRange: KeyValue<string, number>[];
}

export declare interface ActivityGeoPositionSettings {
    speedRange: KeyValue<string, number>[];
    altitudeRange: KeyValue<string, number>[];
    distanceRange: KeyValue<string, number>[];
    accuracyRange: KeyValue<string, number>[];
    altitudeAccuracyRange: KeyValue<string, number>[];
}

export declare interface ActivityUserInfo {
    activityLevel: number;
    id: string;
    username: string;
    gender: string;
    weight: number;
    height: number;
    age: number;
}

export enum ActivityType {
    running = 'Running',
    trekking = 'Trekking',
    mtb = 'MTB',
    ebike = 'EBike',
    motorcycle = 'Motorcycle',
    car = 'Car',
    default = 'Default',
}

export enum ActivityStatus {
    new = 'new',
    live = 'live',
    completed = 'completed',
}

export const INITGEOPOSITIONBLOCK: GeoPositionBlock = {
    altitude: 0,
    speed: 0,
    speedRange: '',
    altitudeRange: '',
    altitudeAccuracyRange: '',
    accuracyRange: '',
    speed3d: 0,
    cts: 0,
    long: 0,
    lat: 0,
    accuracy: 0,
    heading: 0,
    altitudeAccuracy: 0,
    time: 0,
    device: null,
    exclude: false,
};
export const INITHEARTBLOCK: HeartBlock = {
    device: {
        deviceId: '',
        type: DeviceTypeEnum.hr
    },
    exclude: false,
    heartRange: '',
    heartRate: 0,
    time: 0
};

export const DEFAULT_MTB_GEO_SETTINGS: ActivityGeoPositionSettings = {
    altitudeAccuracyRange: [
        {key: 'Valid', value: 8},
        {key: 'Warning', value: 15},
    ],
    accuracyRange: [
        {key: 'Valid', value: 8},
        {key: 'Warning', value: 15},
    ],
    altitudeRange: [
        {key: 'Pianura', value: 300},
        {key: 'Collina', value: 600},
        {key: 'Montagna', value: 2000},
        {key: 'Alta Quota', value: 10000},
    ],
    distanceRange: [
        {key: 'Light', value: 8},
        {key: 'Easy', value: 15},
        {key: 'Medium', value: 25},
        {key: 'Hard', value: 40},
    ],
    speedRange: [
        {key: 'Rest', value: 0.25},
        {key: 'Riding Slow', value: 3.33333},
        {key: 'Riding', value: 6},
        {key: 'Riding High Intensity', value: 10},
        {key: 'Riding High Speed', value: 20},
    ],
};
export const DEFAULT_EBIKE_GEO_SETTINGS: ActivityGeoPositionSettings = {
    altitudeAccuracyRange: [
        {key: 'Valid', value: 8},
        {key: 'Warning', value: 15},
    ],
    accuracyRange: [
        {key: 'Valid', value: 8},
        {key: 'Warning', value: 15},
    ],
    altitudeRange: [
        {key: 'Pianura', value: 300},
        {key: 'Collina', value: 600},
        {key: 'Montagna', value: 2000},
        {key: 'Alta Quota', value: 10000},
    ],
    distanceRange: [
        {key: 'Light', value: 10},
        {key: 'Easy', value: 20},
        {key: 'Medium', value: 30},
        {key: 'Hard', value: 40},
    ],
    speedRange: [
        {key: 'Rest', value: 0.25},
        {key: 'Riding Slow', value: 3.33333},
        {key: 'Riding', value: 7},
        {key: 'Riding High Intensity', value: 10},
        {key: 'Riding High Speed', value: 20},
    ],
};
export const DEFAULT_RUNNING_GEO_SETTINGS: ActivityGeoPositionSettings = {
    altitudeAccuracyRange: [
        {key: 'Valid', value: 8},
        {key: 'Warning', value: 15},
    ],
    accuracyRange: [
        {key: 'Valid', value: 8},
        {key: 'Warning', value: 15},
    ],
    altitudeRange: [
        {key: 'Pianura', value: 300},
        {key: 'Collina', value: 600},
        {key: 'Montagna', value: 2000},
        {key: 'Alta Quota', value: 10000},
    ],
    distanceRange: [
        {key: 'Light', value: 4000},
        {key: 'Easy', value: 8000},
        {key: 'Medium', value: 15000},
        {key: 'Hard', value: 25000},
    ],
    speedRange: [
        {key: 'Rest', value: 0.25},
        {key: 'Walking', value: 1.5},
        {key: 'Running', value: 6},
        {key: 'Running High Intensity', value: 14},
    ],
};
export const DEFAULT_TREKKING_GEO_SETTINGS: ActivityGeoPositionSettings = {
    altitudeAccuracyRange: [
        {key: 'Valid', value: 8},
        {key: 'Warning', value: 15},
    ],
    accuracyRange: [
        {key: 'Valid', value: 8},
        {key: 'Warning', value: 15},
    ],
    altitudeRange: [
        {key: 'Pianura', value: 300},
        {key: 'Collina', value: 600},
        {key: 'Montagna', value: 2000},
        {key: 'Alta Quota', value: 10000},
    ],
    distanceRange: [
        {key: 'Light', value: 4000},
        {key: 'Easy', value: 8000},
        {key: 'Medium', value: 15000},
        {key: 'Hard', value: 25000},
    ],
    speedRange: [
        {key: 'Rest', value: 0.25},
        {key: 'Walking', value: 1.5},
        {key: 'Running', value: 6},
        {key: 'Running High Intensity', value: 14},
    ],
};
export const DEFAULT_CAR_GEO_SETTINGS: ActivityGeoPositionSettings = {
    altitudeAccuracyRange: [
        {key: 'Valid', value: 8},
        {key: 'Warning', value: 15},
    ],
    accuracyRange: [
        {key: 'Valid', value: 8},
        {key: 'Warning', value: 15},
    ],
    altitudeRange: [
        {key: 'Pianura', value: 300},
        {key: 'Collina', value: 600},
        {key: 'Montagna', value: 2000},
        {key: 'Alta Quota', value: 10000},
    ],
    distanceRange: [
        {key: 'Light', value: 20000},
        {key: 'Easy', value: 60000},
        {key: 'Medium', value: 150000},
        {key: 'Hard', value: 250000},
    ],
    speedRange: [
        {key: 'Rest', value: 0.25},
        {key: '< 50', value: 13.88},
        {key: '< 70', value: 19.44},
        {key: '< 90', value: 25},
        {key: '< 110', value: 30.55},
        {key: '< 130', value: 36.11},
        {key: '< 150', value: 41.66},
        {key: '< 180', value: 50},
        {key: '< 210', value: 58.33},
    ],
};
export const DEFAULT_GEO_SETTINGS: ActivityGeoPositionSettings = {
    altitudeAccuracyRange: [
        {key: 'Valid', value: 8},
        {key: 'Warning', value: 15},
    ],
    accuracyRange: [
        {key: 'Valid', value: 8},
        {key: 'Warning', value: 15},
    ],
    altitudeRange: [
        {key: 'Pianura', value: 300},
        {key: 'Collina', value: 600},
        {key: 'Montagna', value: 2000},
        {key: 'Alta Quota', value: 10000},
    ],
    distanceRange: [
        {key: 'Light', value: 20000},
        {key: 'Easy', value: 60000},
        {key: 'Medium', value: 150000},
        {key: 'Hard', value: 250000},
    ],
    speedRange: [
        {key: 'Rest', value: 0.25},
        {key: '< 50', value: 13.88},
        {key: '< 70', value: 19.44},
        {key: '< 90', value: 25},
        {key: '< 110', value: 30.55},
        {key: '< 130', value: 36.11},
        {key: '< 150', value: 41.66},
        {key: '< 180', value: 50},
        {key: '< 210', value: 58.33},
    ],
};
export const DEFAULT_MOTORCYCLE_GEO_SETTINGS: ActivityGeoPositionSettings = {
    altitudeAccuracyRange: [
        {key: 'Valid', value: 8},
        {key: 'Warning', value: 15},
    ],
    accuracyRange: [
        {key: 'Valid', value: 8},
        {key: 'Warning', value: 15},
    ],
    altitudeRange: [
        {key: 'Pianura', value: 300},
        {key: 'Collina', value: 600},
        {key: 'Montagna', value: 2000},
        {key: 'Alta Quota', value: 10000},
    ],
    distanceRange: [
        {key: 'Light', value: 20000},
        {key: 'Easy', value: 60000},
        {key: 'Medium', value: 150000},
        {key: 'Hard', value: 250000},
    ],
    speedRange: [
        {key: 'Rest', value: 0.25},
        {key: '< 50', value: 13.88},
        {key: '< 70', value: 19.44},
        {key: '< 90', value: 25},
        {key: '< 110', value: 30.55},
        {key: '< 130', value: 36.11},
        {key: '< 150', value: 41.66},
        {key: '< 180', value: 50},
        {key: '< 210', value: 58.33},
    ],
};
export const DEFAULT_HEART_SETTINGS: ActivityHeartSettings = {
    heartRange: [
        {key: 'Low', value: 80},
        {key: 'Medium', value: 120},
        {key: 'High', value: 170},
        {key: 'Red Zone', value: 180},
    ],
};
