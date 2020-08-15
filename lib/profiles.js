'use strict';

var
        querystring = require('querystring'),
        KlaviyoRequest = require('./request.js');

const
        PERSON = 'person',
        METRIC = 'metric',
        METRICS = 'metrics',
        TIMELINE = 'timeline',
        API_DESC = 'desc',
        HTTP_GET = 'GET',
        HTTP_PUT = 'PUT';

class Profiles
{
    constructor(privateToken)
    {
        this.token = privateToken;
    }

    injectAuth(data={}) {
        data['api_key'] = this.token;
        return data;
    }

    /**
     * Get a profile by its ID.
     * https://www.klaviyo.com/docs/api/people#person
     * @param {string} profileId The Klaviyo generated ID for a profile.
     * @return {object} Profile properties.
     */
    getProfile(profileId=null) {
        if (!profileId) { /* throw error */ }
        const resource = `${PERSON}/${profileId}`;
        return KlaviyoRequest.v1Request({
            resource: resource,
            method: HTTP_GET,
            data: querystring.encode(this.injectAuth())
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
        const resource = `${PERSON}/${profileId}`;
        return KlaviyoRequest.v1Request({
            resource: resource,
            method: HTTP_PUT,
            data: querystring.encode(this.injectAuth(properties))
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
        const resource = `${PERSON}/${profileId}/${METRICS}/${TIMELINE}`;
        let params = {};

        if (since) { params.since = since }
        if (count) { params.count = count }
        if (sort) { params.sort = sort }

        return KlaviyoRequest.v1Request({
            resource: resource,
            method: HTTP_GET,
            data: querystring.encode(this.injectAuth(params))
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
        const resource = `${PERSON}/${profileId}/${METRIC}/${metricId}/${TIMELINE}`;
        let params = {};

        if (since) { params.since = since }
        if (count) { params.count = count }
        if (sort) { params.sort = sort }

        return KlaviyoRequest.v1Request({
            resource: resource,
            method: HTTP_GET,
            data: querystring.encode(this.injectAuth(params))
        });
    }
}

 module.exports = Profiles;
