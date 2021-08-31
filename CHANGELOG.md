# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

### [Unreleased]

### [1.1.3] - 2021-08-31

#### Added
- Added examples to README for methods tied to people/search and data-privacy/deletion-request
- Added language to Public API section of the README to explain usage of new post option
- Added timestamp to Track example in README

#### Fixed
- Updated API documentation links to use new subdomain (apidocs.klaviyo.com)
- Bump browserslist from 4.16.3 to 4.16.6
- Use Buffer.byteLength(data) instead of data.length to account for encoding of
accented characters increasing the length of the payload

### [1.1.2] - 2021-08-03

#### Added
- Added support for POST method with Track/Identify endpoints

### [1.1.1] - 2021-04-27

#### Added
- Added support for un-setting profile properties

### [1.1.0] - 2021-04-01

#### Added
- Added the people/search and data-privacy/deletion-request endpoints

### [1.0.3] - 2021-02-05

#### Added
- Added `retryAfter` property to KlaviyoRateLimitError

### [1.0.2] - 2021-01-13

#### Added
- Changelog diff links
- Changelog links to Klaviyo API documentation where appropriate

#### Fixed
- Delete methods now return an empty object on success, rather than raising an "Unexpected end of JSON input" error.

### [1.0.1] - 2020-12-07

#### Added
- Created CHANGELOG.md

### [1.0.0] - 2020-12-07

#### Added
- Support for [Public API](https://www.klaviyo.com/docs/http-api) endpoints (track and identify)
- Support for [Profiles API](https://www.klaviyo.com/docs/api/people)
- Support for [Metrics API](https://www.klaviyo.com/docs/api/metrics)
- Support for [V2 List API](https://www.klaviyo.com/docs/api/v2/lists)

[Unreleased]: https://github.com/klaviyo/node-klaviyo/compare/1.1.2...HEAD
[1.1.2]: https://github.com/klaviyo/node-klaviyo/compare/1.1.1...1.1.2
[1.1.1]: https://github.com/klaviyo/node-klaviyo/compare/1.1.0...1.1.1
[1.1.0]: https://github.com/klaviyo/node-klaviyo/compare/1.0.3...1.1.0
[1.0.3]: https://github.com/klaviyo/node-klaviyo/compare/1.0.2...1.0.3
[1.0.2]: https://github.com/klaviyo/node-klaviyo/compare/26cf1da1612e3a2aea924210e2a48486345f474b...1.0.2
[1.0.1]: https://github.com/klaviyo/node-klaviyo/compare/c63216437dc38e98ffd86c88df3c6f6a63381934...26cf1da1612e3a2aea924210e2a48486345f474b
[1.0.0]: https://github.com/klaviyo/node-klaviyo/compare/6db9369980447ef4cfccfa018d5ebaaa27ef0f04...c63216437dc38e98ffd86c88df3c6f6a63381934
