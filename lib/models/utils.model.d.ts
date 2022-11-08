import { Activity } from './activity.model';
import { KeyValue } from './ng-keyvalue.model';
export declare const getMillisecondsBetweenTwoDates: (deltaTime: number, start: number, isDeltaUTC?: boolean) => number;
export declare const generateActivityNameByTime: () => string;
export declare const isActivity: (object: any) => object is Activity;
export declare const calculateValueInRange: (value: number, range: KeyValue<string, number>[]) => string;
