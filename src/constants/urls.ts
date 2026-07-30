const host = "rest.arbeitsagentur.de";
const headers: any = {
  "X-Api-Key": "jobboerse-jobsuche",
  "Content-Type": "application/json",
  Accept: "application/json",
  "Access-Control-Allow-Origin": "*"
};

const https = "https://";
const serverSuffix = "jobboerse/jobsuche-service";
const serviceSuffix = "vermittlung/ag-darstellung-service";

const jobSearchPrefix = https + host + "/" + serverSuffix;
const jobsBaseV4 = "/pc/v4/jobs";
const jobsBaseV6 = "/pc/v6/jobs";

const companyInfoBase = "/pc/v1/arbeitgeberdarstellung/";

const serviceInfoPrefix = https + host + "/" + serviceSuffix;
/**
 * @info This one doesn't require authentication with headers.
 */
const logoBaseED = "/ed/v1/arbeitgeberlogo/";
const jobDetailsV2 = "/pc/v2/jobdetails/";
const jobDetailsV3 = "/pc/v3/jobdetails/";
const jobDetailsV4 = "/pc/v4/jobdetails/";
/**
 * @info This one doesn't require authentication with headers.
 */
const logoBaseCT = "/ct/v1/arbeitgeberlogo";
// Company Logo:

const authSuffix = "/oauth/gettoken_cc";

// Full links
const jobLinkV4 = jobSearchPrefix + jobsBaseV4;
const jobLinkV6 = jobSearchPrefix + jobsBaseV6;

const logoLink = jobSearchPrefix + logoBaseED;

const jobDetailV2Link = jobSearchPrefix + jobDetailsV2;
const jobDetailV3Link = jobSearchPrefix + jobDetailsV3;
const jobDetailV4Link = jobSearchPrefix + jobDetailsV4;

const companyLogoV3 = serviceInfoPrefix + logoBaseCT;
const companyInfoLink = serviceInfoPrefix + companyInfoBase;
// const authApi = await getJwt();

export {
  headers,
  host,
  authSuffix,
  jobLinkV4,
  jobLinkV6,
  logoLink,
  jobDetailV2Link,
  jobDetailV3Link,
  jobDetailV4Link,
  https,
  companyLogoV3,
  companyInfoLink,
};
