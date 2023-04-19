# Node Klaviyo SDK - RETIRED

## Deprecation Notice

This SDK and its associated [NPM Package](https://www.npmjs.com/package/node-klaviyo) is depricated and set to be removed on 2024-01-01
and is not receive further updates. To continue receiving API and SDK improvements, please follow the instructions below and read [this guide](https://developers.klaviyo.com/en/docs/migrating-from-v1v2-to-the-new-klaviyo-apis) to migrate to the new Klaviyo Node SDK, which you can find on [Github](https://github.com/klaviyo/klaviyo-api-node).

## Migration Instructions

NOTE: this change is not backwards compatible; migrating to the new SDK requires completing the following steps:

### Install New SDK

`npm install klaviyo-api`

### Update Client Instantiation
 
The new library contains code for require and ES modules see how to import the new package according to your project in the [readme](https://github.com/klaviyo/klaviyo-api-node#usage-example)

### Updating API Operations

The new SDK has many name changes to both namespace and parameters (types+format). Please reference [this section](https://github.com/klaviyo/klaviyo-api-node#comprehensive-list-of-operations--parameters) for a comprehensive list of examples.


## What is Klaviyo?

Klaviyo is a real-time service for understanding your customers by aggregating all your customer data, identifying important groups of customers and then taking action.
https://www.klaviyo.com/

## What can this package do?

* Track customers and events directly from your backend.
* Retrieve customer profile data and metric data.
* Create and update lists.
* Add and remove profiles from lists.

## How to install?
    npm install node-klaviyo

## Getting started
After installing the package from NPM, you can use the SDK in your project as follows:
```javascript
const Klaviyo = require('node-klaviyo');

const KlaviyoClient = new Klaviyo({
    publicToken: 'myPublicToken',
    privateToken: 'myPrivateToken'
});
```
This package uses the Klaviyo REST APIs to retrieve and update information from your Klaviyo account. A [Public API key](https://help.klaviyo.com/hc/en-us/articles/115005062267-Manage-Your-Account-s-API-Keys#your-public-api-key-site-id2) is required for the methods available from the Public class. The other classes require a [Private API key](https://help.klaviyo.com/hc/en-us/articles/115005062267-Manage-Your-Account-s-API-Keys#your-private-api-keys3) to make use of their methods.

The functions available in this SDK return a promise, which will resolve or reject based on the success of the HTTP request performed. On success, the promise resolves to an object containing the response from the API. On failure, an appropriate error will be thrown based on the status code tied to the failure.

Most functions accept a kwarg-style options object. The exception to this rule are functions with 1 or 0 arguments.

### Examples
The below examples showcase common usage for the available classes in the SDK, but is by no means a comprehensive guide. For a full list of the arguments for a given function, please refer to the docstring for that function.
#### [Public](https://apidocs.klaviyo.com/reference/track-identify)
These APIs are used for tracking people and the events or actions they do. For instance, tracking when someone is active on your website, when a purchase is made, or when someone watches a video.

The SDK supports both [GET](https://apidocs.klaviyo.com/reference/track-identify#track-get) and [POST](https://apidocs.klaviyo.com/reference/track-identify#track-post) requests for these endpoints via the `post` flag in the method options.
```javascript
// Identify a user - create/update a profile in Klaviyo
KlaviyoClient.public.identify({
    email: 'pizza.dave@mailinator.com',
    properties: {
        $first_name: 'Pizza',
        $last_name: 'Dave',
        favoriteFood: 'Pad thai'
    },
    post: true //defaults to false
});

// Track a user's behavior - create an event in Klaviyo
KlaviyoClient.public.track({
    event: 'Ordered Pizza',
    email: 'pizza.dave@mailinator.com',
    properties: {
        items: [
            {
                size: 'Large',
                toppings: [
                    'Pepperoni',
                    'Onions',
                    'Smoked Gouda'
                ],
                price: 23.99
            }
        ],
        $value: 23.99
    },
    customerProperties: {
        likesOnions: true
    },
    timestamp: 1532806824
});
```

#### [Profiles](https://apidocs.klaviyo.com/reference/profiles)
The Profiles API is used for managing profile records in Klaviyo.
```javascript
// Get a profile by its ID in Klaviyo
KlaviyoClient.profiles.getProfile('myProfileId');

// Get a profile ID by email
KlaviyoClient.profiles.getProfileIdByEmail('pizza.dave@mailinator.com');

// Update a profile in Klaviyo
KlaviyoClient.profiles.updateProfile({
    profileId: 'myProfileId'
    properties: {
        favoriteFood: 'Tacos'
    }
});

// Get the timeline for all events on a profile.
KlaviyoClient.profiles.getProfileMetricsTimeline({
    profileId: 'myProfileId',
    since: 1606262400,
    count: 50,
    sort: 'asc'
});

// Get the timeline for a specific metric on a profile.
KlaviyoClient.profiles.getProfileMetricsTimelineById({
    profileId: 'myProfileId',
    metricId: 'myMetricId',
    since: 1606262400,
    count: 10,
    sort: 'desc'
});

// Unset properties on a profile.
KlaviyoClient.profiles.unsetProfileProperties({
    profileId: 'myProfileId',
    properties: [
        'favoriteFood',
        'last_purchase_date',
        'This one has spaces'
    ]
});
```

#### [Metrics](https://apidocs.klaviyo.com/reference/metrics)
The Metrics API is used for retrieval of historical event data in Klaviyo.
```javascript
// Fetches all metrics inside of an account.
KlaviyoClient.metrics.getMetrics({
    page: 2,
    count: 50
});

// Fetches all of the metrics and its events regardless of the statistic.
KlaviyoClient.metrics.getMetricsTimeline({
    since: 1606262400,
    count: 100,
    sort: 'asc'
});

// Returns a timeline of events for a specific metric.
KlaviyoClient.metrics.getMetricTimelineById({
    metricId: 'myMetricId',
    since: 1606262400,
    count: 50,
    sort: 'desc'
});

// Exports metric values (counts, uniques, totals).
KlaviyoClient.metrics.getMetricExport({
    metricId: 'myMetricId',
    start_date: 2020-11-25,
    end_date: 2020-12-02,
    unit: 'day',
    measurement: 'value',
    where: '[["$attributed_message","=","myMessageId"]]'
    count: 10
});
```

#### [Lists](https://apidocs.klaviyo.com/reference/lists-segments)
This API is used for creating profiles and managing list memberships and subscriptions. This API currently only supports subscribing customers and adding customers to lists. If you would like to manage your segments you can do so from the [lists and segments page](https://www.klaviyo.com/lists).
```javascript
// Get the list of Klaviyo lists on the account.
KlaviyoClient.lists.getLists();

// Create a new list in Klaviyo.
KlaviyoClient.lists.createList('My New List');

// Gets list details by list ID.
KlaviyoClient.lists.getListById('myListId');

// Change the name of the indicated list to the provided name.
KlaviyoClient.lists.updateListNameById({
    listId: 'myListId',
    listName: 'New List Name Goes Here'
});

// Delete a list by its ID.
KlaviyoClient.lists.deleteList('myListId');

// Uses the subscribe endpoint to subscribe user to list, this obeys the list opt-in settings.
KlaviyoClient.lists.addSubscribersToList({
    listId: 'myListId',
    profiles: [
        {
            email: 'pizza.dave@mailinator.com',
            pizzaSubscriptionType: 'Premium'
        },
        {
            email: 'salami.sam@mailinator.com',
            phone_number: '+12223334444',
            sms_consent: true
        },
        {
            email: 'lasagna.larry@mailinator.com',
            push_token: 'myPushToken'
        }
    ]
});

// Check if profiles are on a list and not suppressed.
KlaviyoClient.lists.getSubscribersFromList({
    listId: 'myListId',
    emails: [
        'pizza.dave@mailinator.com',
        'salami.sam@mailinator.com',
        'lasagna.larry@mailinator.com'
    ],
    phoneNumbers: [
        '+12223334444',
        '+15556667777'
    ],
    pushTokens: [
        'myPushToken'
    ]
});

// Delete and remove profiles from list.
KlaviyoClient.lists.deleteSubscribersFromList({
    listId: 'myListId',
    emails: [
        'pizza.dave@mailinator.com',
        'salami.sam@mailinator.com',
        'lasagna.larry@mailinator.com'
    ]
});

// Adds a member to a list regardless of opt-in settings.
KlaviyoClient.lists.addMembersToList({
    listId: 'myListId',
    profiles: [
        {
            email: 'pizza.dave@mailinator.com',
            pizzaSubscriptionType: 'Premium'
        },
        {
            email: 'salami.sam@mailinator.com',
            phone_number: '+12223334444',
            sms_consent: true
        },
        {
            email: 'lasagna.larry@mailinator.com',
            push_token: 'myPushToken'
        }
    ]
});

// Check if profiles are on a list.
KlaviyoClient.lists.getMembersFromList({
    listId: 'myListId',
    emails: [
        'pizza.dave@mailinator.com',
        'salami.sam@mailinator.com',
        'lasagna.larry@mailinator.com'
    ],
    phoneNumbers: [
        '+12223334444',
        '+15556667777'
    ],
    pushTokens: [
        'myPushToken'
    ]
});

// Remove profiles from a list.
KlaviyoClient.lists.removeMembersFromList({
    listId: 'myListId',
    emails: [
        'pizza.dave@mailinator.com',
        'salami.sam@mailinator.com',
        'lasagna.larry@mailinator.com'
    ],
    phoneNumbers: [
        '+12223334444',
        '+15556667777'
    ],
    pushTokens: [
        'myPushToken'
    ]
});

// Get all of the emails that have been excluded from a list along with the exclusion reason and exclusion time.
KlaviyoClient.lists.getListExclusions({
    listId: 'myListId',
    marker: 'myMarkerFromPreviousResponse'
});

// Get all of the emails in a given list or segment.
KlaviyoClient.lists.getAllMembers({
    groupId: 'mySegmentOrListId',
    marker: 'myMarkerFromPreviousResponse'
});
```

#### [Data Privacy](https://apidocs.klaviyo.com/reference/data-privacy)
This API is used to submit data privacy-compliant deletion requests.
```javascript
// Request a data privacy-compliant deletion for a person record
KlaviyoClient.dataPrivacy.requestProfileDeletion({
    identifier: 'pizza.dave@mailinator.com',
    id_type: 'email' //can also use 'phone_number' or 'person_id'
});
```
