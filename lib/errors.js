'use strict';

class KlaviyoError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

class KlaviyoConfigurationError extends KlaviyoError {}

class KlaviyoApiError extends KlaviyoError {
    constructor(statusCode, data) {
        super(`Request failed with status code: ${statusCode}`);
        this.statusCode = statusCode;
        this.data = data;
    }
}

class KlaviyoAuthenticationError extends KlaviyoApiError {}

class KlaviyoRateLimitError extends KlaviyoApiError {}

class KlaviyoServerError extends KlaviyoApiError {}

module.exports.KlaviyoError = KlaviyoError;
module.exports.KlaviyoConfigurationError = KlaviyoConfigurationError;
module.exports.KlaviyoApiError = KlaviyoApiError;
module.exports.KlaviyoAuthenticationError = KlaviyoAuthenticationError;
module.exports.KlaviyoRateLimitError = KlaviyoRateLimitError;
module.exports.KlaviyoServerError = KlaviyoServerError;
