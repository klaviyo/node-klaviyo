'use strict';

const
    Klaviyo = require('node-klaviyo'),
    {
        KlaviyoError
    } = require('../../lib/errors.js'),
    chai = require('chai'),
    should = chai.should();

//test data
const
    privateToken = 'pk_asdfasdfasdfasdf',
    KlaviyoClient = new Klaviyo({
        privateToken: privateToken
    });

/**
 * Using 'normal' anonymous functions instead of arrow/lambdas here because
 * of this note in the mocha documentation: https://mochajs.org/#arrow-functions
 */
describe('Private', function () {
    describe('#token', function () {
        context('attempting to set #token', function () {
            it('should throw a KlaviyoError', function () {
                should.Throw(function () {
                    KlaviyoClient.profiles.token = 'newToken';
                }, KlaviyoError);
            });
        });
    });
});
