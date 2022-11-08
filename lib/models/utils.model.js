"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateValueInRange = exports.isActivity = exports.generateActivityNameByTime = exports.getMillisecondsBetweenTwoDates = void 0;
const getMillisecondsBetweenTwoDates = (deltaTime, start, isDeltaUTC = false) => {
    const startTime = new Date(start);
    let seconds = Math.round(new Date(deltaTime).getSeconds() - startTime.getSeconds());
    let minutes = Math.round(new Date(deltaTime).getMinutes() - startTime.getMinutes());
    let hours = 0;
    if (isDeltaUTC) {
        hours = Math.round(new Date(deltaTime).getHours() - startTime.getHours() - new Date(deltaTime * 1000).getTimezoneOffset() / 60);
    }
    else {
        hours = Math.round(new Date(deltaTime).getHours() - startTime.getHours());
    }
    if (seconds < 0) {
        seconds = 60 - seconds * -1;
        minutes = minutes - 1;
    }
    if (minutes < 0) {
        minutes = 60 - minutes * -1;
        hours = hours - 1;
    }
    if (hours < 0) {
        hours = 24 - hours * -1;
    }
    return hours * 3600 * 1000 + minutes * 60 * 1000 + seconds * 1000;
};
exports.getMillisecondsBetweenTwoDates = getMillisecondsBetweenTwoDates;
const generateActivityNameByTime = () => {
    const now = new Date();
    if (now.getHours() <= 11 && now.getHours() > 6) {
        return 'Morning Training';
    }
    if (now.getHours() <= 14 && now.getHours() > 11) {
        return 'Lounch Training';
    }
    if (now.getHours() <= 19 && now.getHours() > 14) {
        return 'Afternoon Training';
    }
    if (now.getHours() <= 6 && now.getHours() > 19) {
        return 'Night Training';
    }
    return 'Default';
};
exports.generateActivityNameByTime = generateActivityNameByTime;
const isActivity = (object) => {
    return 'blocks' in object;
};
exports.isActivity = isActivity;
const calculateValueInRange = (value, range) => {
    if (value === 0) {
        return range[0].key;
    }
    for (let i = 0; i < range.length; i++) {
        if (i === 0) {
            if (value > 0 && value <= range[i].value) {
                return range[i].key;
            }
        }
        else {
            if (value > range[i - 1].value && value <= range[i].value) {
                return range[i].key;
            }
        }
    }
    return 'Out of range';
};
exports.calculateValueInRange = calculateValueInRange;
