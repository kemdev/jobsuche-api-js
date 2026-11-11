# jobsuche-api-js

JavaScript and TypeScript client for the Bundesagentur für Arbeit Jobsuche API.

## Installation

Source version: **2.1.0**. npm publication is currently pending: the release build/tests pass, but automated publishing requires 2FA authorization (EOTP). Until publication succeeds, npm may still serve the previous version.

```sh
npm install jobsuche-api-js@^2.1.0
```

Requires Node.js 22 or newer. Search and detail requests use native `fetch`; browser requests still depend on the provider's CORS policy. For web applications, call the library from your server. The provider API key header is added automatically; no initialization or personal access token is required for search/details.

See [CHANGELOG.md](CHANGELOG.md) for release notes.

## Quick start: V6 search

```ts
import {
  jobsSearchV6,
  getJobApplicationUrl,
  type JobSearchResponseV6,
  type JobOfferV6,
} from 'jobsuche-api-js';

const result: JobSearchResponseV6 | null = await jobsSearchV6({
  what: 'React',
  where: 'Stuttgart',
  radius: 25,
  page: 1,
  size: 20,
  workTime: ['vz', 'ho'],
});

if (!result) {
  console.error('The provider request failed. Try again later.');
} else {
  for (const job of result.ergebnisliste) {
    console.log(job.stellenangebotsTitel, job.firma, getJobApplicationUrl(job));
  }
}
```

CommonJS is also supported:

```js
const { jobsSearchV6 } = require('jobsuche-api-js');
```

### Search parameters

All parameters are optional. English names are translated to the provider's aliases.

| Parameter | Provider name | Meaning |
| --- | --- | --- |
| `what` | `was` | Job title or keywords |
| `where` | `wo` | City or postal code |
| `radius` | `umkreis` | Distance in kilometres |
| `page`, `size` | `page`, `size` | Page (starting at 1), results per page |
| `publishedSince` | `veroeffentlichtseit` | Publication age in days |
| `employer` | `arbeitgeber` | Employer filter |
| `professionalField` | `berufsfeld` | Professional field |
| `occupation` | `beruf` | Occupation |
| `offerType` | `angebotsart` | 1: work, 2: self-employment, 4: training/dual study, 34: internship/trainee |
| `contractDuration` | `befristung` | 1: fixed term, 2: permanent |
| `isTemporary` | `zeitarbeit` | Include temporary employment |
| `isPrivate` | `pav` | Private placement filter |
| `workTime` | `arbeitszeit` | Array of `vz`, `tz`, `snw`, `ho`, `mj` |

Work-time codes mean full-time, part-time, shift/night/weekend, home/telework and minijob respectively. Multiple codes are joined with semicolons. Provider filter availability may change.

## Job details: V4

V6 is the **search** API. Details use the supported V4 endpoint:

```ts
import { getJobDetails } from 'jobsuche-api-js';

const details = await getJobDetails('10000-example-S', 'v4');
if (details) {
  console.log(details.stellenangebotsTitel);
  console.log(details.stellenangebotsBeschreibung);
}
```

Pass the original reference, not a Base64 string. The library encodes it and URL-escapes the result. `getJobDetails(ref)` defaults to V4. Legacy V2/V3 calls remain available through `getJobDetails(ref, 'v2' | 'v3')`, `fetchJobDetailsV2` and `fetchJobDetailsV3`.

Descriptions can contain Markdown or HTML. Rendering and sanitization belong in the consuming application; never insert provider text as unsanitized HTML.

## Direct application links

```ts
import { getExternalJobUrl, getJobApplicationUrl } from 'jobsuche-api-js';

const direct = getExternalJobUrl({
  externeURL: 'https://company.example/careers/job-123',
});
const fallback = getJobApplicationUrl({
  referenznummer: '10000-example-S',
  externeURL: null,
});
```

- `getExternalJobUrl(job)` reads `externeURL` (capital URL), then legacy `externeUrl`. It returns a valid HTTP(S) URL or `null`.
- `getJobApplicationUrl(job)` prefers that external job URL. Otherwise it builds the Arbeitsagentur job-detail URL using `referenznummer` or legacy `refnr`, or returns `null` without either.
- Blank URLs, unsupported protocols and URLs containing credentials are rejected.
- Preserve a direct URL from search when details omit it:

```ts
const applicationUrl =
  (details && getExternalJobUrl(details)) ||
  getJobApplicationUrl(searchJob);
```

The library does not submit applications or determine whether a user applied. Track opening and application confirmation separately in your app.

## Salary, contract and company metadata

V6 `JobOfferV6` includes optional salary and contract fields such as `verguetungsangabe`, `artDerVerguetung`, `festgehalt`, `gehaltsspanneVon`, `gehaltsspanneBis`, `vertragsdauer`, `eintrittszeitraum`, `hauptberuf` and working-time flags.

Treat missing/null values and provider codes such as `KEINE_ANGABEN` as missing information. For example, `JAHRESGEHALT` describes a period; it is not a salary amount. Render a numeric range only when supplied, and do not infer monthly/annual pay when the period is absent.

For a company logo, the provider uses the employer hash:

```ts
const hash = searchJob.arbeitgeberKundennummerHash;
const logoUrl = hash
  ? 'https://rest.arbeitsagentur.de/vermittlung/ag-darstellung-service/ct/v1/arbeitgeberlogo/' +
    encodeURIComponent(hash)
  : null;
```

Hashes may contain `=`; encode them. A missing hash or a 404 means no logo is available. Use initials as a display fallback. The existing `getCompanyLogoURL(hash, companyName?)` / `getCompanyLogo` APIs return `{ url, isLogoExist, error }`; their optional avatar fallback is not an actual company logo. `getCompanyInfo`, `fetchCompanyInfo`, `offersLocations` and legacy authentication helpers remain available.

## Compatibility and errors

| API | Response |
| --- | --- |
| `jobsSearchV6(params)` | `Promise<JobSearchResponseV6 \| null>` |
| `jobsSearch(params)` / `jobsSearch(params, 6)` | V6 response |
| `searchJobs(params)` | Alias of `jobsSearch` |
| `jobsSearch(params, 4)` | Legacy `stellenangebote` response |
| `getJobDetails(ref, version?)` | V4/V3 or V2 details, or `null` |

Search/detail requests have independent 12-second timeout signals. Network failures, non-success responses and invalid JSON return `null`; they do not recursively retry or cancel other users' requests.

`IJobDetailsV6ResponseProps` remains a deprecated alias of `JobSearchResponseV6`; despite its historical name it describes search results, not a V6 detail endpoint. Root exports include `JobSearchResponseV6`, `JobOfferV6`, `JobLinkSource` and `IArbeitsAgenturJobArgsProps`.

## Development and release

```sh
npm ci
npm test
```

Tests build both distributions and cover API exports, V6 request parameters/concurrency, failure behavior, detail encoding and safe application-link precedence.

GitHub Actions publishes after tests when `package.json` changes on `main`, or a `v*.*.*` tag is pushed. The workflow skips versions already present on npm and uses the repository's `NPM_TOKEN` secret. Keep package.json and package-lock.json versions in sync. Never commit a token.

### Troubleshooting EOTP in GitHub Actions

If `npm publish` reports EOTP, it is requesting a two-factor authentication code. For the existing token-based workflow, use a granular npm token scoped to this package with read/write access and the **Bypass two-factor authentication** option, subject to your package's publishing policy. Replace the repository's `NPM_TOKEN` secret and rerun the failed job. Do not paste tokens or one-time codes into issues, docs or chat.

If the package policy disallows token publishing, use npm Trusted Publishing (OIDC) instead; that requires configuration in npm package settings and corresponding workflow changes. See [npm 2FA publishing rules](https://docs.npmjs.com/requiring-2fa-for-package-publishing-and-settings-modification/) and [Trusted Publishing](https://docs.npmjs.com/trusted-publishers/).

This community client is not an official Bundesagentur für Arbeit SDK. See the [provider API reference](https://github.com/bundesAPI/jobsuche-api) and [MIT license](LICENSE).
