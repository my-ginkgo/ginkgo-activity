// Converts distance between 2 coordinates
const calcCrow = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    lat1 = toRad(lat1);
    lat2 = toRad(lat2);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
};

// Converts numeric degrees to radians
const toRad = (value: number) => {
    return value * Math.PI / 180;
};


// Converts from radians to degrees.
const toDegrees = (radians: number): number => {
    return radians * 180 / Math.PI;
};

// Calc Bearing/Heading between two coordinates
const calcBearing = (startLat: number, startLng: number, destLat: number, destLng: number): number => {
    startLat = toRad(startLat);
    startLng = toRad(startLng);
    destLat = toRad(destLat);
    destLng = toRad(destLng);

    const y = Math.sin(destLng - startLng) * Math.cos(destLat);
    const x = Math.cos(startLat) * Math.sin(destLat) -
        Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
    let brng = Math.atan2(y, x);
    brng = toDegrees(brng);
    return (brng + 360) % 360;
};
export default {
    calcBearing,
    toDegrees,
    toRad,
    calcCrow,
};
