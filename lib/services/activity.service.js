"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const index_1 = require("./index");
const initNewActivity = (type, name) => {
    return {
        devices: [],
        drills: [],
        status: models_1.ActivityStatus.new,
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
            geoPosition: models_1.DEFAULT_RUNNING_GEO_SETTINGS,
            heart: models_1.DEFAULT_HEART_SETTINGS,
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
        provider: models_1.ActivityProvider.ginkgo,
        reactions: [],
    };
};
const calcActivitySettings = (type) => {
    const settings = {
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
        case models_1.ActivityType.ebike:
            settings.geoPosition = models_1.DEFAULT_EBIKE_GEO_SETTINGS;
            settings.heart = models_1.DEFAULT_HEART_SETTINGS;
            break;
        case models_1.ActivityType.running:
            settings.geoPosition = models_1.DEFAULT_RUNNING_GEO_SETTINGS;
            settings.heart = models_1.DEFAULT_HEART_SETTINGS;
            break;
        case models_1.ActivityType.mtb:
            settings.geoPosition = models_1.DEFAULT_MTB_GEO_SETTINGS;
            settings.heart = models_1.DEFAULT_HEART_SETTINGS;
            break;
        case models_1.ActivityType.motorcycle:
            settings.geoPosition = models_1.DEFAULT_MOTORCYCLE_GEO_SETTINGS;
            settings.heart = models_1.DEFAULT_HEART_SETTINGS;
            break;
        case models_1.ActivityType.trekking:
            settings.geoPosition = models_1.DEFAULT_TREKKING_GEO_SETTINGS;
            settings.heart = models_1.DEFAULT_HEART_SETTINGS;
            break;
        case models_1.ActivityType.car:
            settings.geoPosition = models_1.DEFAULT_CAR_GEO_SETTINGS;
            settings.heart = models_1.DEFAULT_HEART_SETTINGS;
            break;
    }
    return settings;
};
const convertDataFromJsonTE = (content, newActivity) => {
    const devideID = new Date().valueOf().toString();
    // DEVICE
    newActivity.devices = [{
            name: content.data?.deviceName ? content.data.deviceName : 'No name',
            deviceId: devideID,
            type: content.data?.deviceName?.toLowerCase().includes('gopro') ? models_1.DeviceTypeEnum.gopro : models_1.DeviceTypeEnum.unknown,
            services: [],
            batteryLevel: 100,
            connected: false,
            info: null,
        }];
    // BLOCKS
    console.warn('STRAMS FIND', content.data.streams);
    content.data.streams.GPS5.samples.forEach(gpsData => {
        const normalizedBlock = {
            time: new Date(gpsData.date).valueOf(),
            lat: gpsData.value[0],
            long: gpsData.value[1],
            altitude: gpsData.value[2],
            speed: gpsData.value[3],
            speed3d: gpsData.value[4],
            cts: gpsData.cts,
            accuracy: gpsData.sticky?.precision,
            accuracyRange: (0, models_1.calculateValueInRange)(gpsData.sticky?.precision, newActivity.settings.geoPosition.accuracyRange),
            altitudeAccuracyRange: '',
            altitudeAccuracy: null,
            speedRange: (0, models_1.calculateValueInRange)(gpsData.value[3], newActivity.settings.geoPosition.speedRange),
            altitudeRange: (0, models_1.calculateValueInRange)(gpsData.value[2], newActivity.settings.geoPosition.altitudeRange),
            heading: 0,
            exclude: false,
            device: {
                deviceId: devideID,
                type: models_1.DeviceTypeEnum.gopro,
            },
        };
        // console.warn('NORMALIZED BLOCK', normalizedBlock);
        newActivity.blocks.geoPositionBlocks.push(normalizedBlock);
    });
    content.data.streams.ACCL.samples.forEach(gpsData => {
        const normalizedBlock = {
            time: new Date(gpsData.date).valueOf(),
            z: gpsData.value[0],
            x: gpsData.value[1],
            y: gpsData.value[2],
            exclude: false,
            device: {
                deviceId: devideID,
                type: models_1.DeviceTypeEnum.gopro,
            },
        };
        // console.warn('NORMALIZED BLOCK', normalizedBlock);
        newActivity.blocks.accelerationBlocks.push(normalizedBlock);
    });
    content.data.streams.GYRO.samples.forEach(gpsData => {
        const normalizedBlock = {
            time: new Date(gpsData.date).valueOf(),
            z: gpsData.value[0],
            x: gpsData.value[1],
            y: gpsData.value[2],
            exclude: false,
            device: {
                deviceId: devideID,
                type: models_1.DeviceTypeEnum.gopro,
            },
        };
        // console.warn('NORMALIZED BLOCK', normalizedBlock);
        newActivity.blocks.gyroscopeBlocks.push(normalizedBlock);
    });
    return newActivity;
};
const convertDataFromGPX = (content, newActivity) => {
    const GPX = require('gpx-parser-builder');
    const parsedGpx = GPX.parse(content);
    console.warn('GPX', parsedGpx.trk);
    const devideID = new Date().valueOf().toString();
    newActivity.devices = [{
            name: parsedGpx.trk[0].src ? parsedGpx.trk[0].src : 'No name',
            deviceId: devideID,
            type: models_1.DeviceTypeEnum.unknown,
            services: [],
            batteryLevel: 100,
            connected: false,
            info: null,
        }];
    parsedGpx.trk[0].trkseg[0].trkpt.forEach((gpsData) => {
        const normalizedBlock = {
            time: new Date(gpsData.time).valueOf(),
            lat: gpsData.$.lat,
            long: gpsData.$.lon,
            altitude: gpsData.ele,
            speed: 0,
            speed3d: null,
            cts: gpsData.cts,
            accuracy: null,
            exclude: false,
            accuracyRange: (0, models_1.calculateValueInRange)(0, newActivity.settings.geoPosition.accuracyRange),
            altitudeAccuracy: gpsData.hdop,
            speedRange: (0, models_1.calculateValueInRange)(0, newActivity.settings.geoPosition.speedRange),
            altitudeRange: (0, models_1.calculateValueInRange)(gpsData.ele, newActivity.settings.geoPosition.altitudeRange),
            altitudeAccuracyRange: (0, models_1.calculateValueInRange)(gpsData.hdop, newActivity.settings.geoPosition.altitudeRange),
            heading: 0,
            device: {
                deviceId: devideID,
                type: models_1.DeviceTypeEnum.gopro,
            },
        };
        newActivity.blocks.geoPositionBlocks.push(normalizedBlock);
    });
    return newActivity;
};
const normilizeTelemetryJSON = (message) => {
    const content = message
        .replace('"1":', '"data":')
        .replace('frames/second', 'fps')
        .replace('"device name":', '"deviceName":');
    const res = JSON.parse(content);
    return res;
};
// tslint:disable-next-line:variable-name
const convertStravaTypeToGinkgo = (type, sport_type, workout_type) => {
    if (sport_type?.includes('EMountainBikeRide') || (sport_type?.includes('EBikeRide') || type?.includes('EBikeRide'))) {
        return models_1.ActivityType.ebike;
    }
    if (sport_type?.includes('MountainBikeRide') || type?.includes('Ride')) {
        return models_1.ActivityType.mtb;
    }
    if (sport_type?.includes('Walk') || type?.includes('Walk')) {
        return models_1.ActivityType.trekking;
    }
    if (sport_type?.includes('Run') || sport_type?.includes('TrailRun') || type?.includes('Run')) {
        return models_1.ActivityType.running;
    }
    return models_1.ActivityType.default;
};
const fromStravaActivityToGinkgoActivity = (stravaActivity, userInfo) => {
    console.log('init', stravaActivity, userInfo);
    const type = convertStravaTypeToGinkgo(stravaActivity.type, stravaActivity.sport_type, stravaActivity.workout_type);
    console.log('TYPE', type);
    let activity = initNewActivity(type, stravaActivity.name);
    activity = {
        ...activity,
        provider: models_1.ActivityProvider.strava,
        userInfo: {
            age: (0, models_1.calculateAge)(userInfo.birthdate, stravaActivity.start_date),
            activityLevel: userInfo.activityLevel,
            id: userInfo.id,
            weight: userInfo.weight,
            height: userInfo.height,
            gender: userInfo.gender,
            username: userInfo.username,
        },
    };
    console.log(stravaActivity.streams?.time?.data[0], stravaActivity.streams?.time?.data[50]);
    console.log('BLOCKS', JSON.stringify(activity.blocks));
    if (stravaActivity.streams?.time?.data) {
        for (let index = 0; index < stravaActivity.streams?.time?.data?.length; index++) {
            console.log('index', index);
            const geoBlock = models_1.INITGEOPOSITIONBLOCK;
            geoBlock.time = stravaActivity.streams?.time?.data[index];
            if (stravaActivity.streams?.altitude?.data && stravaActivity.streams?.altitude?.data?.length > 0) {
                geoBlock.altitude = stravaActivity.streams?.altitude?.data[index];
                geoBlock.altitudeRange = (0, models_1.calculateValueInRange)(geoBlock.altitude, activity.settings.geoPosition.altitudeRange);
            }
            if (stravaActivity.streams?.latlng?.data && stravaActivity.streams?.latlng?.data?.length > 0) {
                geoBlock.lat = stravaActivity.streams?.latlng?.data[index];
                geoBlock.long = stravaActivity.streams?.latlng?.data[index];
                geoBlock.heading = index > 0 && stravaActivity.streams?.time?.data[index + 1] ? index_1.MAP.calcBearing(geoBlock.lat, geoBlock.long, stravaActivity.streams?.latlng?.data[index + 1], stravaActivity.streams?.latlng?.data[index + 1]) : 0;
            }
            if (stravaActivity.streams?.velocity_smooth?.data && stravaActivity.streams?.velocity_smooth?.data?.length > 0) {
                geoBlock.speed = stravaActivity.streams?.velocity_smooth?.data[index];
                geoBlock.speedRange = (0, models_1.calculateValueInRange)(geoBlock.speed, activity.settings.geoPosition.speedRange);
            }
            activity.blocks.geoPositionBlocks = [...activity.blocks.geoPositionBlocks, geoBlock];
            if (stravaActivity.streams?.heartrate?.data && stravaActivity.streams?.heartrate?.data?.length > 0) {
                const heartBlock = models_1.INITHEARTBLOCK;
                heartBlock.time = stravaActivity.streams?.time?.data[index];
                heartBlock.heartRate = stravaActivity.streams?.heartrate?.data[index];
                heartBlock.heartRange = (0, models_1.calculateValueInRange)(heartBlock.heartRate, activity.settings.heart.heartRange);
                activity.blocks.heartBlocks = [...activity.blocks.heartBlocks, heartBlock];
            }
        }
        if (activity.blocks.geoPositionBlocks.length > 0) {
            activity.metrics.gps = index_1.GPS.calcValues(activity.blocks);
        }
        if (activity.blocks.heartBlocks.length > 0) {
            activity.metrics.heart = index_1.HR.calcValues(activity.blocks);
        }
        if (activity.blocks.geoPositionBlocks.length > 0 && activity.blocks.heartBlocks.length > 0) {
            activity.metrics.metabolic = index_1.MP.calcAll(activity.blocks, activity.settings, activity.userInfo, activity.metrics, activity.type);
        }
        return activity;
    }
    console.log(activity.blocks?.geoPositionBlocks[0].time, activity.blocks?.geoPositionBlocks[50].time);
    console.log('No Time Block for create activity.');
    return null;
};
exports.default = {
    initNewActivity,
    calcActivitySettings,
    convertDataFromJsonTE,
    convertDataFromGPX,
    normilizeTelemetryJSON,
    convertStravaTypeToGinkgo,
    fromStravaActivityToGinkgoActivity,
};
