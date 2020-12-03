'use strict';

const
    Klaviyo = require('/Users/nate.paradis/Klaviyo/Repos/node-klaviyo'),
    {
        KlaviyoError,
        KlaviyoConfigurationError
    } = require('../../lib/errors.js'),
    Public = require('../../lib/public.js'),
    Profiles = require('../../lib/profiles.js'),
    Metrics = require('../../lib/metrics.js'),
    Lists = require('../../lib/lists.js'),
    chai = require('chai'),
    should = chai.should();

/**
 * test data
 */
const
    publicToken = 'qwerty',
    privateToken = 'pk_asdfasdfasdfasdf',
    PublicKlaviyoClient = new Klaviyo({
        publicToken: publicToken
    }),
    PrivateKlaviyoClient = new Klaviyo({
        privateToken: privateToken
    });


/**
 * Using 'normal' anonymous functions instead of arrow/lambdas here because
 * of this note in the mocha documentation: https://mochajs.org/#arrow-functions
 */
describe('Klaviyo', function () {
    context('is initialized without a publicToken or privateToken', function () {
        it('should throw a KlaviyoConfigurationError.', function () {
            should.Throw(function () {
                new Klaviyo();
            }, KlaviyoConfigurationError);
        });
    });
    context('is initialized without a publicToken', function () {
        describe('#public', function () {
            it('should throw a KlaviyoConfigurationError', function () {
                should.Throw(function () {
                    PrivateKlaviyoClient.public
                }, KlaviyoConfigurationError);
            });
        });
    });
    context('is initialized without a privateToken', function () {
        describe('#profiles', function () {
            it('should throw a KlaviyoConfigurationError', function () {
                should.Throw(function () {
                    PublicKlaviyoClient.profiles
                }, KlaviyoConfigurationError);
            });
        });
        describe('#metrics', function () {
            it('should throw a KlaviyoConfigurationError', function () {
                should.Throw(function () {
                    PublicKlaviyoClient.metrics
                }, KlaviyoConfigurationError);
            });
        });
        describe('#lists', function () {
            it('should throw a KlaviyoConfigurationError', function () {
                should.Throw(function () {
                    PublicKlaviyoClient.lists
                }, KlaviyoConfigurationError);
            });
        });
    });
    context('is initialized with a publicToken', function () {
        describe('#public', function () {
            it('should return an instance of the Public class', function () {
                should.exist(PublicKlaviyoClient.public);
                PublicKlaviyoClient.public.should.be.an.instanceof(Public);
            });
            describe('attempting to set #public', function () {
                it('should throw a KlaviyoError', function () {
                    should.Throw(function () {
                        PublicKlaviyoClient.public = null;
                    }, KlaviyoError);
                });
            });
        });
    });
    context('is initialized with a privateToken', function () {
        describe('#profiles', function () {
            it('should return an instance of the Profiles class', function () {
                should.exist(PrivateKlaviyoClient.profiles);
                PrivateKlaviyoClient.profiles.should.be.an.instanceof(Profiles);
            });
            describe('attempting to set #profiles', function () {
                it('should throw a KlaviyoError', function () {
                    should.Throw(function () {
                        PrivateKlaviyoClient.profiles = null;
                    }, KlaviyoError);
                });
            });
        });
        describe('#metrics', function () {
            it('should return an instance of the Metrics class', function () {
                should.exist(PrivateKlaviyoClient.metrics);
                PrivateKlaviyoClient.metrics.should.be.an.instanceof(Metrics);
            });
            describe('attempting to set #metrics', function () {
                it('should throw a KlaviyoError', function () {
                    should.Throw(function () {
                        PrivateKlaviyoClient.metrics = null;
                    }, KlaviyoError);
                });
            });
        });
        describe('#lists', function () {
            it('should return an instance of the Lists class', function () {
                should.exist(PrivateKlaviyoClient.lists);
                PrivateKlaviyoClient.lists.should.be.an.instanceof(Lists);
            });
            describe('attempting to set #lists', function () {
                it('should throw a KlaviyoError', function () {
                    should.Throw(function () {
                        PrivateKlaviyoClient.lists = null;
                    }, KlaviyoError);
                });
            });
        });
    });
});
