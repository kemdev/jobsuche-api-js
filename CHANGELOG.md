# Changelog

## [2.1.0] - 2026-11-11

### Added
- Explicit `jobsSearchV6` function with `JobSearchResponseV6` and `JobOfferV6` exports.
- `getExternalJobUrl` and `getJobApplicationUrl` helpers with employer/ATS URL precedence and Arbeitsagentur fallback.
- `JobLinkSource` type, `searchJobs` alias, and typed nullable V6 salary range fields.
- Regression tests for V6 parameters, concurrent requests, error behavior, V4 detail encoding and application links.

### Fixed
- Read the provider's `externeURL` field (and legacy `externeUrl`), including null/blank values.
- Search and detail requests now use native fetch with an independent 12-second timeout per call.
- Remove shared request cancellation and unbounded retry loops on failures.
- URL-escape Base64 detail references.
- Correct default V6 search return types; preserve V4 search overloads and legacy detail entry points.
- Reject unsafe protocols and credentials in application URLs.

### Documentation and release
- Replace the historical V6-details label with a deprecated compatibility alias for the V6 search response.
- Document V6 search vs V4 details, salary metadata, encoded company-logo hashes and HTML/Markdown handling.
- Run build/tests before npm publication; publish version changes on main as well as version tags.
- Explicit public npm publish configuration; keep version 2.1.0 for the previously unpublished release.

## [2.0.0]

Previous release baseline. This entry records the existing version; it does not reconstruct unavailable historical release notes.
