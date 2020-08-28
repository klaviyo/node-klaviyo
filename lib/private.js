'use strict';

var
    querystring = require('querystring');

class Private {
    constructor(privateToken)
    {
        this._token = privateToken;
    }
    
    get token() {
        return this._token;
    }

    set token(value) {
        //throw error
    }

    prepareV1Data(data={}) {
        data['api_key'] = this.token;
        data = querystring.stringify(data);
        return data;
    }
}

module.exports = Private;
