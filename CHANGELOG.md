# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
 - Support for [Campaigns API](https://www.klaviyo.com/docs/api/campaigns) - [Campaign Information](https://www.klaviyo.com/docs/api/campaigns#campaign) endpoint.

## [1.0.3] - 2021-02-05

### Added
- Added `retryAfter` property to KlaviyoRateLimitError

## [1.0.2] - 2021-01-13

### Added
- Changelog diff links
- Changelog links to Klaviyo API documentation where appropriate

### Fixed
- Delete methods now return an empty object on success, rather than raising an "Unexpected end of JSON input" error.

## [1.0.1] - 2020-12-07

### Added
- Created CHANGELOG.md

## [1.0.0] - 2020-12-07

### Added
- Support for [Public API](https://www.klaviyo.com/docs/http-api) endpoints (track and identify)
- Support for [Profiles API](https://www.klaviyo.com/docs/api/people)
- Support for [Metrics API](https://www.klaviyo.com/docs/api/metrics)
- Support for [V2 List API](https://www.klaviyo.com/docs/api/v2/lists)

[Unreleased]: https://github.com/klaviyo/node-klaviyo/compare/1.0.3...HEAD
[1.0.3]: https://github.com/klaviyo/node-klaviyo/compare/1.0.2...1.0.3
[1.0.2]: https://github.com/klaviyo/node-klaviyo/compare/26cf1da1612e3a2aea924210e2a48486345f474b...1.0.2
[1.0.1]: https://github.com/klaviyo/node-klaviyo/compare/c63216437dc38e98ffd86c88df3c6f6a63381934...26cf1da1612e3a2aea924210e2a48486345f474b
[1.0.0]: https://github.com/klaviyo/node-klaviyo/compare/6db9369980447ef4cfccfa018d5ebaaa27ef0f04...c63216437dc38e98ffd86c88df3c6f6a63381934
