'use strict';

var
    Private = require('./private.js'),
    {
        KlaviyoError
    } = require('./errors.js');

class Profiles extends Private {
    /**
     * Get a profile by its ID.
     * https://www.klaviyo.com/docs/api/people#person
     * @param {string} profileId The Klaviyo generated ID for a profile.
     * @returns {Promise.<object|KlaviyoApiError>} Profile properties | Non-200 response received.
     */
    getProfile(profileId) {
        if (!profileId) { throw new KlaviyoError('Profile ID was not provided.'); }
        const resource = `${Private.API_PERSON}/${profileId}`;
        return this.v1Request({
            resource: resource,
            method: Private.HTTP_GET
        });
    }

    /**
     * Update the properties for a profile.
     * https://www.klaviyo.com/docs/api/people#person
     * @param {string} profileId The Klaviyo generated ID for a profile.
     * @param {object} properties Properties to update on a profile.
     * @returns {Promise.<object|KlaviyoApiError>} Profile properties | Non-200 response received.
     */
    updateProfile({ profileId, properties={} } = {}) {
        if (!profileId) { throw new KlaviyoError('Profile ID was not provided.'); }
        const resource = `${Private.API_PERSON}/${profileId}`;
        return this.v1Request({
            resource: resource,
            method: Private.HTTP_PUT,
            data: properties
        });
    }

    /**
     * Get the timeline for all events on a profile.
     * https://www.klaviyo.com/docs/api/people#metrics-timeline
     * @param {string} profileId The Klaviyo generated ID for a profile.
     * @param {string} since A timestamp or uuid.
     * @param {number} count The max number of records the response will return.
     * @param {string} sort The order in which results should be returned.
     * @returns {Promise.<object|KlaviyoApiError>} Event data tied to the profile | Non-200 response received.
     */
    getProfileMetricsTimeline({ profileId, since, count=100, sort=Private.API_DESC } = {}) {
        if (!profileId) { throw new KlaviyoError('Profile ID was not provided.'); }
        const resource = `${Private.API_PERSON}/${profileId}/${Private.API_METRICS}/${Private.API_TIMELINE}`;
        const params = {
            since: since,
            count: count,
            sort: sort
        }

        return this.v1Request({
            resource: resource,
            method: Private.HTTP_GET,
            data: params
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
     * @returns {Promise.<object|KlaviyoApiError>} Event data for the specified metric tied to the profile | Non-200 response received.
     */
    getProfileMetricsTimelineById({ profileId, metricId, since, count=100, sort=Private.API_DESC } = {}) {
        if (!profileId || !metricId) { throw new KlaviyoError('Profile or metric ID was not provided.'); }
        const resource = `${Private.API_PERSON}/${profileId}/${Private.API_METRIC}/${metricId}/${Private.API_TIMELINE}`;
        const params = {
            since: since,
            count: count,
            sort: sort
        }

        return this.v1Request({
            resource: resource,
            method: Private.HTTP_GET,
            data: params
        });
    }

    /**
     * Get the person_ID for a profile using Email
     * @param {string} email of the profile to get ID
     * @returns {Promise<Object|KlaviyoApiError>}
     */
    getProfileIdByEmail(email) {
        if (!email) { throw new KlaviyoError('Email address was not provided'); }
        const resource = `${Private.API_PEOPLE}/${Private.API_SEARCH}`;
        const params = {
            email: email
        };

        return this.v2Request({
            resource: resource,
            method: Private.HTTP_GET,
            data: params
        });
    }

    /**
     * Unset properties on a given profile
     * @param {string} profileId The Klaviyo generated ID for a profile.
     * @param {list} properties The list of properties to unset.
     * @returns {Promise<Object|KlaviyoApiError>} Updated profile data | Non-200 response received.
     */
    unsetProfileProperties({ profileId, properties=[] } = {}) {
        if (!profileId) { throw new KlaviyoError('Profile ID was not provided'); }
        if (properties.length < 1) { throw new KlaviyoError('No properties provided.'); }
        const resource = `${Private.API_PERSON}/${profileId}`;
        const params = {
            $unset: JSON.stringify(properties),
        };

        return this.v1Request({
            resource: resource,
            method: Private.HTTP_PUT,
            data: params
        });
    }
}

 module.exports = Profiles;
