'use strict';

var
    Private = require('./private.js'),
    {
        KlaviyoError
    } = require('./errors.js');

const
    API_CAMPAIGN = 'campaign';

class Campaigns extends Private {
    /**
     * Gets campaign details by campaign ID.
     * https://www.klaviyo.com/docs/api/campaigns#campaign
     * @param {string} campaignId The ID of the campaign to retrieve.
     * @returns {Promise.<array|KlaviyoApiError>} Object with campaign details | Non-200 response received.
     */
    getCampaignById(campaignId) {
        if (!campaignId) { throw new KlaviyoError('Campaign ID was not provided.'); }
        const resource = `${API_CAMPAIGN}/${campaignId}`;
        return this.v1Request({
            resource: resource,
            method: Private.HTTP_GET
        });
    }
}

module.exports = Campaigns;