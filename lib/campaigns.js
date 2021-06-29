'use strict';

var
    Private = require('./private'),
    { KlaviyoError } = require('./errors');

const API_CANCEL = 'cancel';
const API_CLONE = 'clone';
const API_RECIPIENTS = 'recipients';
const API_SCHEDULE = 'schedule';
const API_SEND = 'send';

class Campaigns extends Private {

  /**
   * Get a list of all campaigns created
   * https://apidocs.klaviyo.com/reference/campaigns#get-campaigns
   * @param {number} page page number, default 0
   * @param {number} count page size, default 50; max 100
   * @return {Promise<Object|KlaviyoApiError>}
   */
  getCampaigns({ page=0, count=50 } = {}) {
    const resource = `${Private.API_CAMPAIGNS}`;
    if (count > 100) {
      count = 100;
    }
    const data = { page, count };
    return this.v1Request({
      resource,
      data,
      method: Private.HTTP_GET
    });
  }

  /**
   * Create a new Campaign.
   * https://apidocs.klaviyo.com/reference/campaigns#create-campaign
   * @param {string} listId The recipient list
   * @param {string} templateId The email template
   * @param {string} fromEmail The sending email address
   * @param {string} subject The email subject
   * @param {object} additionalArg
   *    optional params:
   *    {
   *      from_name: {string} email sender name,
   *      name: {string} campaign name,
   *      use_smart_sending: {boolean} flag for using smart sending feature,
   *      add_google_analytics: {boolean} flag for adding google tracking tags to links
   *    }
   * @return {Promise<Object|KlaviyoApiError>}
   */
  createCampaign(listId, templateId, fromEmail, subject, additionalArg={}) {
    if (!listId) { throw new KlaviyoError('List ID was not provided.'); }
    if (!templateId) { throw new KlaviyoError('Templte ID was not provided.'); }
    if (!fromEmail) { throw new KlaviyoError('From Email was not provided.'); }
    if (!subject) { throw new KlaviyoError('Subject was not provided.'); }

    const resource = `${Private.API_CAMPAIGNS}`;
    const body = {
      ...additionalArg,
      list_id: listId,
      template_id: templateId,
      from_email: fromEmail,
      subject: subject,
    };
    return this.v1Request({
      resource,
      method: Private.HTTP_POST,
      data: body
    });
  }

  /**
   * Gets campaign details by campaign ID.
   * https://www.klaviyo.com/docs/api/campaigns#campaign
   * @param {string} campaignId The ID of the campaign to retrieve.
   * @returns {Promise.<array|KlaviyoApiError>} Object with campaign details | Non-200 response received.
   */
  getCampaignById(campaignId) {
    if (!campaignId) { throw new KlaviyoError('Campaign ID was not provided.'); }
    const resource = `${Private.API_CAMPAIGN}/${campaignId}`;
    return this.v1Request({
      resource: resource,
      method: Private.HTTP_GET
    });
  }

  /**
   * Update campaign by ID
   * https://apidocs.klaviyo.com/reference/campaigns#update-campaign
   * @param campaignId
   * @param data: Object
   *     {
   *       list_id: string,
   *       template_id: string,
   *       from_email: string,
   *       from_name: string,
   *       subject: string,
   *       name: string,
   *       use_smart_sending: boolean,
   *       add_google_analytics: boolean
   *     }
   * @return {Promise<Object|KlaviyoApiError>} Object with campaign details | Non-200 response received.
   */
  updateCampaign(campaignId, data) {
    const resource = `${Private.API_CAMPAIGN}/${campaignId}`;
    return this.v1Request({
      resource,
      data,
      method: Private.HTTP_PUT,
    });
  }

  /**
   * Send a campaign immediately by CampaignID
   * https://apidocs.klaviyo.com/reference/campaigns#send-campaign
   * @param campaignId
   * @return {Promise<Object|KlaviyoApiError>} Object with status | Non-200 response received.
   */
  sendCampaignNow(campaignId) {
    if (!campaignId) { throw new KlaviyoError('Campaign ID was not provided.'); }
    const resource = `${Private.API_CAMPAIGN}/${campaignId}/${API_SEND}`;
    return this.v1Request({
      resource,
      method: Private.HTTP_POST,
    });
  }

  /**
   * Schedule a campaign by ID
   * https://apidocs.klaviyo.com/reference/campaigns#schedule-campaign
   * @param campaignId
   * @param sendTime: String for UTC date in `%Y-%m-%d %H:%M:%S` format
   * @return {Promise<Object|KlaviyoApiError>} Object with status | Non-200 response received.
   */
  scheduleCampaign(campaignId, sendTime) {
    if (!campaignId) { throw new KlaviyoError('Campaign ID was not provided.'); }
    if (!sendTime) { throw new KlaviyoError('Send Time was not provided.'); }
    const resource = `${Private.API_CAMPAIGN}/${campaignId}/${API_SCHEDULE}`;
    const data = {
      send_time: sendTime,
    };
    return this.v1Request({
      resource,
      data,
      method: Private.HTTP_POST,
    });
  }

  /**
   * Cancel a campaign by CampaignID
   * https://apidocs.klaviyo.com/reference/campaigns#send-campaign
   * @param campaignId
   * @return {Promise<Object|KlaviyoApiError>} Object with status | Non-200 response received.
   */
  cancelCampaign(campaignId) {
    if (!campaignId) { throw new KlaviyoError('Campaign ID was not provided.'); }
    const resource = `${Private.API_CAMPAIGN}/${campaignId}/${API_CANCEL}`;
    return this.v1Request({
      resource,
      method: Private.HTTP_POST,
    });
  }

  /**
   * Clone given campaign with the new name and recipient list id
   * https://apidocs.klaviyo.com/reference/campaigns#clone-campaign
   * @param origCampaignId
   * @param name
   * @param listId
   * @return {Promise<Object|KlaviyoApiError>} Object with campaign details | Non-200 response received.
   */
  cloneCampaign(origCampaignId, name, listId) {
    if (!origCampaignId) { throw new KlaviyoError('Original Campaign ID was not provided.'); }
    if (!name) { throw new KlaviyoError('Campaign Name was not provided.'); }
    if (!listId) { throw new KlaviyoError('List ID was not provided.'); }
    const resource = `${Private.API_CAMPAIGN}/${origCampaignId}/${API_CLONE}`;
    const data = {
      name,
      list_id: listId
    };
    return this.v1Request({
      resource,
      data,
      method: Private.HTTP_POST,
    });
  }

  /**
   * Get summary information about email recipients for the campaign
   * https://apidocs.klaviyo.com/reference/campaigns#get-campaign-recipients
   * @param {string} campaignId
   * @param {number} count Default 5000
   * @param {string} sort asc or desc to sort results
   * @param {string} offset For pagination; this value will come from a previous response in the `next_offset` property
   * @return {Promise<Object|KlaviyoApiError>}
   */
  getCampaignRecipients(campaignId, { count=5000, sort='asc', offset=''} = {}) {
    if (!campaignId) { throw new KlaviyoError('Campaign ID was not provided.'); }
    if (count > 25000) {
      count = 25000;
    }
    if (!(/^asc$/i.test(sort)) && !(/^desc$/i.test(sort))) {
      sort = 'asc';
    } else {
      sort = sort.toLowerCase();
    }
    const data = {
      count,
      sort,
      offset
    };
    const resource = `${Private.API_CAMPAIGN}/${campaignId}/${API_RECIPIENTS}`
    return this.v1Request({
      resource,
      data,
      method: Private.HTTP_GET,
    });
  }
}

module.exports = Campaigns;
