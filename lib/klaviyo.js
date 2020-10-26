'use strict';

var
    Public = require('./public.js'),
    Profiles = require('./profiles.js'),
    Metrics = require('./metrics.js'),
    Lists = require('./lists.js'),
    {
        KlaviyoError,
        KlaviyoConfigurationError
    } = require('./errors.js');

const
    WRITE_ACCESS_ERROR = 'This value is not writeable.';

class Klaviyo {
    constructor({ publicToken=null, privateToken=null } = {}) {
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
        }
    }

    get public() {
        if (!this._public) {
            throw new KlaviyoConfigurationError('Public api token was not provided.');
        } else {
            return this._public;
        }
    }

    set public(value) {
        throw new KlaviyoError(WRITE_ACCESS_ERROR);
    }

    get profiles() {
        if (!this._profiles) {
            throw new KlaviyoConfigurationError('Private api token was not provided.');
        } else {
            return this._profiles;
        }
    }

    set profiles(value) {
        throw new KlaviyoError(WRITE_ACCESS_ERROR);
    }

    get metrics() {
        if (!this._metrics) {
            throw new KlaviyoConfigurationError('Private api token was not provided.');
        } else {
            return this._metrics;
        }
    }

    set metrics(value) {
        throw new KlaviyoError(WRITE_ACCESS_ERROR);
    }

    get lists() {
        if (!this._lists) {
            throw new KlaviyoConfigurationError('Private api token was not provided.');
        } else {
            return this._lists;
        }
    }

    set lists(value) {
        throw new KlaviyoError(WRITE_ACCESS_ERROR);
    }

}

module.exports = Klaviyo;
