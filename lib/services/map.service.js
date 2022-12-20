"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toRad = exports.calcCrow = void 0;
// Converts distance between 2 coordinates
const calcCrow = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // km
    const dLat = (0, exports.toRad)(lat2 - lat1);
    const dLon = (0, exports.toRad)(lon2 - lon1);
    lat1 = (0, exports.toRad)(lat1);
    lat2 = (0, exports.toRad)(lat2);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
};
exports.calcCrow = calcCrow;
// Converts numeric degrees to radians
const toRad = (value) => {
    return value * Math.PI / 180;
};
exports.toRad = toRad;
