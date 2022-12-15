import {
    Activity,
    ActivitySettings,
    ActivityStatus,
    ActivityType,
    calculateValueInRange,
    DEFAULT_CAR_GEO_SETTINGS,
    DEFAULT_EBIKE_GEO_SETTINGS,
    DEFAULT_HEART_SETTINGS,
    DEFAULT_MOTORCYCLE_GEO_SETTINGS,
    DEFAULT_MTB_GEO_SETTINGS,
    DEFAULT_RUNNING_GEO_SETTINGS,
    DEFAULT_TREKKING_GEO_SETTINGS,
    DeviceTypeEnum,
    GeoPositionBlock,
} from '../models';
import {TelemetryExport} from '../models/telemetryExtractor';

export const initNewActivity = (type: ActivityType, name: string): Activity => {
    return {
        devices: [],
        drills: [],
        status: ActivityStatus.new,
        metrics: {
            gps: {
                altitudeMin: null,
                altitudeMax: null,
                totalDistance: 0,
                distanceRange: '',
                speedTimeRanges: [],
                speedDistanceRanges: [],
                altitudeTimeRanges: [],
                altitudeDistanceRanges: [],
                speedMax: null,
                speedMin: null,
                totalTime: 0,
                avgSpeed: 0,
                avgAltitude: 0,
                uphill: 0,
                downhill: 0,
            },
            heart: {
                hrMax: null,
                hrMin: null,
                avgHr: 0,
                heartRanges: [],
            },
            metabolic: {
                power: 0,
                calorieConsumptionSpecific: 0,
                calorieConsumptionHr: 0,
                calorieRequirement: 0,
                idealWeight: 0,
                basalMetabolism: 0,
            },

        },
        istants: {
            heartBlocksCount: 0,
            heartBlocksTotal: 0,
            geoBlocksCount: 0,
            speedBlocksTotal: 0,
            altitudeBlocksTotal: 0,
        },
        settings: {
            geoPosition: DEFAULT_RUNNING_GEO_SETTINGS,
            heart: DEFAULT_HEART_SETTINGS,
        },
        createdAt: null,
        blocks: {
            geoPositionBlocks: [],
            heartBlocks: [],
            weatherBlocks: [],
            accelerationBlocks: [],
            gyroscopeBlocks: [],
        },
        media: [],
        userInfo: null,
        id: 'newID',
        name,
        type,
        updatedAt: null,
    };
};

export const calcActivitySettings = (type: ActivityType): ActivitySettings => {
    const settings: ActivitySettings = {
        geoPosition: {
            altitudeAccuracyRange: [],
            speedRange: [],
            accuracyRange: [],
            altitudeRange: [],
            distanceRange: [],
        },
        heart: {
            heartRange: [],
        },
    };
    switch (type) {
        case ActivityType.ebike:
            settings.geoPosition = DEFAULT_EBIKE_GEO_SETTINGS;
            settings.heart = DEFAULT_HEART_SETTINGS;
            break;
        case ActivityType.running:
            settings.geoPosition = DEFAULT_RUNNING_GEO_SETTINGS;
            settings.heart = DEFAULT_HEART_SETTINGS;
            break;
        case ActivityType.mtb:
            settings.geoPosition = DEFAULT_MTB_GEO_SETTINGS;
            settings.heart = DEFAULT_HEART_SETTINGS;
            break;
        case ActivityType.motorcycle:
            settings.geoPosition = DEFAULT_MOTORCYCLE_GEO_SETTINGS;
            settings.heart = DEFAULT_HEART_SETTINGS;
            break;
        case ActivityType.trekking:
            settings.geoPosition = DEFAULT_TREKKING_GEO_SETTINGS;
            settings.heart = DEFAULT_HEART_SETTINGS;
            break;
        case ActivityType.car:
            settings.geoPosition = DEFAULT_CAR_GEO_SETTINGS;
            settings.heart = DEFAULT_HEART_SETTINGS;
            break;
    }
    return settings;
};

export const convertDataFromJsonTE = (content: { data: TelemetryExport; fps: string }, newActivity: Activity) => {
    const devideID = new Date().valueOf().toString();
    // DEVICE
    newActivity.devices = [{
        name: content.data?.deviceName ? content.data.deviceName : 'No name',
        deviceId: devideID,
        type: content.data?.deviceName?.toLowerCase().includes('gopro') ? DeviceTypeEnum.gopro : DeviceTypeEnum.unknown,
        services: [],
        batteryLevel: 100,
        connected: false,
        info: null,
    }];
    // BLOCKS
    content.data.streams.GPS5.samples.forEach(gpsData => {
        const normalizedBlock: GeoPositionBlock = {
            time: new Date(gpsData.date).valueOf(),
            lat: gpsData.value[0],
            long: gpsData.value[1],
            altitude: gpsData.value[2],
            speed: gpsData.value[3],
            speed3d: gpsData.value[4],
            cts: gpsData.cts,
            accuracy: gpsData.sticky?.precision,
            accuracyRange: calculateValueInRange(gpsData.sticky?.precision, newActivity.settings.geoPosition.accuracyRange),
            altitudeAccuracyRange: '',
            altitudeAccuracy: null,
            speedRange: calculateValueInRange(gpsData.value[3], newActivity.settings.geoPosition.speedRange),
            altitudeRange: calculateValueInRange(gpsData.value[2], newActivity.settings.geoPosition.altitudeRange),
            heading: 0,
            exclude: false,
            device: {
                deviceId: devideID,
                type: DeviceTypeEnum.gopro,
            },
        };
        // console.warn('NORMALIZED BLOCK', normalizedBlock);
        newActivity.blocks.geoPositionBlocks.push(normalizedBlock);
    });
    return newActivity;
};

export const convertDataFromGPX = (content: string, newActivity: Activity): Activity => {
    const GPX = require('gpx-parser-builder');
    const parsedGpx: any = GPX.parse(content);
    console.warn('GPX', parsedGpx.trk);

    const devideID = new Date().valueOf().toString();
    newActivity.devices = [{
        name: parsedGpx.trk[0].src ? parsedGpx.trk[0].src : 'No name',
        deviceId: devideID,
        type: DeviceTypeEnum.unknown,
        services: [],
        batteryLevel: 100,
        connected: false,
        info: null,
    }];

    parsedGpx.trk[0].trkseg[0].trkpt.forEach((gpsData: any) => {
        const normalizedBlock: GeoPositionBlock = {
            time: new Date(gpsData.time).valueOf(),
            lat: gpsData.$.lat,
            long: gpsData.$.lon,
            altitude: gpsData.ele,
            speed: 0,
            speed3d: null,
            cts: gpsData.cts,
            accuracy: null,
            exclude: false,
            accuracyRange: calculateValueInRange(0, newActivity.settings.geoPosition.accuracyRange),
            altitudeAccuracy: gpsData.hdop,
            speedRange: calculateValueInRange(0, newActivity.settings.geoPosition.speedRange),
            altitudeRange: calculateValueInRange(gpsData.ele, newActivity.settings.geoPosition.altitudeRange),
            altitudeAccuracyRange: calculateValueInRange(gpsData.hdop, newActivity.settings.geoPosition.altitudeRange),
            heading: 0,
            device: {
                deviceId: devideID,
                type: DeviceTypeEnum.gopro,
            },
        };
        newActivity.blocks.geoPositionBlocks.push(normalizedBlock);
    });


    return newActivity;
};

export const normilizeTelemetryJSON = (message: string): { data: TelemetryExport; fps: string } => {
    const content = message
        .replace('"1":', '"data":')
        .replace('frames/second', 'fps')
        .replace('"device name":', '"deviceName":');
    const res: { data: TelemetryExport; fps: string } = JSON.parse(content);
    return res;
};

export default {
    initNewActivity,
    calcActivitySettings,
    convertDataFromJsonTE,
    convertDataFromGPX,
    normilizeTelemetryJSON,
};
