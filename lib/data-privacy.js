'use strict';

var
    Private = require('./private.js'),
    {
        KlaviyoError
    } = require('./errors.js');

class DataPrivacy extends Private {
    /**
     * Request a data privacy-compliant deletion for the person record corresponding to an email address, phone number, or person identifier.
     * If multiple person records exist for the provided identifier, only one of them will be deleted.
     * https://www.klaviyo.com/docs/api/v2/data-privacy#post-deletion-request
     * @param id_type
     * @param identifier
     * @returns {Promise<Object|KlaviyoApiError>}
     */
    requestProfileDeletion({ id_type='email', identifier } = {}) {
        if (!Private.API_ALLOWED_ID_TYPES.includes(id_type)) { throw new KlaviyoError('Id_type invalid, please use either email, phone_number or person_id'); }

        const resource = `${Private.API_DATA_PRIVACY}/${Private.API_DELETION_REQUEST}`;
        const params = {};
        params[id_type] = identifier;

        return this.v2Request({
            resource: resource,
            method: Private.HTTP_POST,
            data: params
        });
    }
}

module.exports = DataPrivacy;
