import activity from './activity.service';
import gpsMetrics from './gps-metrics.service';
import heartMetrics from './heart-metrics.service';
import metabolicMetrics from './metabolic-metrics.service';

export const GPS = gpsMetrics;
export const HR = heartMetrics;
export const MP = metabolicMetrics;
export const ACTIVITY = activity;
