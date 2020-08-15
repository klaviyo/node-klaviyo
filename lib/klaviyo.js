'use strict';

var
        Public = require('./public.js'),
        Profiles = require('./profiles.js');

class Klaviyo {
    constructor({ publicToken=null, privateToken=null }) {
        if (!publicToken && !privateToken) { /* TODO: throw error */ }

        if (publicToken) {
            this._public = new Public(publicToken);
        }
        if (privateToken) {
            this._profiles = new Profiles(privateToken);
        }
    }

    get public() {
        if (!this._public) {
            //throw error
        } else {
            return this._public;
        }
    }

    set public(value) {
        //throw error
    }

    get profiles() {
        if (!this._profiles) {
            //throw error
        } else {
            return this._profiles;
        }
    }

    set profiles(value) {
        //throw error
    }
}

module.exports = Klaviyo;
