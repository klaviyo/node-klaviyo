'use strict';

const
    Klaviyo = require('/Users/nate.paradis/Klaviyo/Repos/node-klaviyo'),
    {
        KlaviyoError
    } = require('../../lib/errors.js'),
    nock = require('nock'),
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    should = chai.should();

//chai plugins
chai.use(chaiAsPromised);

/**
 * test data
 */
const
    publicToken = 'qwerty',
    KlaviyoClient = new Klaviyo({
        publicToken: publicToken
    }),
    klaviyoApiServer = 'https://a.klaviyo.com:443',
    fakeEmail = 'myFakeEmail@mailinator.com',
    fakeExternalId = 'myFakeId',
    testEvent = 'Test Event',
    fakeIp = '127.0.0.1',
    nowTimestamp = Math.floor(Date.now() / 1000);

/**
 * Using 'normal' anonymous functions instead of arrow/lambdas here because
 * of this note in the mocha documentation: https://mochajs.org/#arrow-functions
 */
describe('Public', function () {
    before(function () {
        nock.disableNetConnect();
        if (!nock.isActive()) nock.activate()
    });
    afterEach(function () {
        nock.cleanAll();
    });
    after(function () {
        nock.restore();
    });
    describe('#identify()', function () {
        context('is called without an email or ID', function () {
            it('should throw a KlaviyoError', function () {
                should.Throw(function () {
                    KlaviyoClient.public.identify();
                }, KlaviyoError);
            });
        });
        context('is called with an email', function () {
            const options = {
                email: fakeEmail,
                isTest: false
            };
            const data = {
                properties: {
                    email: fakeEmail,
                },
                token: publicToken
            };
            it('should eventually return 1', function () {
                nock(klaviyoApiServer, {
                        encodedQueryParams: true
                    })
                    .get('/api/identify')
                    .query(queryObject => { 
                        const decoded = JSON.parse(Buffer.from(queryObject.data, 'base64').toString('ascii'));
                        return deepEqual(decoded, data) && queryObject.test == 0;
                    })
                    .reply(200, '1');

                KlaviyoClient.public.identify(options).should.eventually.equal(1);
            });
        });
        context('is called with an ID', function () {
            const options = {
                id: fakeExternalId,
                isTest: false
            };
            const data = {
                properties: {
                    id: fakeExternalId
                },
                token: publicToken
            };
            it('should eventually return 1', function () {
                nock(klaviyoApiServer, {
                        encodedQueryParams: true
                    })
                    .get('/api/identify')
                    .query(queryObject => { 
                        const decoded = JSON.parse(Buffer.from(queryObject.data, 'base64').toString('ascii'));
                        return deepEqual(decoded, data) && queryObject.test == 0;
                    })
                    .reply(200, '1');

                KlaviyoClient.public.identify(options).should.eventually.equal(1);
            });
        });
        context('is called with an email or ID, with isTest set to true', function () {
            const options = {
                email: fakeEmail,
                id: fakeExternalId,
                isTest: true
            };
            const data = {
                properties: {
                    email: fakeEmail,
                    id: fakeExternalId
                },
                token: publicToken
            };
            it('should eventually return 1', function () {
                nock(klaviyoApiServer, {
                        encodedQueryParams: true
                    })
                    .get('/api/identify')
                    .query(queryObject => { 
                        const decoded = JSON.parse(Buffer.from(queryObject.data, 'base64').toString('ascii'));
                        return deepEqual(decoded, data) && queryObject.test == 1;
                    })
                    .reply(200, '1');

                KlaviyoClient.public.identify(options).should.eventually.equal(1);
            });
        });
    });
    /**
     * All #track() and #trackOnce() tests have a hardcoded timestamp passed
     * This is to prevent faulty test failures due to timing weirdness
     */
    describe('#track()', function () {
        context('is called without providing an email or ID', function () {
            it('should throw a KlaviyoError', function () {
                should.Throw(function () {
                    KlaviyoClient.public.track();
                }, KlaviyoError);
            });
        });
        context('is called without providing an event name', function () {
            it('should throw a KlaviyoError', function () {
                should.Throw(function () {
                    KlaviyoClient.public.track({
                        email: fakeEmail,
                        id: fakeExternalId
                    });
                }, KlaviyoError);
            });
        });
        context('is called with a valid email and an event name', function () {
            const options = {
                event: testEvent,
                email: fakeEmail,
                isTest: false
            };
            const data = {
                token: publicToken,
                event: testEvent,
                properties: {},
                customer_properties: {
                    email: fakeEmail
                },
                time: nowTimestamp
            };
            it('should eventually return 1', function () {
                nock(klaviyoApiServer, {
                        encodedQueryParams: true
                    })
                    .get('/api/track')
                    .query(queryObject => { 
                        const decoded = JSON.parse(Buffer.from(queryObject.data, 'base64').toString('ascii'));
                        return deepEqual(decoded, data) && queryObject.test == 0;
                    })
                    .reply(200, '1');

                KlaviyoClient.public.track(options).should.eventually.equal(1);
            });
        });
        context('is called with a valid ID and an event name', function () {
            const options = {
                event: testEvent,
                id: fakeExternalId,
                isTest: false
            };
            const data = {
                token: publicToken,
                event: testEvent,
                properties: {},
                customer_properties: {
                    id: fakeExternalId
                },
                time: nowTimestamp
            }
            it('should eventually return 1', function () {
                nock(klaviyoApiServer, {
                        encodedQueryParams: true
                    })
                    .get('/api/track')
                    .query(queryObject => { 
                        const decoded = JSON.parse(Buffer.from(queryObject.data, 'base64').toString('ascii'));
                        return deepEqual(decoded, data) && queryObject.test == 0;
                    })
                    .reply(200, '1');

                KlaviyoClient.public.track(options).should.eventually.equal(1);
            });
        });
        context('is called with a valid email or ID and an event name, with isTest set to true', function () {
            const options = {
                event: testEvent,
                email: fakeEmail,
                id: fakeExternalId,
                isTest: true
            };
            const data = {
                event: testEvent,
                properties: {},
                customer_properties: {
                    email: fakeEmail,
                    id: fakeExternalId
                },
                time: nowTimestamp,
                token: publicToken
            };
            it('should eventually return 1', function () {
                nock(klaviyoApiServer, {
                        encodedQueryParams: true
                    })
                    .get('/api/track')
                    .query(queryObject => { 
                        const decoded = JSON.parse(Buffer.from(queryObject.data, 'base64').toString('ascii'));
                        return deepEqual(decoded, data) && queryObject.test == 1;
                    })
                    .reply(200, '1');

                KlaviyoClient.public.track(options).should.eventually.equal(1);
            });
        });
        context('is called with a valid email or ID, event name, and IP Address', function () {
            const options = {
                event: testEvent,
                email: fakeEmail,
                id: fakeExternalId,
                isTest: false,
                ipAddress: fakeIp
            };
            const data = {
                token: publicToken,
                event: testEvent,
                properties: {},
                customer_properties: {
                    email: fakeEmail,
                    id: fakeExternalId
                },
                time: nowTimestamp,
                ip: fakeIp
            };
            it('should eventually return 1', function () {
                nock(klaviyoApiServer, {
                        encodedQueryParams: true
                    })
                    .get('/api/track')
                    .query(queryObject => { 
                        const decoded = JSON.parse(Buffer.from(queryObject.data, 'base64').toString('ascii'));
                        return deepEqual(decoded, data) && queryObject.test == 0;
                    })
                    .reply(200, '1');

                KlaviyoClient.public.track(options).should.eventually.equal(1);
            });
        });
    });
    describe('#trackOnce()', function () {
        context('is called without providing an email or ID', function () {
            it('should throw a KlaviyoError', function () {
                should.Throw(function () {
                    KlaviyoClient.public.trackOnce();
                }, KlaviyoError);
            });
        });
        context('is called without providing an event name', function () {
            it('should throw a KlaviyoError', function () {
                should.Throw(function () {
                    KlaviyoClient.public.trackOnce({
                        email: fakeEmail,
                        id: fakeExternalId
                    });
                }, KlaviyoError);
            });
        });
        context('is called with a valid email or ID and an event name', function () {
            const options = {
                event: testEvent,
                email: fakeEmail,
                id: fakeExternalId,
                isTest: false
            };
            const data = {
                token: publicToken,
                event: testEvent,
                properties: {
                    '__track_once__': true
                },
                customer_properties: {
                    email: fakeEmail,
                    id: fakeExternalId
                },
                time: nowTimestamp
            };
            it('should eventually return 1', function () {
                nock(klaviyoApiServer, {
                        encodedQueryParams: true
                    })
                    .get('/api/track')
                    .query(queryObject => { 
                        const decoded = JSON.parse(Buffer.from(queryObject.data, 'base64').toString('ascii'));
                        return deepEqual(decoded, data) && queryObject.test == 0;
                    })
                    .reply(200, '1');

                KlaviyoClient.public.trackOnce(options).should.eventually.equal(1);
            });
        });
        context('is called with a valid email or ID and an event name, with isTest set to true', function () {
            const options = {
                event: testEvent,
                email: fakeEmail,
                id: fakeExternalId,
                isTest: true,
            };
            const data = {
                token: publicToken,
                event: testEvent,
                properties: {
                    '__track_once__': true
                },
                customer_properties: {
                    email: fakeEmail,
                    id: fakeExternalId
                },
                time: nowTimestamp
            };
            it('should eventually return 1', function () {
                nock(klaviyoApiServer, {
                        encodedQueryParams: true
                    })
                    .get('/api/track')
                    .query(queryObject => { 
                        const decoded = JSON.parse(Buffer.from(queryObject.data, 'base64').toString('ascii'));
                        return deepEqual(decoded, data) && queryObject.test == 1;
                    })
                    .reply(200, '1');

                return KlaviyoClient.public.trackOnce(options).should.eventually.equal(1);
            });
        });
        context('is called with a valid email or ID, event name, and IP Address', function () {
            const options = {
                event: testEvent,
                email: fakeEmail,
                id: fakeExternalId,
                isTest: false,
                ipAddress: fakeIp
            };
            const data = {
                token: publicToken,
                event: testEvent,
                properties: {
                    '__track_once__': true
                },
                customer_properties: {
                    email: fakeEmail,
                    id: fakeExternalId
                },
                time: nowTimestamp,
                ip: fakeIp
            };
            it('should eventually return 1', function () {
                nock(klaviyoApiServer, {
                        encodedQueryParams: true
                    })
                    .get('/api/track')
                    .query(queryObject => { 
                        const decoded = JSON.parse(Buffer.from(queryObject.data, 'base64').toString('ascii'));
                        return deepEqual(decoded, data) && queryObject.test == 0;
                    })
                    .reply(200, '1');

                KlaviyoClient.public.trackOnce(options).should.eventually.equal(1);
            });
        });
    });
});

function deepEqual(object1, object2) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
  
    if (keys1.length !== keys2.length) {
      return false;
    }
  
    for (const key of keys1) {
      const val1 = object1[key];
      const val2 = object2[key];
      const areObjects = isObject(val1) && isObject(val2);
      if (
        areObjects && !deepEqual(val1, val2) ||
        !areObjects && val1 !== val2
      ) {
        return false;
      }
    }
  
    return true;
}

function isObject(object) {
    return object != null && typeof object === 'object';
}
