
# Arbeitsagentur Jobsuche API - JS

This project provides a library for interacting with the job search API.

## Status

**This library is currently in beta.**
We are actively working on improving the library. Please report any issues you encounter.


## Installation

```sh
npm install jobsuche-api-js@beta
```
# jobsuche-api-js
Fetch Jobs from Arbeitsagentur API

# Usage

### Note:
 No need to initialize the app anymore, we are already using "  "X-API-KEY": "jobboerse-jobsuche" header in all of the requests, which is the authentication needed in the latest update of jobsuche-api <a href="https://github.com/bundesAPI/jobsuche-api#:~:text=Bei%20folgenden%20GET%2Drequests%20ist%20die%20clientId%20als%20Header%2DParameter%20%27X%2DAPI%2DKey%27%20zu%20%C3%BCbergeben">Check Arbeitsagentur Jobsuche API</a>. 
<del>
~~<h2>First you need to initialize the authentication for the api call</h2>~~
/**
 *  client_id and client_secret they are provided in the original docs 
 *  @see https://github.com/bundesAPI/jobsuche-api
 */
const clientId = 'c003a37f-024f-462a-b36d-b001be4cd24a';
const clientSecret = '32a39620-32b3-4307-9aa1-511e3d7f48a8';
const auth = () => authManager.initialize(clientId, clientSecret);

</del>


## Fetch Job Search Results

```js
import { jobsSearch } from 'jobsuche-api-js';

const searchParams = { what: 'developer', where: 'Berlin' };
jobsSearch(searchParams).then(response => console.log(response));
```

## Fetch Job Details
```js
import { jobDetails } from 'jobsuche-api-js';

const jobRef = '11112-44023-1558466-0-S';
jobDetails(jobRef).then(details => console.log(details));
```
