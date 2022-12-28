export declare const testKaimanFilter: () => void;
export declare const angularAcceleration: (x: number, y: number, z: number) => number;
export declare const angularVelocity: (angularAccelerations: {
    x: number;
    y: number;
    z: number;
    time: number;
}[]) => number;
export declare const linearVelocity: (distance1: number, distance2: number, time1: number, time2: number) => number;
export declare const linearAcceleration: (linearVelocity1: number, linearVelocity2: number, time1: number, time2: number) => number;
export declare const kineticEnergy: (mass: number, linearVelocity: number) => number;
export declare const centripetalForce: (mass: number, linearVelocity: number, radius: number) => number;
