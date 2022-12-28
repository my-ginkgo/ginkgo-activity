import {
    AccellerationBlock,
    Activity,
    ActivityProvider,
    ActivitySettings,
    ActivityStatus,
    ActivityType,
    ActivityUserInfo,
    calculateAge,
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
    GpsMetrics,
    GyroscopeBlock,
    HeartBlock,
    HeartMetrics,
    INITGEOPOSITIONBLOCK,
    INITHEARTBLOCK,
    MetabolicMetrics,
    StravaActivity,
} from '../models';
import {TelemetryExport} from '../models/telemetryExtractor';
import {GPS, HR, MAP, MP} from './index';

const initNewActivity = (type: ActivityType, name: string): Activity => {
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
        startDate: new Date(),
        name,
        type,
        updatedAt: null,
        provider: ActivityProvider.ginkgo,
        reactions: [],
    };
};

const calcActivitySettings = (type: ActivityType): ActivitySettings => {
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

const convertDataFromJsonTE = (content: { data: TelemetryExport; fps: string }, newActivity: Activity) => {
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
    console.warn('STREAMS FIND:', content.data.streams);
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
    content.data.streams.ACCL.samples.forEach(gpsData => {
        const normalizedBlock: AccellerationBlock = {
            time: new Date(gpsData.date).valueOf(),
            z: gpsData.value[0],
            x: gpsData.value[1],
            y: gpsData.value[2],
            exclude: false,
            device: {
                deviceId: devideID,
                type: DeviceTypeEnum.gopro,
            },
        };
        // console.warn('NORMALIZED BLOCK', normalizedBlock);
        newActivity.blocks.accelerationBlocks.push(normalizedBlock);
    });
    content.data.streams.GYRO.samples.forEach(gpsData => {
        const normalizedBlock: GyroscopeBlock = {
            time: new Date(gpsData.date).valueOf(),
            z: gpsData.value[0],
            x: gpsData.value[1],
            y: gpsData.value[2],
            exclude: false,
            device: {
                deviceId: devideID,
                type: DeviceTypeEnum.gopro,
            },
        };
        // console.warn('NORMALIZED BLOCK', normalizedBlock);
        newActivity.blocks.gyroscopeBlocks.push(normalizedBlock);
    });
    return newActivity;
};

const convertDataFromGPX = (content: string, newActivity: Activity): Activity => {
    const GPX = require('gpx-parser-builder');
    const parsedGpx: any = GPX.parse(content);
    console.log('GPX', parsedGpx.trk);

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

const normilizeTelemetryJSON = (message: string): { data: TelemetryExport; fps: string } => {
    const content = message
        .replace('"1":', '"data":')
        .replace('frames/second', 'fps')
        .replace('"device name":', '"deviceName":');
    const res: { data: TelemetryExport; fps: string } = JSON.parse(content);
    return res;
};

// tslint:disable-next-line:variable-name
const convertStravaTypeToGinkgo = (type: string, sport_type: string, workout_type: number | undefined): ActivityType => {
    if (sport_type?.includes('EMountainBikeRide') || (sport_type?.includes('EBikeRide') || type?.includes('EBikeRide'))) {
        return ActivityType.ebike;
    }
    if (sport_type?.includes('MountainBikeRide') || type?.includes('Ride')) {
        return ActivityType.mtb;
    }
    if (sport_type?.includes('Walk') || type?.includes('Walk')) {
        return ActivityType.trekking;
    }
    if (sport_type?.includes('Run') || sport_type?.includes('TrailRun') || type?.includes('Run')) {
        return ActivityType.running;
    }

    return ActivityType.default;
};

export const fromStravaActivityToGinkgoActivity = (stravaActivity: StravaActivity, userInfo: {
    activityLevel: number;
    id: string;
    username: string;
    gender: string;
    weight: number;
    height: number;
    birthdate: string;
}) => {
    try {
        const type = convertStravaTypeToGinkgo(stravaActivity.type, stravaActivity.sport_type, stravaActivity.workout_type);
        const activity: Activity = initNewActivity(type, stravaActivity.name);
        activity.provider = ActivityProvider.strava;
        activity.stravaId = stravaActivity.id;
        activity.startDate = stravaActivity.start_date;
        activity.userInfo = {
            age: calculateAge(userInfo.birthdate, stravaActivity.start_date),
            activityLevel: userInfo.activityLevel,
            id: userInfo.id,
            weight: userInfo.weight,
            height: userInfo.height,
            gender: userInfo.gender,
            username: userInfo.username,
        };
        if (stravaActivity.streams?.time?.data) {
            const startLatLng = new Date(stravaActivity.start_date).valueOf();
            for (let counter = 0; counter < stravaActivity.streams?.time?.data?.length; counter++) {
                const geoBlock: GeoPositionBlock = INITGEOPOSITIONBLOCK;
                geoBlock.time = startLatLng + (counter * 1000);
                geoBlock.cts = counter;
                if (stravaActivity.streams?.altitude?.data && stravaActivity.streams?.altitude?.data?.length > 0) {
                    geoBlock.altitude = stravaActivity.streams?.altitude?.data[counter] as number;
                }
                if (stravaActivity.streams?.latlng?.data && stravaActivity.streams?.latlng?.data?.length > 0) {
                    // @ts-ignore
                    geoBlock.lat = stravaActivity.streams?.latlng?.data[counter][0];
                    // @ts-ignore
                    geoBlock.long = stravaActivity.streams?.latlng?.data[counter][1];
                    // @ts-ignore
                    geoBlock.heading = counter > 0 && stravaActivity.streams?.time?.data[counter + 1] ? MAP.calcBearing(geoBlock.lat, geoBlock.long, stravaActivity.streams?.latlng?.data[counter + 1][0] as number, stravaActivity.streams?.latlng?.data[counter + 1][1] as number) : 0;
                }
                if (stravaActivity.streams?.velocity_smooth?.data && stravaActivity.streams?.velocity_smooth?.data?.length > 0) {
                    geoBlock.speed = stravaActivity.streams?.velocity_smooth?.data[counter] as number;
                }
                activity.blocks.geoPositionBlocks.push(JSON.parse(JSON.stringify(geoBlock)));

                if (stravaActivity.streams?.heartrate?.data && stravaActivity.streams?.heartrate?.data?.length > 0) {
                    const heartBlock: HeartBlock = INITHEARTBLOCK;
                    heartBlock.time =  startLatLng + (counter * 1000);
                    heartBlock.heartRate = stravaActivity.streams?.heartrate?.data[counter] as number;
                    activity.blocks.heartBlocks.push(JSON.parse(JSON.stringify(heartBlock)));
                }
            }
            if (activity.blocks.geoPositionBlocks.length > 0) {
                activity.metrics.gps = GPS.calcAll(activity.blocks, activity.settings) as GpsMetrics;
            }
            if (activity.blocks.heartBlocks.length > 0) {
                activity.metrics.heart = HR.calcValues(activity.blocks) as HeartMetrics;
            }
            if (activity.blocks.geoPositionBlocks.length > 0 && activity.blocks.heartBlocks.length > 0) {
                activity.metrics.metabolic = MP.calcAll(activity.blocks, activity.settings, activity.userInfo as ActivityUserInfo, activity.metrics, activity.type) as MetabolicMetrics;
            }
            return activity;
        }
        console.log('No Time Block for create activity.');
        return null;
    } catch (e: any) {
        console.log('ERR CONVERSION STRAVA / GNK:', e.message);
    }
};

export const fromStravaActivityToGinkgoActivityBase = (stravaActivity: StravaActivity, userInfo: {
    activityLevel: number;
    id: string;
    username: string;
    gender: string;
    weight: number;
    height: number;
    birthdate: string;
}) => {
    const type = convertStravaTypeToGinkgo(stravaActivity.type, stravaActivity.sport_type, stravaActivity.workout_type);
    const activity: Activity = initNewActivity(type, stravaActivity.name);
    activity.provider = ActivityProvider.strava;
    activity.userInfo = {
        age: calculateAge(userInfo.birthdate, new Date(stravaActivity.start_date)),
        activityLevel: userInfo.activityLevel,
        id: userInfo.id,
        weight: userInfo.weight,
        height: userInfo.height,
        gender: userInfo.gender,
        username: userInfo.username,
    };
    activity.metrics.gps.totalDistance = stravaActivity.distance;
    activity.metrics.gps.totalTime = stravaActivity.elapsed_time * 1000;
    activity.startDate = stravaActivity.start_date;
    activity.stravaId = stravaActivity.id;
    return activity;
};

export default {
    initNewActivity,
    calcActivitySettings,
    convertDataFromJsonTE,
    convertDataFromGPX,
    normilizeTelemetryJSON,
    convertStravaTypeToGinkgo,
    fromStravaActivityToGinkgoActivity,
    fromStravaActivityToGinkgoActivityBase,
};
