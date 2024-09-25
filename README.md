
# Arbeitsagentur Jobsuche API JS - TS

jobsuche-api-js is a simple JavaScript/TypeScript library designed to interact with the Jobsuche API provided by Job Arbeitsagentur. This project provides a library for interacting with the job search API.

## Status
**This library is currently in beta.**
We are actively working on improving the library. Please report any issues you encounter.


## Installation

```sh
npm install jobsuche-api-js
```

# Overview
jobsuche-api-js fetches jobs from the Arbeitsagentur API. It simplifies the process of retrieving job listings and details using modern JavaScript techniques.

# Usage

### Note:
No need to initialize the app anymore, as the "X-API-KEY": "jobboerse-jobsuche" headers are added automatically in all requests. This is the authentication needed in the latest update of the Jobsuche API. For more details, check the <a href="https://github.com/bundesAPI/jobsuche-api#:~:text=Bei%20folgenden%20GET%2Drequests%20ist%20die%20clientId%20als%20Header%2DParameter%20%27X%2DAPI%2DKey%27%20zu%20%C3%BCbergeben">Arbeitsagentur Jobsuche API Documentation</a>. 

## Fetch Job Search Results

```js
import { jobsSearch } from 'jobsuche-api-js';

const searchParams = { what: 'developer', where: 'Berlin' };
jobsSearch(searchParams).then(response => console.log(response))
.catch(error => console.error(error));
```

## Fetch Job Details
```js
import { jobDetails } from 'jobsuche-api-js';

const jobRef = '11112-44023-1558466-0-S';
jobDetails(jobRef).then(details => console.log(details))
.catch(error => console.error(error));

```
