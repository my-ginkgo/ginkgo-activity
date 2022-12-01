export declare interface MediaPosition {
  lat: number;
  long: number;
  altitude: number;
}

export declare interface Media {
  id: string;
  name: string;
  fileName: string;
  src: string;
  position: MediaPosition;
  extension: string;
  memoryByteSize?: number;
  lensModel?: string;
  width?: number;
  height?: number;
  updatedAt: Date;
  createdAt: Date;
  performance?: boolean;
}
