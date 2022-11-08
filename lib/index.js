'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.GPSMetrics = void 0;
const gps_metrics_service_1 = require('./services/gps-metrics.service');
exports.GPSMetrics = {
  calcAll: gps_metrics_service_1.calcAll,
  calcValues: gps_metrics_service_1.calcValues,
  calcRanges: gps_metrics_service_1.calcRanges,
};
