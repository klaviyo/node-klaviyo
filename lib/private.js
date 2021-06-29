'use strict';

var
    KlaviyoRequest = require('./request.js'),
    {
        KlaviyoError
    } = require('./errors.js');

const WRITE_ACCESS_ERROR = 'This value is not writeable.',
    API_ROOT = 'api',
    V1_API = 'v1',
    V2_API = 'v2';

class Private {
    constructor(privateToken) {
        this._token = privateToken;
    }

    get token() {
        return this._token;
    }

    set token(value) {
        throw new KlaviyoError(WRITE_ACCESS_ERROR);
    }

    /**
     * Make a request to a v1 API endpoint
     * @param {string} resource API resource to access
     * @param {string} method HTTP method
     * @param {object} data request data (query params or POST|PUT body)
     * @returns {Promise.<object|KlaviyoApiError>} Parsed JSON response from the API | Non-200 response received.
     */
    v1Request({
        resource,
        method,
        data = {}
    } = {}) {
        data['api_key'] = this.token;
        KlaviyoRequest.clean(data);

        const request = {
            method,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
        };
        data = new URLSearchParams(data).toString();
        let path = `/${API_ROOT}/${V1_API}/${resource}`;
        if (Private.HTTP_GET === method) {
            path = `${path}?${data}`;
        } else {
            request.body = data;
        }
        request.path = path;
        return KlaviyoRequest._request(request);
    }

    /**
     * Make a request to a v2 API endpoint.
     * @param {string} resource API resource to access.
     * @param {string} method HTTP method.
     * @param {string} data JSON encoded string.
     * @returns {Promise.<object|KlaviyoApiError>} Parsed JSON response from the API | Non-200 response received.
     */
    v2Request({
        resource,
        method,
        data = {}
    } = {}) {
        data['api_key'] = this.token;
        KlaviyoRequest.clean(data);
        data = JSON.stringify(data);
        const path = `/${API_ROOT}/${V2_API}/${resource}`;
        const headers = {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        };
        return KlaviyoRequest._request({
            path: path,
            method: method,
            body: data,
            headers: headers
        });
    }

    /**
     * Class constants
     */
    static get HTTP_GET() {
        return 'GET';
    }

    static get HTTP_PUT() {
        return 'PUT';
    }

    static get HTTP_POST() {
        return 'POST';
    }

    static get API_PERSON() {
        return 'person';
    }

    static get API_METRIC() {
        return 'metric';
    }

    static get API_METRICS() {
        return 'metrics';
    }

    static get API_TIMELINE() {
        return 'timeline';
    }

    static get API_EXPORT() {
        return 'export';
    }

    static get API_DESC() {
        return 'desc';
    }

    static get API_PEOPLE() {
        return 'people';
    }

    static get API_SEARCH() {
        return 'search';
    }

    static get API_DATA_PRIVACY() {
        return 'data-privacy';
    }

    static get API_DELETION_REQUEST() {
        return 'deletion-request';
    }

    static get API_CAMPAIGN() {
        return 'campaign';
    }

    static get API_CAMPAIGNS() {
        return 'campaigns';
    }
}

module.exports = Private;
