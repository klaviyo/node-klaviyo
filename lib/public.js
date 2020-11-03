'use strict';

var
    querystring = require('querystring'),
    KlaviyoRequest = require('./request.js'),
    {
        KlaviyoError
    } = require('./errors.js');

const
    IDENTIFY = 'identify',
    TRACK = 'track',
    TRACK_ONCE_KEY = '__track_once__',
    ERROR_MESSAGE_ID_AND_EMAIL = 'You must identify a user by email or ID.';

class Public {
    constructor(publicToken) {
        this.token = publicToken;
    }

    /**
     * Process event/customer properties into query string.
     * @param {object} data Form data to be encoded.
     * @param {boolean} isTest Test request flag.
     * @returns {string} A base64 and URL encoded query string.
     */
    static buildQuery ({ data={}, isTest=false } = {}) {
        return querystring.encode({
            data: Buffer.from(JSON.stringify(data)).toString('base64'),
            test: isTest ? 1 : 0
        });
    }

    /**
     * Create/update a user with provided customer properties.
     * https://www.klaviyo.com/docs/http-api#identify
     * @param {string} email Email address.
     * @param {string} id External id for customer.
     * @param {object} properties Information about the customer.
     * @param {boolean} isTest Should this be a test request.
     * @returns {Promise.<number|KlaviyoAPIError>} 1 (pass) or 0 (fail) | Non-200 response received
     */
    identify({
        email=null,
        id=null,
        properties={},
        isTest=false
    } = {}) {
        if (!email && !id) { throw new KlaviyoError(ERROR_MESSAGE_ID_AND_EMAIL); }

        if (email) { properties.email = email; }

        if (id) { properties.id = id; }

        const params = {
            token: this.token,
            properties: properties
        };

        const query = Public.buildQuery({ data: params, isTest: isTest });

        return KlaviyoRequest.publicRequest({ resource: IDENTIFY, data: query });
    }

    /**
     * Create an event (metric) in Klaviyo for a profile.
     * https://www.klaviyo.com/docs/http-api#track
     * @param {string} event Event name to be tracked.
     * @param {string} email Email address.
     * @param {string} id External id for customer.
     * @param {object} properties Information about the event.
     * @param {object} customerProperties Information about the customer.
     * @param {number} timestamp Time the event occurred.
     * @param {string} ipAddress Ip address of the customer.
     * @param {boolean} isTest Should this be a test request.
     * @returns {Promise.<number|KlaviyoAPIError>} 1 (pass) or 0 (fail) | Non-200 response received
     */
    track({
        event,
        email=null,
        id=null,
        properties={},
        customerProperties={},
        timestamp=null,
        ipAddress=null,
        isTest=false
    } = {}) {
        if (!email && !id) { throw new KlaviyoError(ERROR_MESSAGE_ID_AND_EMAIL); }

        if (!event) { throw new KlaviyoError('Event name was not provided.'); }

        if (email) { customerProperties.email = email; }

        if (id) { customerProperties.id = id; }

        let params = {
            token: this.token,
            event: event,
            properties: properties,
            customer_properties: customerProperties,
            time: timestamp ? (timestamp != null) : Math.floor(Date.now() / 1000)
        };

        if (ipAddress) { params.ip = ipAddress }

        const query = Public.buildQuery({ data: params, isTest: isTest });

        return KlaviyoRequest.publicRequest({ resource: TRACK, data: query });
    }

    /**
     * Create an event (metric) in Klaviyo for a profile with __track_once__ flag.
     * https://www.klaviyo.com/docs/http-api#track
     * @param {string} event Event name to be tracked.
     * @param {string} email Email address.
     * @param {string} id External id for customer.
     * @param {object} properties Information about the event.
     * @param {object} customerProperties Information about the customer.
     * @param {number} timestamp Time the event occurred.
     * @param {string} ipAddress Ip address of the customer.
     * @param {boolean} isTest Should this be a test request.
     * @returns {Promise.<number|KlaviyoAPIError>} 1 (pass) or 0 (fail) | Non-200 response received
     */
    trackOnce({
        event,
        email=null,
        id=null,
        properties={},
        customerProperties={},
        timestamp=null,
        ipAddress=null,
        isTest=false
    } = {}) {
        properties[TRACK_ONCE_KEY] = true;

        return this.track({
            event: event,
            email: email,
            id: id,
            properties: properties,
            customerProperties: customerProperties,
            timestamp: timestamp,
            ipAddress: ipAddress,
            isTest: isTest
        });
    }
}

module.exports = Public;
