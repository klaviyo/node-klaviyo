'use strict';

var
    Public = require('./public.js'),
    Profiles = require('./profiles.js'),
    Metrics = require('./metrics.js'),
    Lists = require('./lists.js'),
    Campaigns = require('./campaigns.js'),
    {
        KlaviyoError,
        KlaviyoConfigurationError
    } = require('./errors.js');

const WRITE_ACCESS_ERROR = 'This value is not writeable.';

class Klaviyo {
    constructor({ publicToken, privateToken } = {}) {
        if (!publicToken && !privateToken) { 
            throw new KlaviyoConfigurationError('You must provide a public or private api token.');
        }

        if (publicToken) {
            this._public = new Public(publicToken);
        }
        if (privateToken) {
            this._profiles = new Profiles(privateToken);
            this._metrics = new Metrics(privateToken);
            this._lists = new Lists(privateToken);
            this._campaigns = new Campaigns(privateToken);
        }
    }

    get public() {
        if (this._public) {
            return this._public;
        } else {
            throw new KlaviyoConfigurationError('Public api token was not provided.');
        }
    }

    set public(value) {
        throw new KlaviyoError(WRITE_ACCESS_ERROR);
    }

    get profiles() {
        if (this._profiles) {
            return this._profiles;
        } else {
            throw new KlaviyoConfigurationError('Private api token was not provided.');
        }
    }

    set profiles(value) {
        throw new KlaviyoError(WRITE_ACCESS_ERROR);
    }

    get metrics() {
        if (this._metrics) {
            return this._metrics;
        } else {
            throw new KlaviyoConfigurationError('Private api token was not provided.');
        }
    }

    set metrics(value) {
        throw new KlaviyoError(WRITE_ACCESS_ERROR);
    }

    get lists() {
        if (this._lists) {
            return this._lists;
        } else {
            throw new KlaviyoConfigurationError('Private api token was not provided.');
        }
    }

    set lists(value) {
        throw new KlaviyoError(WRITE_ACCESS_ERROR);
    }

    get campaigns() {
        if (this._campaigns) {
            return this._campaigns;
        } else {
            throw new KlaviyoConfigurationError('Private api token was not provided.');
        }
    }

     set campaigns(value) {
        throw new KlaviyoError(WRITE_ACCESS_ERROR);
    }
}

module.exports = Klaviyo;
