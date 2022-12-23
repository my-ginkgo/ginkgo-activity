import { Media } from './media.model';
import { KeyValue } from './ng-keyvalue.model';
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
export declare enum DeviceTypeEnum {
    unknown = "Unknown",
    gopro = "GoPro",
    hr = "Heart Rate",
    phone = "Phone"
}
export declare interface RxDBActivityData {
    id: string;
    blocks: ActivityBlocks;
}
export declare enum ReactionType {
    LIKE = "like",
    APPLAUSE = "applause",
    LOVE = "love",
    REMOVE = "remove"
}
export declare interface Reaction {
    user: {
        id: string;
        username: string;
        avatar: string;
    };
    date: number;
    type: ReactionType;
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
export declare enum ActivityProvider {
    ginkgo = "Ginkgo",
    strava = "Strava"
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
export declare enum ActivityType {
    running = "Running",
    trekking = "Trekking",
    mtb = "MTB",
    ebike = "EBike",
    motorcycle = "Motorcycle",
    car = "Car",
    default = "Default"
}
export declare enum ActivityStatus {
    new = "new",
    live = "live",
    completed = "completed"
}
export declare const INITGEOPOSITIONBLOCK: GeoPositionBlock;
export declare const INITHEARTBLOCK: HeartBlock;
export declare const DEFAULT_MTB_GEO_SETTINGS: ActivityGeoPositionSettings;
export declare const DEFAULT_EBIKE_GEO_SETTINGS: ActivityGeoPositionSettings;
export declare const DEFAULT_RUNNING_GEO_SETTINGS: ActivityGeoPositionSettings;
export declare const DEFAULT_TREKKING_GEO_SETTINGS: ActivityGeoPositionSettings;
export declare const DEFAULT_CAR_GEO_SETTINGS: ActivityGeoPositionSettings;
export declare const DEFAULT_GEO_SETTINGS: ActivityGeoPositionSettings;
export declare const DEFAULT_MOTORCYCLE_GEO_SETTINGS: ActivityGeoPositionSettings;
export declare const DEFAULT_HEART_SETTINGS: ActivityHeartSettings;
