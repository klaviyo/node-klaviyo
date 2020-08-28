'use strict';

var
    https = require('https');

const
    KLAVIYO_API_HOSTNAME = 'a.klaviyo.com',
    API_ROOT = 'api',
    V1_API = 'v1',
    HTTPS_PORT = 443,
    PACKAGE_VERSION = require('../package.json').version;


class Request {

    /**
     * 
     * @param {string} resource
     * @param {string} data
     * @return {number} 
     */
    static publicRequest ({
        resource,
        data
    }={}) {
        const path = `/${API_ROOT}/${resource}?${data}`;
        return _request({ path: path, method: 'GET' });
    }

    /**
     * 
     * @param {string} resource 
     * @param {string} method 
     * @param {object} data 
     * @return {object}
     */
    static v1Request({
        resource,
        method,
        data=null
    }={}) {
        const path = `/${API_ROOT}/${V1_API}/${resource}?${data}`;
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': data.length
        };
        return _request({ path: path, method: method, body: data, headers: headers });
    }
}

/**
 * 
 * @param {string} path
 * @param {string} method
 * @param {object} headers
 * @param {object} body
 * @return {Promise} 
 */
async function _request({
    path, 
    method='GET', 
    headers={},
    body=null
}={}) {

    if (!headers['User-agent']) { headers['User-agent'] = `Klaviyo-Nodejs/${PACKAGE_VERSION}`; }

    const options = {
        hostname: KLAVIYO_API_HOSTNAME,
        port: HTTPS_PORT,
        path: path,
        method: method,
        headers: headers
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let data = [];
    
            res.on('data', chunk => {
                data.push(chunk);
            });

            res.on('end', () => resolve(JSON.parse(Buffer.concat(data))));
        });
    
        req.on('error', reject);
    
        body = JSON.stringify(body);

        if (body) { req.write(body); }

        req.end();
    });
}

module.exports = Request;
