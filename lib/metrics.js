'use strict';

var
    KlaviyoRequest = require('./request.js'),
    Private = require('./private.js');

const
    API_METRIC = 'metric',
    API_METRICS = 'metrics',
    API_TIMELINE = 'timeline',
    API_EXPORT= 'export',
    API_DESC = 'desc',
    HTTP_GET = 'GET';

class Metrics extends Private {
    /**
     * 
     */
    getMetrics({ page=0, count=50 }={}) {
        const resource = `${API_METRICS}`;
        const params = {
            page: page,
            count: count
        };
        return KlaviyoRequest.v1Request({
            resource: resource,
            method: HTTP_GET,
            data: this.prepareV1Data(params)
        });
    }

    /**
     * 
     */
    getMetricsTimeline({ since=null, count=100, sort=API_DESC }={}) {
        const resource = `${API_METRICS}/${API_TIMELINE}`;
        const params = {
            since: since,
            count: count,
            sort: sort
        };
        return KlaviyoRequest.v1Request({
            resource: resource,
            method: HTTP_GET,
            data: this.prepareV1Data(params)
        });
    }

    /**
     * 
     * @param {*} param0 
     */
    getMetricTimelineById({ metricId=null, since=null, count=100, sort=API_DESC }={}) {
        const resource = `${API_METRIC}/${metricId}/${API_TIMELINE}`;
        const params = {
            since: since,
            count: count,
            sort: sort
        };
        return KlaviyoRequest.v1Request({
            resource: resource,
            method: HTTP_GET,
            data: this.prepareV1Data(params)
        });
    }

    /**
     * Exports metric values (counts, uniques, totals).
     * https://www.klaviyo.com/docs/api/metrics#metric-export
     * @param {*} param0 
     */
    getMetricExport({
        metricId=null,
        startDate=null,
        endDate=null,
        unit=null,
        measurement=null,
        where=null,
        by=null,
        count=null
    }={}) {
        const resource = `${API_METRIC}/${metricId}/${API_EXPORT}`;
        const params = {
            start_date: startDate,
            end_date: endDate,
            unit: unit,
            measurement: measurement,
            where: where,
            by: by,
            count: count
        };
        return KlaviyoRequest.v1Request({
            resource: resource,
            method: HTTP_GET,
            data: this.prepareV1Data(params)
        });
    }
}

module.exports = Metrics;
