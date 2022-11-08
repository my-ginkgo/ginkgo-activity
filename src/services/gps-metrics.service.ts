import * as L from 'leaflet';
import {ActivityBlocks, ActivitySettings, ActivityType, ActivityUserInfo, GpsMetrics} from '../models/activity.model';
import {KeyValue} from '../models/ng-keyvalue.model';
import {calculateValueInRange, getMillisecondsBetweenTwoDates} from '../models/utils.model';

   export const calcAll = (blocks: ActivityBlocks, settings: ActivitySettings, userInfo: ActivityUserInfo, type: ActivityType): Partial<GpsMetrics> => {
        return {
            ...calcValues(blocks),
            ...calcRanges(blocks, settings),
        };
    }

    export const calcValues = (blocks: ActivityBlocks): Pick<GpsMetrics, 'altitudeMin' | 'altitudeMax' | 'totalDistance' | 'speedMax' | 'speedMin' | 'totalTime' | 'avgSpeed' | 'avgAltitude'> => {
        const gpsMetrics: Pick<GpsMetrics, 'altitudeMin' | 'altitudeMax' | 'totalDistance' | 'speedMax' | 'speedMin' | 'totalTime' | 'avgSpeed' | 'avgAltitude'> = {
            altitudeMin: 0,
            altitudeMax: 0,
            totalDistance: 0,
            speedMax: 0,
            speedMin: 0,
            totalTime: 0,
            avgSpeed: 0,
            avgAltitude: 0,
        };
        gpsMetrics.avgAltitude = blocks.geoPositionBlocks.reduce((a, b, c, d) => a + b.altitude, 0) / blocks.geoPositionBlocks.length;
        gpsMetrics.altitudeMax = Math.max(...blocks.geoPositionBlocks.map(hb => hb.altitude));
        gpsMetrics.altitudeMin = Math.min(...blocks.geoPositionBlocks.map(hb => hb.altitude));
        gpsMetrics.avgSpeed = blocks.geoPositionBlocks.reduce((a, b, c, d) => a + b.speed, 0) / blocks.geoPositionBlocks.length;
        gpsMetrics.speedMax = Math.max(...blocks.geoPositionBlocks.map(hb => hb.speed));
        gpsMetrics.speedMin = Math.min(...blocks.geoPositionBlocks.map(hb => hb.speed));
        gpsMetrics.totalTime = getMillisecondsBetweenTwoDates(blocks.geoPositionBlocks[blocks.geoPositionBlocks.length - 1].time,
            blocks.geoPositionBlocks[0].time);
        return gpsMetrics;
    }

    export const calcRanges = (blocks: ActivityBlocks, settings: ActivitySettings): Partial<GpsMetrics> => {
        const gpsMetrics: Pick<GpsMetrics, 'totalDistance' | 'distanceRange' | 'speedTimeRanges' | 'speedDistanceRanges' | 'altitudeTimeRanges' | 'altitudeDistanceRanges' | 'uphill' | 'downhill'> = {
            totalDistance: 0,
            distanceRange: '',
            speedTimeRanges: [],
            speedDistanceRanges: [],
            altitudeTimeRanges: [],
            altitudeDistanceRanges: [],
            uphill: 0,
            downhill: 0,
        };
        const speedRanges: KeyValue<string, number>[] = [];
        const speedDistanceRanges: KeyValue<string, number>[] = [];
        const altitudeRanges: KeyValue<string, number>[] = [];
        const altitudeDistanceRanges: KeyValue<string, number>[] = [];
        for (let i = 1; blocks.geoPositionBlocks.length > i; i++) {
            const previousPoint = new L.LatLng(blocks.geoPositionBlocks[i - 1].lat, blocks.geoPositionBlocks[i - 1].long, blocks.geoPositionBlocks[i - 1].altitude);
            const currentPoint = new L.LatLng(blocks.geoPositionBlocks[i].lat, blocks.geoPositionBlocks[i].long, blocks.geoPositionBlocks[i].altitude);
            const diffDistance = previousPoint.distanceTo(currentPoint);

            gpsMetrics.totalDistance += diffDistance;
            if (blocks.geoPositionBlocks[i].altitude < blocks.geoPositionBlocks[i - 1].altitude) {
                gpsMetrics.downhill += (blocks.geoPositionBlocks[i - 1].altitude - blocks.geoPositionBlocks[i].altitude);
            } else {
                gpsMetrics.uphill += (blocks.geoPositionBlocks[i].altitude - blocks.geoPositionBlocks[i - 1].altitude);
            }

            const diff = new Date(blocks.geoPositionBlocks[i].time).valueOf() - new Date(blocks.geoPositionBlocks[i - 1].time).valueOf();

            // ADD ITEM FOR EVERY KEYS
            if (!speedRanges.find(sr => sr.key === blocks.geoPositionBlocks[i].speedRange)) {
                speedRanges.push({key: blocks.geoPositionBlocks[i].speedRange, value: 0});
                speedDistanceRanges.push({key: blocks.geoPositionBlocks[i].speedRange, value: 0});
            }
            // FIND ITEM
            const updateItem = speedRanges.find(sr => sr.key === blocks.geoPositionBlocks[i].speedRange);
            if (updateItem) {
                updateItem.value += diff;
                const updateSpeedDistanceRange = speedDistanceRanges.find(sr => sr.key === blocks.geoPositionBlocks[i].speedRange);
                if (updateSpeedDistanceRange) {
                    updateSpeedDistanceRange.value += diffDistance;
                    // UPDATE TIME
                    speedRanges[speedRanges.indexOf(updateItem)] = updateItem;
                    speedDistanceRanges[speedDistanceRanges.indexOf(updateSpeedDistanceRange)] = updateSpeedDistanceRange;
                }
            }

            // ADD ITEM FOR EVERY KEYS
            if (!altitudeRanges.find(ar => ar.key === blocks.geoPositionBlocks[i].altitudeRange)) {
                altitudeRanges.push({key: blocks.geoPositionBlocks[i].altitudeRange, value: 0});
                altitudeDistanceRanges.push({key: blocks.geoPositionBlocks[i].altitudeRange, value: 0});
            }
            // FIND ITEM
            const updateItem2 = altitudeRanges.find(ar => ar.key === blocks.geoPositionBlocks[i].altitudeRange);
            if (updateItem2) {
                updateItem2.value += diff;
                const updateAltitudeDistanceRange = altitudeDistanceRanges.find(ar => ar.key === blocks.geoPositionBlocks[i].altitudeRange);
                if (updateAltitudeDistanceRange) {
                    updateAltitudeDistanceRange.value += diffDistance;
                    // UPDATE TIME
                    altitudeRanges[altitudeRanges.indexOf(updateItem2)] = updateItem2;
                    altitudeDistanceRanges[altitudeDistanceRanges.indexOf(updateAltitudeDistanceRange)] = updateAltitudeDistanceRange;
                }
            }
        }
        gpsMetrics.altitudeTimeRanges = altitudeRanges;
        gpsMetrics.altitudeDistanceRanges = altitudeDistanceRanges;
        gpsMetrics.speedDistanceRanges = speedDistanceRanges;
        gpsMetrics.speedTimeRanges = speedRanges;
        gpsMetrics.distanceRange = calculateValueInRange(gpsMetrics.totalDistance / 1000, settings.geoPosition.distanceRange);
        return gpsMetrics;
    }

