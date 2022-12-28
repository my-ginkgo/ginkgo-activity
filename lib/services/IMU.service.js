"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.centripetalForce = exports.kineticEnergy = exports.linearAcceleration = exports.linearVelocity = exports.angularVelocity = exports.angularAcceleration = exports.testKaimanFilter = void 0;
class KalmanFilter {
    // Inizializza il filtro con i parametri del modello dinamico dell'oggetto e le matrici di covarianza
    constructor(x0, P0, Q, R, A, H) {
        this.x = x0;
        this.P = P0;
        this.Q = Q;
        this.R = R;
        this.A = A;
        this.H = H;
    }
    // Aggiorna il filtro con una nuova misura di stato
    update(z) {
        // Predizione dello stato
        this.x = this.A * this.x;
        this.P = this.A * this.P * this.A + this.Q;
        // Aggiornamento dello stato
        const K = this.H * this.P * this.H + this.R;
        this.x = this.x + K * (z - this.H * this.x);
        this.P = (1 - K * this.H) * this.P;
    }
    // Restituisce la stima attuale delle variabili di stato
    getState() {
        return this.x;
    }
}
const testKaimanFilter = () => {
    // Crea un nuovo filtro di Kalman con i parametri iniziali
    const filter = new KalmanFilter(0, 1, 0.1, 1, 1, 1);
    // Aggiorna il filtro con una nuova misura di stato
    filter.update(1);
    // Stampa la stima attuale delle variabili di stato
    console.log(filter.getState());
};
exports.testKaimanFilter = testKaimanFilter;
const angularAcceleration = (x, y, z) => {
    return Math.sqrt(x * x + y * y + z * z) - 9.81;
};
exports.angularAcceleration = angularAcceleration;
const angularVelocity = (angularAccelerations) => {
    let angularVelocity = 0;
    for (const m of angularAccelerations) {
        angularVelocity = (0, exports.angularAcceleration)(m.x, m.y, m.z) * m.time + angularVelocity;
    }
    return angularVelocity;
};
exports.angularVelocity = angularVelocity;
const linearVelocity = (distance1, distance2, time1, time2) => {
    return (distance2 - distance1) / (time2 - time1);
};
exports.linearVelocity = linearVelocity;
const linearAcceleration = (linearVelocity1, linearVelocity2, time1, time2) => {
    return (linearVelocity2 - linearVelocity1) / (time2 - time1);
};
exports.linearAcceleration = linearAcceleration;
const kineticEnergy = (mass, linearVelocity) => {
    return (1 / 2) * mass * linearVelocity ** 2;
};
exports.kineticEnergy = kineticEnergy;
const centripetalForce = (mass, linearVelocity, radius) => {
    return mass * linearVelocity ** 2 / radius;
};
exports.centripetalForce = centripetalForce;
