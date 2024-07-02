import getJwt from '../auth/authApi';

const host = 'rest.arbeitsagentur.de';
const headers: any = {
  'User-Agent':
    'Jobsuche/2.9.2 (de.arbeitsagentur.jobboerse; build:1077; iOS 15.1.0) Alamofire/5.4.4',
  Host: host,
  Connection: 'keep-alive',
};

const https = 'https://';
const serverSuffix = 'jobboerse/jobsuche-service';
const jobSearchPrefix = https + host + '/' + serverSuffix;

const jobsBase = '/pc/v4/jobs';
const logoBase = '/ed/v1/arbeitgeberlogo/';
const job = '/pc/v2/jobdetails/';

const authSuffix = '/oauth/gettoken_cc';

// Full links
const jobLink = jobSearchPrefix + jobsBase;
const logoLink = jobSearchPrefix + logoBase;
const jobDetailLink = jobSearchPrefix + job;

// const authApi = await getJwt();

export { headers, host, authSuffix, jobLink, logoLink, jobDetailLink, https };
