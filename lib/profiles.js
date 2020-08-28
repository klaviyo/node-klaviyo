'use strict';

var
    KlaviyoRequest = require('./request.js'),
    Private = require('./private.js');

const
    API_PERSON = 'person',
    API_METRIC = 'metric',
    API_METRICS = 'metrics',
    API_TIMELINE = 'timeline',
    API_DESC = 'desc',
    HTTP_GET = 'GET',
    HTTP_PUT = 'PUT';

class Profiles extends Private {
    /**
     * Get a profile by its ID.
     * https://www.klaviyo.com/docs/api/people#person
     * @param {string} profileId The Klaviyo generated ID for a profile.
     * @return {object} Profile properties.
     */
    getProfile(profileId=null) {
        if (!profileId) { /* throw error */ }
        const resource = `${API_PERSON}/${profileId}`;
        return KlaviyoRequest.v1Request({
            resource: resource,
            method: HTTP_GET,
            data: this.prepareV1Data()
        });
    }

    /**
     * Update the properties for a profile.
     * https://www.klaviyo.com/docs/api/people#person
     * @param {string} profileId The Klaviyo generated ID for a profile.
     * @param {object} properties Properties to update on a profile.
     * @return {object} Profile properties.
     */
    updateProfile({ profileId=null, properties={} }={}) {
        if (!profileId) { /* throw error */ }
        const resource = `${API_PERSON}/${profileId}`;
        return KlaviyoRequest.v1Request({
            resource: resource,
            method: HTTP_PUT,
            data: this.prepareV1Data(properties)
        });
    }

    /**
     * Get the timeline for all events on a profile.
     * https://www.klaviyo.com/docs/api/people#metrics-timeline
     * @param {string} profileId The Klaviyo generated ID for a profile.
     * @param {string} since A timestamp or uuid.
     * @param {number} count The max number of records the response will return.
     * @param {string} sort The order in which results should be returned.
     * @return {object} Event data tied to the profile.
     */
    getProfileMetricsTimeline({ profileId=null, since=null, count=100, sort=API_DESC }={}) {
        if (!profileId) { /* throw error */ }
        const resource = `${API_PERSON}/${profileId}/${API_METRICS}/${API_TIMELINE}`;
        const params = {
            since: since,
            count: count,
            sort: sort
        }

        return KlaviyoRequest.v1Request({
            resource: resource,
            method: HTTP_GET,
            data: this.prepareV1Data(params)
        });
    }

    /**
     * Get the timeline for a specific metric on a profile.
     * https://www.klaviyo.com/docs/api/people#metric-timeline
     * @param {string} profileId The Klaviyo generated ID for a profile.
     * @param {string} metricId The Klaviyo generated ID for a metric.
     * @param {string} since A timestamp or uuid.
     * @param {number} count The max number of records the response will return.
     * @param {string} sort The order in which results should be returned.
     * @return {object} Event data for the specified metric tied to the profile.
     */
    getProfileMetricsTimelineById({ profileId=null, metricId=null, since=null, count=100, sort=API_DESC }={}) {
        if (!profileId) { /* throw error */ }
        if (!metricId) { /* throw error */ }
        const resource = `${API_PERSON}/${profileId}/${API_METRIC}/${metricId}/${API_TIMELINE}`;
        const params = {
            since: since,
            count: count,
            sort: sort
        }

        return KlaviyoRequest.v1Request({
            resource: resource,
            method: HTTP_GET,
            data: this.prepareV1Data(params)
        });
    }
}

 module.exports = Profiles;
