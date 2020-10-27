'use strict';

var
    querystring = require('querystring'),
    {
        KlaviyoError
    } = require('./errors.js');

const
    WRITE_ACCESS_ERROR = 'This value is not writeable.';

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

    prepareV1Data(data={}) {
        data['api_key'] = this.token;
        data = querystring.stringify(data);
        return data;
    }

    prepareV2Data(data={}) {
        data['api_key'] = this.token;
        data = JSON.stringify(data);
        return data;
    }
}

module.exports = Private;
