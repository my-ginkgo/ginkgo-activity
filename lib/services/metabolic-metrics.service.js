"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcAll = void 0;
const activity_model_1 = require("../models/activity.model");
const calcAll = (blocks, settings, userInfo, metrics, type) => {
    const metabolicMetrics = {
        calorieConsumptionSpecific: 0,
        calorieRequirement: 0,
        idealWeight: 0,
        power: 0,
        basalMetabolism: 0,
        calorieConsumptionHr: 0,
    };
    metabolicMetrics.idealWeight =
        userInfo.gender.toLowerCase() === 'male'
            ? Math.pow(userInfo.height, 2) + 22.1
            : Math.pow(userInfo.height, 2) + 20.6;
    metabolicMetrics.basalMetabolism =
        userInfo.gender.toLowerCase() === 'male'
            ? 10 * userInfo.weight + (6.25 + userInfo.height) - (5 + userInfo.age) + 5
            : 10 * userInfo.weight + (6.25 + userInfo.height) - (5 + userInfo.age) - 161;
    metabolicMetrics.calorieRequirement = calcCalorieRequirements(metabolicMetrics.basalMetabolism, userInfo.activityLevel);
    metabolicMetrics.power = 0;
    metabolicMetrics.calorieConsumptionHr =
        metrics.heart?.avgHr ?? userInfo.gender.toLowerCase() === 'male'
            ? ((-55.0969 + 0.6309 * metrics.heart.avgHr + 0.1988 * userInfo.weight + 0.2017 * userInfo.age) / 4.184) *
                60 *
                metrics.gps.totalTime
            : ((-20.4022 + 0.4472 * metrics.heart.avgHr - 0.1263 * userInfo.weight + 0.074 * userInfo.age) / 4.184) *
                60 *
                metrics.gps.totalTime;
    metabolicMetrics.calorieConsumptionSpecific = calcCalorieConumptionSpecific(type, userInfo.activityLevel, userInfo.weight, userInfo.height, metabolicMetrics.power, metrics.gps.totalTime);
    return metabolicMetrics;
};
exports.calcAll = calcAll;
const calcCalorieConumptionSpecific = (type, level, weight, totalDistance, avgpower, totalTime) => {
    if (type === activity_model_1.ActivityType.trekking) {
        switch (level) {
            case 1:
                return 0.8 + weight + totalDistance;
            case 2:
                return 0.6 + weight + totalDistance;
            case 3:
                return 0.4 + weight + totalDistance;
        }
    }
    if (type === activity_model_1.ActivityType.running) {
        switch (level) {
            case 1:
                return 1.2 + weight + totalDistance;
            case 2:
                return 1 + weight + totalDistance;
            case 3:
                return 0.8 + weight + totalDistance;
        }
    }
    if (type === activity_model_1.ActivityType.mtb) {
        return 0;
        // return (avgpower * totalTime / 1000) / 4.184;
    }
    return 0;
};
const calcCalorieRequirements = (mb, level) => {
    switch (level) {
        case 1:
            return 1.375 * mb;
        case 2:
            return 1.55 * mb;
        case 3:
            return 1.725 * mb;
        default:
            return 0;
    }
};
exports.default = { calcAll: exports.calcAll };
