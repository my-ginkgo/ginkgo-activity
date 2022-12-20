"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcRanges = exports.calcValues = exports.calcAll = void 0;
const models_1 = require("../models");
const map_service_1 = require("./map.service");
const calcAll = (blocks, settings) => {
    return {
        ...(0, exports.calcValues)(blocks),
        ...(0, exports.calcRanges)(blocks, settings),
    };
};
exports.calcAll = calcAll;
const calcValues = (blocks) => {
    const gpsMetrics = {
        altitudeMin: 0,
        altitudeMax: 0,
        totalDistance: 0,
        speedMax: 0,
        speedMin: 0,
        totalTime: 0,
        avgSpeed: 0,
        avgAltitude: 0,
    };
    gpsMetrics.avgAltitude =
        blocks.geoPositionBlocks.reduce((a, b, c, d) => a + b.altitude, 0) / blocks.geoPositionBlocks.length;
    gpsMetrics.altitudeMax = Math.max(...blocks.geoPositionBlocks.map((hb) => hb.altitude));
    gpsMetrics.altitudeMin = Math.min(...blocks.geoPositionBlocks.map((hb) => hb.altitude));
    gpsMetrics.avgSpeed =
        blocks.geoPositionBlocks.reduce((a, b, c, d) => a + b.speed, 0) / blocks.geoPositionBlocks.length;
    gpsMetrics.speedMax = Math.max(...blocks.geoPositionBlocks.map((hb) => hb.speed));
    gpsMetrics.speedMin = Math.min(...blocks.geoPositionBlocks.map((hb) => hb.speed));
    gpsMetrics.totalTime = (0, models_1.getMillisecondsBetweenTwoDates)(blocks.geoPositionBlocks[blocks.geoPositionBlocks.length - 1].time, blocks.geoPositionBlocks[0].time);
    return gpsMetrics;
};
exports.calcValues = calcValues;
const calcRanges = (blocks, settings) => {
    const gpsMetrics = {
        totalDistance: 0,
        distanceRange: '',
        speedTimeRanges: [],
        speedDistanceRanges: [],
        altitudeTimeRanges: [],
        altitudeDistanceRanges: [],
        uphill: 0,
        downhill: 0,
    };
    const speedRanges = [];
    const speedDistanceRanges = [];
    const altitudeRanges = [];
    const altitudeDistanceRanges = [];
    for (let i = 1; blocks.geoPositionBlocks.length > i; i++) {
        const previousPoint = [
            blocks.geoPositionBlocks[i - 1].lat,
            blocks.geoPositionBlocks[i - 1].long,
        ];
        const currentPoint = [
            blocks.geoPositionBlocks[i].lat,
            blocks.geoPositionBlocks[i].long,
        ];
        const diffDistance = (0, map_service_1.calcCrow)(previousPoint[0], previousPoint[1], currentPoint[0], currentPoint[1]);
        gpsMetrics.totalDistance += diffDistance;
        if (blocks.geoPositionBlocks[i].altitude < blocks.geoPositionBlocks[i - 1].altitude) {
            gpsMetrics.downhill += blocks.geoPositionBlocks[i - 1].altitude - blocks.geoPositionBlocks[i].altitude;
        }
        else {
            gpsMetrics.uphill += blocks.geoPositionBlocks[i].altitude - blocks.geoPositionBlocks[i - 1].altitude;
        }
        const diff = new Date(blocks.geoPositionBlocks[i].time).valueOf() - new Date(blocks.geoPositionBlocks[i - 1].time).valueOf();
        // ADD ITEM FOR EVERY KEYS
        if (!speedRanges.find((sr) => sr.key === blocks.geoPositionBlocks[i].speedRange)) {
            speedRanges.push({ key: blocks.geoPositionBlocks[i].speedRange, value: 0 });
            speedDistanceRanges.push({ key: blocks.geoPositionBlocks[i].speedRange, value: 0 });
        }
        // FIND ITEM
        const updateItem = speedRanges.find((sr) => sr.key === blocks.geoPositionBlocks[i].speedRange);
        if (updateItem) {
            updateItem.value += diff;
            const updateSpeedDistanceRange = speedDistanceRanges.find((sr) => sr.key === blocks.geoPositionBlocks[i].speedRange);
            if (updateSpeedDistanceRange) {
                updateSpeedDistanceRange.value += diffDistance;
                // UPDATE TIME
                speedRanges[speedRanges.indexOf(updateItem)] = updateItem;
                speedDistanceRanges[speedDistanceRanges.indexOf(updateSpeedDistanceRange)] = updateSpeedDistanceRange;
            }
        }
        // ADD ITEM FOR EVERY KEYS
        if (!altitudeRanges.find((ar) => ar.key === blocks.geoPositionBlocks[i].altitudeRange)) {
            altitudeRanges.push({ key: blocks.geoPositionBlocks[i].altitudeRange, value: 0 });
            altitudeDistanceRanges.push({ key: blocks.geoPositionBlocks[i].altitudeRange, value: 0 });
        }
        // FIND ITEM
        const updateItem2 = altitudeRanges.find((ar) => ar.key === blocks.geoPositionBlocks[i].altitudeRange);
        if (updateItem2) {
            updateItem2.value += diff;
            const updateAltitudeDistanceRange = altitudeDistanceRanges.find((ar) => ar.key === blocks.geoPositionBlocks[i].altitudeRange);
            if (updateAltitudeDistanceRange) {
                updateAltitudeDistanceRange.value += diffDistance;
                // UPDATE TIME
                altitudeRanges[altitudeRanges.indexOf(updateItem2)] = updateItem2;
                altitudeDistanceRanges[altitudeDistanceRanges.indexOf(updateAltitudeDistanceRange)] =
                    updateAltitudeDistanceRange;
            }
        }
    }
    gpsMetrics.altitudeTimeRanges = altitudeRanges;
    gpsMetrics.altitudeDistanceRanges = altitudeDistanceRanges;
    gpsMetrics.speedDistanceRanges = speedDistanceRanges;
    gpsMetrics.speedTimeRanges = speedRanges;
    gpsMetrics.distanceRange = (0, models_1.calculateValueInRange)(gpsMetrics.totalDistance / 1000, settings.geoPosition.distanceRange);
    return gpsMetrics;
};
exports.calcRanges = calcRanges;
exports.default = { calcAll: exports.calcAll, calcValues: exports.calcValues, calcRanges: exports.calcRanges };
