
# Jobsuche API JS - TypeScript Library for Arbeitsagentur Job Search

jobsuche-api-js is a simple JavaScript/TypeScript library designed to interact with the Jobsuche API provided by the German Federal Employment Agency (Arbeitsagentur). This library simplifies fetching job listings, job details, and search functionality for developers integrating job search features into their web applications.

## Status
**This library is currently in beta.**
We are actively working on improving the library. Please report any issues you encounter.

## Features
- Fetch job search results by location and keyword
- Retrieve detailed information about specific job listings
- Built-in authentication with API Key
- Lightweight and easy to integrate with any JavaScript or TypeScript project

## Installation

```sh
npm install jobsuche-api-js
```

# Overview
jobsuche-api-js fetches jobs from the Arbeitsagentur API. It simplifies the process of retrieving job listings and details using modern JavaScript techniques.

# Usage

### Note:
No need to initialize the app anymore, as adding "X-API-KEY": "jobboerse-jobsuche" to the headers is added automatically in all requests. This is the authentication needed in the latest update of the Jobsuche API. For more details, check theFor more details, check the official [Arbeitsagentur Jobsuche API Documentation](https://github.com/bundesAPI/jobsuche-api#:~:text=Bei%20folgenden%20GET%2Drequests%20ist%20die%20clientId%20als%20Header%2DParameter%20%27X%2DAPI%2DKey%27%20zu%20%C3%BCbergeben).


## Fetch Job Search Results

```js
import { jobsSearch } from 'jobsuche-api-js';

const searchParams = { what: 'developer', where: 'Berlin' };
jobsSearch(searchParams).then(response => console.log(response))
.catch(error => console.error(error));
```

## Fetch Job Details
```js
import { getJobDetails } from 'jobsuche-api-js';

const jobRef = '11112-44023-1558466-0-S';
getJobDetails(jobRef).then(details => console.log(details))
.catch(error => console.error(error));

```

## V6 search and application links (2.1.0)

```ts
import { jobsSearchV6, getJobApplicationUrl, type JobSearchResponseV6 } from 'jobsuche-api-js';
const response: JobSearchResponseV6 | null = await jobsSearchV6({ what: 'React', where: 'Stuttgart' });
for (const job of response?.ergebnisliste ?? []) {
  console.log(job.stellenangebotsTitel, getJobApplicationUrl(job));
}
```

`getJobApplicationUrl` prefers the actual `externeURL` field (also accepts legacy `externeUrl`) and falls back to the BA job detail page if the external URL is null, blank or unsafe. It never substitutes a generic company homepage. Preserve an external search-result URL when a subsequent detail response omits it.

V6 applies to **search** and its `ergebnisliste` / `JobOfferV6` types. The existing `getJobDetails(ref, 'v4')` uses the supported V4 detail endpoint. The historical `IJobDetailsV6ResponseProps` name remains a deprecated alias for `JobSearchResponseV6`. Search and detail calls use independent, bounded fetch requests and keep the documented null-on-error behavior; no cross-request cancellation or unbounded retries.

Version 2.1.0 includes these changes. Install it with `npm install jobsuche-api-js@^2.1.0`.
