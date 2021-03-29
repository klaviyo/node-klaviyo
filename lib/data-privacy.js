'use strict';

var
    Private = require('./private.js'),
    {
        KlaviyoError
    } = require('./errors.js');

class DataPrivacy extends Private {
    /**
     * Request a data privacy-compliant deletion for the person record corresponding to an email address, phone number, or person identifier.
     * https://www.klaviyo.com/docs/api/v2/data-privacy#post-deletion-request
     * @param email
     * @param phone_number
     * @param person_id
     * @returns {Promise<Object|KlaviyoApiError>}
     */
    requestProfileDeletion({ email, phone_number, person_id } = {}) {
        const resource = `${Private.API_DATA_PRIVACY}/${Private.API_DELETION_REQUEST}`;
        const input = {
            email: email,
            phone_number: phone_number,
            person_id: person_id
        }

        let params = {};
        let counter = 0;

        for (let paramsKey in input) {
            if (typeof input[paramsKey] != 'undefined') {
                counter += 1;
                params[paramsKey] = input[paramsKey]
                if (counter>1) { throw new KlaviyoError('Only one identifier (email, phone_number, or person_id) can be specified.'); }
            }
        }

        return this.v2Request({
            resource: resource,
            method: Private.HTTP_POST,
            data: params
        });
    }
}

module.exports = DataPrivacy;