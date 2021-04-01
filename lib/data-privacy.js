'use strict';

var
    Private = require('./private.js'),
    {
        KlaviyoError
    } = require('./errors.js');

class DataPrivacy extends Private {
    static get API_ALLOWED_ID_TYPES() {
        return [
            'email',
            'phone_number',
            'person_id'
        ];
    }

    /**
     * Request a data privacy-compliant deletion for the person record corresponding to an email address, phone number, or person identifier.
     * If multiple person records exist for the provided identifier, only one of them will be deleted.
     * https://www.klaviyo.com/docs/api/v2/data-privacy#post-deletion-request
     * @param {string} identifier
     * @param {string} id_type
     * @returns {Promise<Object|KlaviyoApiError>}
     */
    requestProfileDeletion({ identifier, id_type='email' } = {}) {
        if (!DataPrivacy.API_ALLOWED_ID_TYPES.includes(id_type)) {
            throw new KlaviyoError('id_type invalid, please use either email, phone_number or person_id');
        }

        const resource = `${Private.API_DATA_PRIVACY}/${Private.API_DELETION_REQUEST}`;
        const params = {
            [id_type]: identifier
        };

        return this.v2Request({
            resource: resource,
            method: Private.HTTP_POST,
            data: params
        });
    }
}

module.exports = DataPrivacy;
