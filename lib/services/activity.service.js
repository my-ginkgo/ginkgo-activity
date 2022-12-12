"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normilizeTelemetryJSON = exports.convertDataFromGPX = exports.convertDataFromJsonTE = exports.calcActivitySettings = exports.initNewActivity = void 0;
const models_1 = require("../models");
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
    };
};
exports.initNewActivity = initNewActivity;
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
exports.calcActivitySettings = calcActivitySettings;
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
    return newActivity;
};
exports.convertDataFromJsonTE = convertDataFromJsonTE;
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
exports.convertDataFromGPX = convertDataFromGPX;
const normilizeTelemetryJSON = (message) => {
    const content = message
        .replace('"1":', '"data":')
        .replace('frames/second', 'fps')
        .replace('"device name":', '"deviceName":');
    const res = JSON.parse(content);
    return res;
};
exports.normilizeTelemetryJSON = normilizeTelemetryJSON;
exports.default = {
    initNewActivity: exports.initNewActivity,
    calcActivitySettings: exports.calcActivitySettings,
    convertDataFromJsonTE: exports.convertDataFromJsonTE,
    convertDataFromGPX: exports.convertDataFromGPX,
    normilizeTelemetryJSON: exports.normilizeTelemetryJSON,
};
