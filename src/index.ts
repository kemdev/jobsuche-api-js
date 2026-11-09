import getJwt from "./auth/authApi";
import { searchParamsExample } from "./examples/searchParamsExample";
import { jobsSearch, jobsSearchV6 } from "./api/jobsSearch";
import { fetchJobDetailsV3, fetchJobDetailsV2, getJobDetails } from "./api/jobDetails";
import authManager from "./auth/authManager";
import { getCompanyLogoURL, getCompanyLogo } from "./api/companyLogo";
import { fetchCompanyInfo, getCompanyInfo } from "./api/companyInfo";
import { offersLocations } from './helpers/helpers'; 
export {
  getJwt,
  jobsSearch,
  jobsSearchV6,
  searchParamsExample,
  fetchJobDetailsV2,
  fetchJobDetailsV3,
  getJobDetails,
  authManager,
  getCompanyLogoURL,
  getCompanyLogo,
  fetchCompanyInfo,
  getCompanyInfo,
  offersLocations,
};


export { jobsSearch as searchJobs } from './api/jobsSearch';
export { getExternalJobUrl, getJobApplicationUrl } from './helpers/jobApplicationUrl';
export type { JobLinkSource } from './helpers/jobApplicationUrl';
export type { JobSearchResponseV6, JobOfferV6, IJobDetailsV6ResponseProps } from './types/jobDetailsResponseV6Types';
export type { IArbeitsAgenturJobArgsProps } from './types/arbeitsAgenturJobArgsTypes';
