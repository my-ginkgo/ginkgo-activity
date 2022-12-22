export interface Sticky {
    fix: number;
    precision: number;
}
export interface Sample {
    value: number[];
    cts: number;
    date: Date;
    sticky: Sticky;
}
export interface Streams {
    ACCL: BaseStream;
    ALLD: BaseStream;
    FCNM: BaseStream;
    GPS5: BaseStream;
    GYRO: BaseStream;
    ISOE: BaseStream;
    SHUT: BaseStream;
    WBAL: BaseStream;
    WRGB: BaseStream;
}
export interface BaseStream {
    samples: Sample[];
    name: string;
    units: string;
}
export interface TelemetryExport {
    streams: Streams;
    deviceName: string;
}
