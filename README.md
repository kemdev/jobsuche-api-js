
# Job Search Library

This project provides a library for interacting with the job search API.

## Installation

```sh
npm install job-search-library
```
# jobsuche-api-js
Fetch Jobs from Arbeitsagentur API

# Usage
## Fetch Job Search Results

```js
import { fetchJobsSearch } from 'jobsuche-api-js';

const searchParams = { what: 'developer', where: 'Berlin' };
fetchJobsSearch(searchParams).then(response => console.log(response));
```

## Fetch Job Details
```js
import { fetchJobDetails } from 'job-search-library';

const jobId = '12345';
fetchJobDetails(jobId).then(details => console.log(details));
```

# Documentation generator:
