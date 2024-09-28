const host = "rest.arbeitsagentur.de";
const headers: any = {
  "X-Api-Key": "jobboerse-jobsuche",
};

const https = "https://";
const serverSuffix = "jobboerse/jobsuche-service";
const serviceSuffix = "vermittlung/ag-darstellung-service";

const jobSearchPrefix = https + host + "/" + serverSuffix;
const jobsBase = "/pc/v4/jobs";

const companyInfoBase = "/pc/v1/arbeitgeberdarstellung/";

const serviceInfoPrefix = https + host + "/" + serviceSuffix;
/**
 * @info This one doesn't require authentication with headers.
 */
const logoBaseED = "/ed/v1/arbeitgeberlogo/";
const jobDetailsV2 = "/pc/v2/jobdetails/";
const jobDetailsV3 = "/pc/v3/jobdetails/";

/**
 * @info This one doesn't require authentication with headers.
 */
const logoBaseCT = "/ct/v1/arbeitgeberlogo";
// Company Logo:

const authSuffix = "/oauth/gettoken_cc";

// Full links
const jobLink = jobSearchPrefix + jobsBase;
const logoLink = jobSearchPrefix + logoBaseED;
const jobDetailV2Link = jobSearchPrefix + jobDetailsV2;
const jobDetailV3Link = jobSearchPrefix + jobDetailsV3;

const companyLogoV3 = serviceInfoPrefix + logoBaseCT;
const companyInfoLink = serviceInfoPrefix + companyInfoBase;
// const authApi = await getJwt();

export {
  headers,
  host,
  authSuffix,
  jobLink,
  logoLink,
  jobDetailV2Link,
  jobDetailV3Link,
  https,
  companyLogoV3,
  companyInfoLink,
};
