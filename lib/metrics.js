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
     * Fetches all metrics inside of an account.
     * https://www.klaviyo.com/docs/api/metrics#metrics
     * @param {int} page Page of results to return.
     * @param {int} count Number of results to return.
     * @returns {Promise.<object|KlaviyoApiError>} Object containing a list of metric records | Non-200 response received.
     */
    getMetrics({ page=0, count=50 } = {}) {
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
     * Fetches all of the metrics and its events regardless of the statistic.
     * https://www.klaviyo.com/docs/api/metrics#metrics-timeline
     * @param {string or number} since Next attribute of the previous api call or unix timestamp.
     * @param {number} count Number of events returned.
     * @param {string} sort Sort order for timeline.
     * @returns {Promise.<object|KlaviyoApiError>} Metric timeline information | Non-200 response received.
     */
    getMetricsTimeline({ since=null, count=100, sort=API_DESC } = {}) {
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
     * Returns a timeline of events for a specific metric.
     * https://www.klaviyo.com/docs/api/metrics#metric-timeline
     * @param {string} metricId Metric ID for the statistic.
     * @param {string or number} since Next attribute of the previous api call or unix timestamp.
     * @param {number} count Number of events returned.
     * @param {string} sort Sort order for timeline.
     * @returns {Promise.<object|KlaviyoApiError>} Metric timeline information | Non-200 response received.
     */
    getMetricTimelineById({ metricId=null, since=null, count=100, sort=API_DESC } = {}) {
        if (!metricId) { throw new KlaviyoError('Metric ID was not provided.'); }
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
     * @param {string} metricId Metric ID for the statistic.
     * @param {string} startDate Timestamp for the beginning of the query.
     * @param {string} endDate Timestamp for the end of the query.
     * @param {string} unit Day, week, or month.
     * @param {string} measurement Type of metric to fetch - 'unique', 'count', 'value', or 'sum'.
     * @param {string} where Condition to use to filter the set of events (JSON encoded list).
     * @param {string} by The name of a property to segment.
     * @param {number} count The number of segments to return.
     * @returns @returns {Promise.<object|KlaviyoApiError>} Metric information | Non-200 response received.
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
    } = {}) {
        if (!metricId) { throw new KlaviyoError('Metric ID was not provided.'); }
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
