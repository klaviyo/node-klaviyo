'use strict';

const
    Klaviyo = require('node-klaviyo'),
    {
        KlaviyoError
    } = require('../../lib/errors.js'),
    nock = require('nock'),
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    should = chai.should();

//chai plugins
chai.use(chaiAsPromised);

//fixtures
const {
    fakeProfileId,
    fakeMetricId,
    profileData,
    timelineData
} = require('./fixtures/profiles.js');

//test data
const
    privateToken = 'pk_asdfasdfasdfasdf',
    KlaviyoClient = new Klaviyo({
        privateToken: privateToken
    }),
    klaviyoApiServer = 'https://a.klaviyo.com:443',
    nowTimestamp = Math.floor(Date.now() / 1000);

/**
 * Using 'normal' anonymous functions instead of arrow/lambdas here because
 * of this note in the mocha documentation: https://mochajs.org/#arrow-functions
 */
describe('Profiles', function () {
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
    describe('#token', function () {
        context('attempting to set #token', function () {
            it('should throw a KlaviyoError', function () {
                should.Throw(function () {
                    KlaviyoClient.profiles.token = 'newToken';
                }, KlaviyoError);
            });
        });
    });
    describe('#getProfile()', function () {
        context('is called without a profile ID', function () {
            it('should throw a KlaviyoError', function () {
                should.Throw(function () {
                    KlaviyoClient.profiles.getProfile();
                }, KlaviyoError);
            });
        });
        context('is called with a valid profile ID', function () {
            const query = {
                api_key: privateToken
            };
            it('should eventually return profile data', function () {
                nock(klaviyoApiServer, {
                        encodedQueryParams: true
                    })
                    .get(`/api/v1/person/${fakeProfileId}`)
                    .query(query)
                    .reply(200, profileData);

                KlaviyoClient.profiles.getProfile(fakeProfileId).should.eventually.eql(profileData);
            });
        });
    });
    describe('#updateProfile()', function () {
        context('is called without a profile ID', function () {
            it('should throw a KlaviyoError', function () {
                should.Throw(function () {
                    KlaviyoClient.profiles.updateProfile();
                }, KlaviyoError);
            });
        });
        context('is called with a valid profile ID', function () {
            const query = {
                api_key: privateToken,
                myCustomProperty: true
            };
            it('should eventually return the updated profile data', function () {
                nock(klaviyoApiServer, {
                        encodedQueryParams: true
                    })
                    .put(`/api/v1/person/${fakeProfileId}`)
                    .query(query)
                    .reply(200, profileData);

                KlaviyoClient.profiles.updateProfile({ 
                    profileId: fakeProfileId,
                    properties: {
                        myCustomProperty: true
                    }
                }).should.eventually.eql(profileData);
            });
        });
    });
    describe('#getProfileMetricsTimeline()', function () {
        context('is called without a profile ID', function () {
            it('should throw a KlaviyoError', function () {
                should.Throw(function () {
                    KlaviyoClient.profiles.getProfileMetricsTimeline();
                }, KlaviyoError);
            });
        });
        context('is called with a valid profile ID', function () {
            const query = {
                since: nowTimestamp,
                count: 100,
                sort: 'desc',
                api_key: privateToken
            };
            it('should eventually return the updated profile data', function () {
                nock(klaviyoApiServer, {
                        encodedQueryParams: true
                    })
                    .get(`/api/v1/person/${fakeProfileId}/metrics/timeline`)
                    .query(query)
                    .reply(200, timelineData);

                KlaviyoClient.profiles.getProfileMetricsTimeline({ 
                    profileId: fakeProfileId,
                    since: nowTimestamp
                }).should.eventually.eql(timelineData);
            });
        });
    });
    describe('#getProfileMetricsTimelineById()', function () {
        context('is called without a profile ID or metric ID', function () {
            it('should throw a KlaviyoError', function () {
                should.Throw(function () {
                    KlaviyoClient.profiles.getProfileMetricsTimelineById();
                }, KlaviyoError);
            });
        });
        context('is called with a valid profile ID', function () {
            const query = {
                since: nowTimestamp,
                count: 100,
                sort: 'desc',
                api_key: privateToken
            };
            it('should eventually return the updated profile data', function () {
                nock(klaviyoApiServer, {
                        encodedQueryParams: true
                    })
                    .get(`/api/v1/person/${fakeProfileId}/metric/${fakeMetricId}/timeline`)
                    .query(query)
                    .reply(200, timelineData);

                KlaviyoClient.profiles.getProfileMetricsTimelineById({ 
                    profileId: fakeProfileId,
                    metricId: fakeMetricId,
                    since: nowTimestamp
                }).should.eventually.eql(timelineData);
            });
        });
    });
});
