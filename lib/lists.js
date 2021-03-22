'use strict';

var
    Private = require('./private.js'),
    {
        KlaviyoError
    } = require('./errors.js');

const
    API_EXCLUSIONS = 'exclusions',
    API_GROUP = 'group',
    API_LIST = 'list',
    API_LISTS = 'lists',
    API_SUBSCRIBE = 'subscribe',
    API_MEMBERS = 'members',
    API_ALL = 'all',
    HTTP_DELETE = 'DELETE';

class Lists extends Private {
    /**
     * Get the list of Klaviyo lists on the account.
     * https://www.klaviyo.com/docs/api/v2/lists#get-lists
     * @returns {Promise.<array|KlaviyoApiError>} List of lists in Klaviyo | Non-200 response received.
     */
    getLists() {
        return this.v2Request({
            resource: API_LISTS,
            method: Private.HTTP_GET
        });
    }

    /**
     * Create a new list in Klaviyo.
     * https://www.klaviyo.com/docs/api/v2/lists#post-lists
     * @param {string} listName Name for the newly created list.
     * @returns {Promise.<array|KlaviyoApiError>} Object with ID for created list | Non-200 response received.
     * Example response: { list_id: 'myListID' }
     */
    createList(listName) {
        if (!listName) { throw new KlaviyoError('List name was not provided.'); }
        return this.v2Request({
            resource: API_LISTS,
            method: Private.HTTP_POST,
            data: { list_name: listName }
        });
    }

    /**
     * Gets list details by list ID.
     * https://www.klaviyo.com/docs/api/v2/lists#get-list
     * @param {string} listId The ID of the list to retrieve.
     * @returns {Promise.<array|KlaviyoApiError>} Object with list details | Non-200 response received.
     */
    getListById(listId) {
        if (!listId) { throw new KlaviyoError('List ID was not provided.'); }
        const resource = `${API_LIST}/${listId}`;
        return this.v2Request({
            resource: resource,
            method: Private.HTTP_GET
        });
    }

    /**
     * Change the name of the indicated list to the provided name.
     * https://www.klaviyo.com/docs/api/v2/lists#put-list
     * @param {string} listId The ID of the list to update.
     * @param {string} listName The new name for the list.
     * @returns {Promise.<string|KlaviyoApiError>} Returns an empty string on success | Non-200 response received.
     */
    updateListNameById({ listId, listName } = {}) {
        if (!listId || !listName) { throw new KlaviyoError('List name or ID was not provided.'); }
        const resource = `${API_LIST}/${listId}`;
        return this.v2Request({
            resource: resource,
            method: Private.HTTP_PUT,
            data: { list_name: listName }
        });
    }

    /**
     * Delete a list by its ID.
     * https://www.klaviyo.com/docs/api/v2/lists#delete-list
     * @param {string} listId The ID of the list to delete.
     * @returns {Promise.<string|KlaviyoApiError>} Returns an empty string on success | Non-200 response received.
     */
    deleteList(listId) {
        if (!listId) { throw new KlaviyoError('List ID was not provided.'); }
        const resource = `${API_LIST}/${listId}`;
        return this.v2Request({
            resource: resource,
            method: HTTP_DELETE
        });
    }

    /**
     * Uses the subscribe endpoint to subscribe user to list, this obeys the list opt-in settings.
     * https://www.klaviyo.com/docs/api/v2/lists#post-subscribe
     * @param {string} listId The ID of the list to subscribe members to.
     * @param {array} profiles List of profiles to subscribe. Each object in the list must have an email, phone_number, or push_token key. You can also provide additional properties as key-value pairs.
     * @returns {Promise.<array|KlaviyoApiError>} List of objects with subscription status (if list is single opt-in) | Non-200 response received.
     */
    addSubscribersToList({ listId, profiles=[] } = {}) {
        if (!listId) { throw new KlaviyoError('List ID was not provided.'); }
        const resource = `${API_LIST}/${listId}/${API_SUBSCRIBE}`;
        return this.v2Request({
            resource: resource,
            method: Private.HTTP_POST,
            data: { profiles: profiles }
        });
    }

    /**
     * Check if profiles are on a list and not suppressed.
     * https://www.klaviyo.com/docs/api/v2/lists#get-subscribe
     * @param {string} listID The ID of the list to check subscription status against
     * @param {array} emails A list of email addresses.
     * @param {array} phoneNumbers A list of phone numbers
     * @param {array} pushTokens A list of push tokens.
     * @returns {Promise.<array|KlaviyoApiError>} Profiles that are subscribed | Non-200 response received.
     */
    getSubscribersFromList({ listId, emails=[], phoneNumbers=[], pushTokens=[] } = {}) {
        if (!listId) { throw new KlaviyoError('List ID was not provided.'); }
        const resource = `${API_LIST}/${listId}/${API_SUBSCRIBE}`;
        return this.v2Request({
            resource: resource,
            method: Private.HTTP_GET,
            data: {
                emails: emails,
                phone_numbers: phoneNumbers,
                push_tokens: pushTokens
            }
        });
    }

    /**
     * Delete and remove profiles from list.
     * https://www.klaviyo.com/docs/api/v2/lists#delete-subscribe
     * @param {string} listID The ID of the list
     * @param {array} emails A list of email addresses.
     * @param {array} phoneNumbers A list of phone numbers.
     * @param {array} pushTokens A list of push tokens.
     * @returns {Promise.<string|KlaviyoApiError>} Returns an empty string on success | Non-200 response received.
     */
    deleteSubscribersFromList({ listId, emails=[] } = {}) {
        if (!listId) { throw new KlaviyoError('List ID was not provided.'); }
        const resource = `${API_LIST}/${listId}/${API_SUBSCRIBE}`;
        return this.v2Request({
            resource: resource,
            method: HTTP_DELETE,
            data: { emails: emails }
        });
    }

    /**
     * Adds a member to a list regardless of opt-in settings.
     * https://www.klaviyo.com/docs/api/v2/lists#post-members
     * @param {string} listId The ID of the list to subscribe members to.
     * @param {array} profiles List of profiles to subscribe. Each object in the list must have an email, phone_number, or push_token key. You can also provide additional properties as key-value pairs.
     * @returns {Promise.<array|KlaviyoApiError>} List of objects with subscription status (if list is single opt-in) | Non-200 response received.
     */
    addMembersToList({ listId, profiles=[] } = {}) {
        if (!listId) { throw new KlaviyoError('List ID was not provided.'); }
        const resource = `${API_LIST}/${listId}/${API_MEMBERS}`;
        return this.v2Request({
            resource: resource,
            method: Private.HTTP_POST,
            data: { profiles: profiles }
        });
    }

    /**
     * Check if profiles are on a list.
     * https://www.klaviyo.com/docs/api/v2/lists#get-members
     * @param {string} listID The ID of the list to check membership status against
     * @param {array} emails A list of email addresses.
     * @param {array} phoneNumbers A list of phone numbers
     * @param {array} pushTokens A list of push tokens.
     * @returns {Promise.<array|KlaviyoApiError>} Profiles that are subscribed | Non-200 response received.
     */
    getMembersFromList({ listId, emails=[], phoneNumbers=[], pushTokens=[] } = {}) {
        if (!listId) { throw new KlaviyoError('List ID was not provided.'); }
        const resource = `${API_LIST}/${listId}/${API_MEMBERS}`;
        return this.v2Request({
            resource: resource,
            method: Private.HTTP_GET,
            data: {
                emails: emails,
                phone_numbers: phoneNumbers,
                push_tokens: pushTokens
            }
        });
    }

    /**
     * Remove profiles from a list.
     * https://www.klaviyo.com/docs/api/v2/lists#delete-members
     * @param {string} listID The ID of the list
     * @param {array} emails A list of email addresses.
     * @param {array} phoneNumbers A list of phone numbers.
     * @param {array} pushTokens A list of push tokens.
     * @returns {Promise.<string|KlaviyoApiError>} Returns an empty string on success | Non-200 response received.
     */
    removeMembersFromList({ listId, emails=[], phoneNumbers=[], pushTokens=[] } = {}) {
        if (!listId) { throw new KlaviyoError('List ID was not provided.'); }
        const resource = `${API_LIST}/${listId}/${API_MEMBERS}`;
        return this.v2Request({
            resource: resource,
            method: HTTP_DELETE,
            data: {
                emails: emails,
                phone_numbers: phoneNumbers,
                push_tokens: pushTokens
            }
        });
    }

    /**
     * Get all of the emails that have been excluded from a list along with the exclusion reason and exclusion time.
     * https://www.klaviyo.com/docs/api/v2/lists#get-exclusions-all
     * @param {string} listId The ID of a list to check exclusions for.
     * @param {number} marker Pagination mechanism offset.
     * @returns {Promise.<object|KlaviyoApiError>} Object containing list of records and a marker if applicable | Non-200 response received.
     */
    getListExclusions({ listId, marker }) {
        if (!listId) { throw new KlaviyoError('List ID was not provided.'); }
        const data = marker ? { marker: marker } : {};
        const resource = `${API_LIST}/${listId}/${API_EXCLUSIONS}/${API_ALL}`;
        return this.v2Request({
            resource: resource,
            method: Private.HTTP_GET,
            data: data
        });
    }

    /**
     * Get all of the emails in a given list or segment.
     * https://www.klaviyo.com/docs/api/v2/lists#get-members-all
     * @param {string} groupId The ID of a list or segment
     * @param {number} marker Pagination mechanism offset.
     * @returns {Promise.<object|KlaviyoApiError>} Object containing list of records and a marker if applicable | Non-200 response received.
     */
    getAllMembers({ groupId, marker }) {
        if (!groupId) { throw new KlaviyoError('Group ID was not provided.'); }
        const data = marker ? { marker: marker } : {};
        const resource = `${API_GROUP}/${groupId}/${API_MEMBERS}/${API_ALL}`;
        return this.v2Request({
            resource: resource,
            method: Private.HTTP_GET,
            data: data
        });
    }

    /**
     * Exclude or Unsubscribe Someone from All Email
     * https://www.klaviyo.com/docs/api/lists#create-exclusion
     * @param {string} email The email address of the person who will be excluded.
     * @returns {Promise.<object|KlaviyoApiError>} Object with already_excluded flag | Non-200 response received.
     * Example response: { "already_excluded": false }
     */
    excludeFromAll(email) {
        return this.v1Request({
            resource: `${Private.API_PEOPLE}/${API_EXCLUSIONS}`,
            method: Private.HTTP_POST,
            data: {
                email: email
            }
        });
    }
}

module.exports = Lists;
