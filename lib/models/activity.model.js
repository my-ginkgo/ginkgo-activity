"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_HEART_SETTINGS = exports.DEFAULT_MOTORCYCLE_GEO_SETTINGS = exports.DEFAULT_CAR_GEO_SETTINGS = exports.DEFAULT_TREKKING_GEO_SETTINGS = exports.DEFAULT_RUNNING_GEO_SETTINGS = exports.DEFAULT_EBIKE_GEO_SETTINGS = exports.DEFAULT_MTB_GEO_SETTINGS = exports.INITGEOPOSITIONBLOCK = exports.ActivityStatus = exports.ActivityType = exports.ActivityProvider = exports.ReactionType = exports.DeviceTypeEnum = void 0;
var DeviceTypeEnum;
(function (DeviceTypeEnum) {
    DeviceTypeEnum["unknown"] = "Unknown";
    DeviceTypeEnum["gopro"] = "GoPro";
    DeviceTypeEnum["hr"] = "Heart Rate";
    DeviceTypeEnum["phone"] = "Phone";
})(DeviceTypeEnum = exports.DeviceTypeEnum || (exports.DeviceTypeEnum = {}));
var ReactionType;
(function (ReactionType) {
    ReactionType["LIKE"] = "like";
    ReactionType["APPLAUSE"] = "applause";
    ReactionType["LOVE"] = "love";
    ReactionType["REMOVE"] = "remove";
})(ReactionType = exports.ReactionType || (exports.ReactionType = {}));
var ActivityProvider;
(function (ActivityProvider) {
    ActivityProvider["ginkgo"] = "Ginkgo";
    ActivityProvider["strava"] = "Strava";
})(ActivityProvider = exports.ActivityProvider || (exports.ActivityProvider = {}));
var ActivityType;
(function (ActivityType) {
    ActivityType["running"] = "Running";
    ActivityType["trekking"] = "Trekking";
    ActivityType["mtb"] = "MTB";
    ActivityType["ebike"] = "EBike";
    ActivityType["motorcycle"] = "Motorcycle";
    ActivityType["car"] = "Car";
})(ActivityType = exports.ActivityType || (exports.ActivityType = {}));
var ActivityStatus;
(function (ActivityStatus) {
    ActivityStatus["new"] = "new";
    ActivityStatus["live"] = "live";
    ActivityStatus["completed"] = "completed";
})(ActivityStatus = exports.ActivityStatus || (exports.ActivityStatus = {}));
exports.INITGEOPOSITIONBLOCK = {
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
exports.DEFAULT_MTB_GEO_SETTINGS = {
    altitudeAccuracyRange: [
        { key: 'Valid', value: 8 },
        { key: 'Warning', value: 15 },
    ],
    accuracyRange: [
        { key: 'Valid', value: 8 },
        { key: 'Warning', value: 15 },
    ],
    altitudeRange: [
        { key: 'Pianura', value: 300 },
        { key: 'Collina', value: 600 },
        { key: 'Montagna', value: 2000 },
        { key: 'Alta Quota', value: 10000 },
    ],
    distanceRange: [
        { key: 'Light', value: 8 },
        { key: 'Easy', value: 15 },
        { key: 'Medium', value: 25 },
        { key: 'Hard', value: 40 },
    ],
    speedRange: [
        { key: 'Rest', value: 0.25 },
        { key: 'Riding Slow', value: 3.33333 },
        { key: 'Riding', value: 6 },
        { key: 'Riding High Intensity', value: 10 },
        { key: 'Riding High Speed', value: 20 },
    ],
};
exports.DEFAULT_EBIKE_GEO_SETTINGS = {
    altitudeAccuracyRange: [
        { key: 'Valid', value: 8 },
        { key: 'Warning', value: 15 },
    ],
    accuracyRange: [
        { key: 'Valid', value: 8 },
        { key: 'Warning', value: 15 },
    ],
    altitudeRange: [
        { key: 'Pianura', value: 300 },
        { key: 'Collina', value: 600 },
        { key: 'Montagna', value: 2000 },
        { key: 'Alta Quota', value: 10000 },
    ],
    distanceRange: [
        { key: 'Light', value: 10 },
        { key: 'Easy', value: 20 },
        { key: 'Medium', value: 30 },
        { key: 'Hard', value: 40 },
    ],
    speedRange: [
        { key: 'Rest', value: 0.25 },
        { key: 'Riding Slow', value: 3.33333 },
        { key: 'Riding', value: 7 },
        { key: 'Riding High Intensity', value: 10 },
        { key: 'Riding High Speed', value: 20 },
    ],
};
exports.DEFAULT_RUNNING_GEO_SETTINGS = {
    altitudeAccuracyRange: [
        { key: 'Valid', value: 8 },
        { key: 'Warning', value: 15 },
    ],
    accuracyRange: [
        { key: 'Valid', value: 8 },
        { key: 'Warning', value: 15 },
    ],
    altitudeRange: [
        { key: 'Pianura', value: 300 },
        { key: 'Collina', value: 600 },
        { key: 'Montagna', value: 2000 },
        { key: 'Alta Quota', value: 10000 },
    ],
    distanceRange: [
        { key: 'Light', value: 4000 },
        { key: 'Easy', value: 8000 },
        { key: 'Medium', value: 15000 },
        { key: 'Hard', value: 25000 },
    ],
    speedRange: [
        { key: 'Rest', value: 0.25 },
        { key: 'Walking', value: 1.5 },
        { key: 'Running', value: 6 },
        { key: 'Running High Intensity', value: 14 },
    ],
};
exports.DEFAULT_TREKKING_GEO_SETTINGS = {
    altitudeAccuracyRange: [
        { key: 'Valid', value: 8 },
        { key: 'Warning', value: 15 },
    ],
    accuracyRange: [
        { key: 'Valid', value: 8 },
        { key: 'Warning', value: 15 },
    ],
    altitudeRange: [
        { key: 'Pianura', value: 300 },
        { key: 'Collina', value: 600 },
        { key: 'Montagna', value: 2000 },
        { key: 'Alta Quota', value: 10000 },
    ],
    distanceRange: [
        { key: 'Light', value: 4000 },
        { key: 'Easy', value: 8000 },
        { key: 'Medium', value: 15000 },
        { key: 'Hard', value: 25000 },
    ],
    speedRange: [
        { key: 'Rest', value: 0.25 },
        { key: 'Walking', value: 1.5 },
        { key: 'Running', value: 6 },
        { key: 'Running High Intensity', value: 14 },
    ],
};
exports.DEFAULT_CAR_GEO_SETTINGS = {
    altitudeAccuracyRange: [
        { key: 'Valid', value: 8 },
        { key: 'Warning', value: 15 },
    ],
    accuracyRange: [
        { key: 'Valid', value: 8 },
        { key: 'Warning', value: 15 },
    ],
    altitudeRange: [
        { key: 'Pianura', value: 300 },
        { key: 'Collina', value: 600 },
        { key: 'Montagna', value: 2000 },
        { key: 'Alta Quota', value: 10000 },
    ],
    distanceRange: [
        { key: 'Light', value: 20000 },
        { key: 'Easy', value: 60000 },
        { key: 'Medium', value: 150000 },
        { key: 'Hard', value: 250000 },
    ],
    speedRange: [
        { key: 'Rest', value: 0.25 },
        { key: '< 50', value: 13.88 },
        { key: '< 70', value: 19.44 },
        { key: '< 90', value: 25 },
        { key: '< 110', value: 30.55 },
        { key: '< 130', value: 36.11 },
        { key: '< 150', value: 41.66 },
        { key: '< 180', value: 50 },
        { key: '< 210', value: 58.33 },
    ],
};
exports.DEFAULT_MOTORCYCLE_GEO_SETTINGS = {
    altitudeAccuracyRange: [
        { key: 'Valid', value: 8 },
        { key: 'Warning', value: 15 },
    ],
    accuracyRange: [
        { key: 'Valid', value: 8 },
        { key: 'Warning', value: 15 },
    ],
    altitudeRange: [
        { key: 'Pianura', value: 300 },
        { key: 'Collina', value: 600 },
        { key: 'Montagna', value: 2000 },
        { key: 'Alta Quota', value: 10000 },
    ],
    distanceRange: [
        { key: 'Light', value: 20000 },
        { key: 'Easy', value: 60000 },
        { key: 'Medium', value: 150000 },
        { key: 'Hard', value: 250000 },
    ],
    speedRange: [
        { key: 'Rest', value: 0.25 },
        { key: '< 50', value: 13.88 },
        { key: '< 70', value: 19.44 },
        { key: '< 90', value: 25 },
        { key: '< 110', value: 30.55 },
        { key: '< 130', value: 36.11 },
        { key: '< 150', value: 41.66 },
        { key: '< 180', value: 50 },
        { key: '< 210', value: 58.33 },
    ],
};
exports.DEFAULT_HEART_SETTINGS = {
    heartRange: [
        { key: 'Low', value: 80 },
        { key: 'Medium', value: 120 },
        { key: 'High', value: 170 },
        { key: 'Red Zone', value: 180 },
    ],
};
