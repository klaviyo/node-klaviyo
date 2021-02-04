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
    HTTPS_PORT = 443,
    DEFAULT_HTTP_VERB = 'GET',
    PACKAGE_VERSION = require('../package.json').version;


class Request {
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
    static async _request({
        path,
        method = DEFAULT_HTTP_VERB,
        headers = {},
        body
    } = {}) {

        headers['User-Agent'] = `Klaviyo-Node.js/${PACKAGE_VERSION}`;

        const options = {
            hostname: KLAVIYO_API_HOSTNAME,
            port: HTTPS_PORT,
            path: path,
            method: method,
            headers: headers,
            timeout: 10000 //maybe make this a configurable value?
        };

        return new Promise((resolve, reject) => {
            const request = https.request(options, (response) => {
                let data = [];

                response.on('data', chunk => {
                    data.push(chunk);
                });

                response.on('end', () => {
                    data = processBuffer(data);
                    try {
                        data = handleResponse(response, data);
                    } catch (error) {
                        reject(error);
                    } finally {
                        resolve(data);
                    }
                });
            });

            request.on('error', reject);

            if (body) {
                request.write(body);
            }

            request.end();
        });
    }

    //utility method to remove unused/empty keys from payloads
    static clean(obj) {
        for (var propName in obj) {
            if (obj[propName] === null || obj[propName] === undefined) {
                delete obj[propName];
            }
        }
    }
}

function processBuffer(data = []) {
    if (!data[0]) {
        data = '{}';
    } else {
        data = Buffer.concat(data);
    }
    return data;
}

function handleResponse(response, data) {
    let statusCode = response.statusCode;
    if (statusCode == 403) {
        throw new KlaviyoAuthenticationError(statusCode, data);
    } else if (statusCode == 429) {
        throw new KlaviyoRateLimitError(statusCode, data, Number(response.headers['retry-after']));
    } else if (statusCode == 500 || statusCode == 503) {
        throw new KlaviyoServerError(statusCode, data);
    } else if (statusCode != 200) {
        throw new KlaviyoApiError(statusCode, data);
    } else {
        return JSON.parse(data);
    }
}

module.exports = Request;
