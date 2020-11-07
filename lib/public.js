'use strict';

var
    querystring = require('querystring'),
    KlaviyoRequest = require('./request.js'),
    {
        KlaviyoError
    } = require('./errors.js');

const
    API_ROOT = 'api',
    IDENTIFY = 'identify',
    TRACK = 'track',
    TRACK_ONCE_KEY = '__track_once__',
    WRITE_ACCESS_ERROR = 'This value is not writeable.',
    ERROR_MESSAGE_ID_AND_EMAIL = 'You must identify a user by email or ID.';

class Public {
    constructor(publicToken) {
        this._token = publicToken;
    }

    get token() {
        return this._token;
    }

    set token(value) {
        throw new KlaviyoError(WRITE_ACCESS_ERROR);
    }

        /**
     * Make a request to one of the public API endpoints.
     * @param {string} resource API resource to access.
     * @param {string} data base64 encoded string.
     * @returns {Promise.<number|KlaviyoApiError>} 1 (pass) or 0 (fail) | Non-200 response received.
     */
    publicRequest({
        resource,
        params
    } = {}) {
        params.data.token = this.token;
        params.test = params.test ? 1 : 0;
        params.data = Buffer.from(JSON.stringify(params.data)).toString('base64');
        const query = querystring.encode(params);
        const path = `/${API_ROOT}/${resource}?${query}`;
        return KlaviyoRequest._request({ path: path });
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
        email,
        id,
        properties={},
        isTest=false
    } = {}) {
        if (!email && !id) { throw new KlaviyoError(ERROR_MESSAGE_ID_AND_EMAIL); }

        if (email) { properties.email = email; }

        if (id) { properties.id = id; }

        const data = {
            properties: properties
        }

        return this.publicRequest({ resource: IDENTIFY, params: { data: data, test: isTest }});
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
        email,
        id,
        properties={},
        customerProperties={},
        timestamp,
        ipAddress,
        isTest=false
    } = {}) {
        if (!email && !id) { throw new KlaviyoError(ERROR_MESSAGE_ID_AND_EMAIL); }

        if (!event) { throw new KlaviyoError('Event name was not provided.'); }

        if (email) { customerProperties.email = email; }

        if (id) { customerProperties.id = id; }

        let data = {
            token: this.token,
            event: event,
            properties: properties,
            customer_properties: customerProperties,
            time: timestamp ? (timestamp != null) : Math.floor(Date.now() / 1000)
        };

        if (ipAddress) { data.ip = ipAddress }

        return this.publicRequest({ resource: TRACK, params: { data: data, test: isTest }});
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
        email,
        id,
        properties={},
        customerProperties={},
        timestamp,
        ipAddress,
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
