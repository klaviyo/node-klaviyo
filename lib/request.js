'use strict';

var
    https = require('https'),
    {
        KlaviyoApiError,
        KlaviyoAuthenticationError,
        KlaviyoRateLimitError,
        KlaviyoServerError
    } = require('./errors.js');

const
    KLAVIYO_API_HOSTNAME = 'a.klaviyo.com',
    API_ROOT = 'api',
    V1_API = 'v1',
    V2_API = 'v2',
    HTTPS_PORT = 443,
    PACKAGE_VERSION = require('../package.json').version;


class Request {
    /**
     * Make a request to one of the public API endpoints.
     * @param {string} resource API resource to access.
     * @param {string} data base64 encoded string.
     * @returns {Promise.<number|KlaviyoApiError>} 1 (pass) or 0 (fail) | Non-200 response received.
     */
    static publicRequest ({
        resource,
        data
    } = {}) {
        const path = `/${API_ROOT}/${resource}?${data}`;
        return _request({ path: path, method: 'GET' });
    }

    /**
     * Make a request to a v1 API endpoint
     * @param {string} resource API resource to access
     * @param {string} method HTTP method
     * @param {string} data URL encoded querystring
     * @returns {Promise.<object|KlaviyoApiError>} Parsed JSON response from the API | Non-200 response received.
     */
    static v1Request({
        resource,
        method,
        data=null
    } = {}) {
        const path = `/${API_ROOT}/${V1_API}/${resource}?${data}`;
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        return _request({ path: path, method: method, headers: headers });
    }

    /**
     * Make a request to a v2 API endpoint.
     * @param {string} resource API resource to access.
     * @param {string} method HTTP method.
     * @param {string} data JSON encoded string.
     * @returns {Promise.<object|KlaviyoApiError>} Parsed JSON response from the API | Non-200 response received.
     */
    static v2Request({
        resource,
        method,
        data
    } = {}) {
        const path = `/${API_ROOT}/${V2_API}/${resource}`;
        const headers = {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        };
        return _request({ path: path, method: method, body: data, headers: headers });
    }
}

/**
 * Perform an HTTP request
 * @param {string} path Path to the API resource.
 * @param {string} method HTTP method.
 * @param {object} headers HTTP headers.
 * @param {string} body JSON encoded string.
 * @returns {Promise.<object|KlaviyoApiError>} Parsed JSON response from the API | Non-200 response received.
 * @throws {KlaviyoAuthenticationError} Invalid private API token.
 * @throws {KlaviyoRateLimitError} API rate limit encountered.
 * @throws {KlaviyoServerError} 50X error from Klaviyo.
 * @throws {KlaviyoApiError} Other non-200 status code encountered.
 */
async function _request({
    path, 
    method='GET', 
    headers={},
    body=null
} = {}) {

    if (!headers['User-agent']) { headers['User-agent'] = `Klaviyo-Nodejs/${PACKAGE_VERSION}`; }

    const options = {
        hostname: KLAVIYO_API_HOSTNAME,
        port: HTTPS_PORT,
        path: path,
        method: method,
        headers: headers,
        timeout: 30000 //maybe make this a configurable value?
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let data = [];
    
            res.on('data', chunk => {
                data.push(chunk);
            });

            res.on('end', () => {
                data = processBuffer(data);
                if (res.statusCode == 403) {
                    reject(new KlaviyoAuthenticationError(res.statusCode, data));
                } else if (res.statusCode == 429) {
                    reject(new KlaviyoRateLimitError(res.statusCode, data));
                } else if (res.statusCode == 500 || res.statusCode == 503) {
                    reject(new KlaviyoServerError(res.statusCode, data));
                } else if (res.statusCode != 200) {
                    reject(new KlaviyoApiError(res.statusCode, data));
                } else {
                    resolve(JSON.parse(data));
                }
            });
        });
    
        req.on('error', reject);

        if (body) {
            req.write(body);
        }

        req.end();
    });
}

function processBuffer(data=[]) {
    if (!data[0]) {
        data = '';
    } else {
        data = Buffer.concat(data);
    }
    return data;
}

module.exports = Request;
