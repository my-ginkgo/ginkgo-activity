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

export interface GPS5 {
  samples: Sample[];
  name: string;
  units: string[];
}

export interface Streams {
  GPS5: GPS5;
}

export interface TelemetryExport {
  streams: Streams;
  deviceName: string;
}



