import { IFetchJobsProps } from "../types/jobsSearchTypes";
import { JobSearchResponse } from "../types/jobSearchResponseTypes";
import axios, { CancelTokenSource } from "axios";
import { paramsToAlias } from "../helpers/paramsToAlias";
import { headers, jobLink } from "../constants/urls";

// const authManager = new AuthManager(
//   'c003a37f-024f-462a-b36d-b001be4cd24a',
//   '32a39620-32b3-4307-9aa1-511e3d7f48a8'
// );

const DEFAULT_TIMEOUT = 10000; // 10 seconds
let cancelTokenSource: CancelTokenSource | null = null;

/**
 * Fetches job search results based on the provided parameters.
 * @param {Partial<IFetchJobsProps>} [params] - The search parameters (optional).
 * @returns {Promise<JobSearchResponse | null>} - The job search results.
 */
async function jobsSearchOld(
  params?: Partial<IFetchJobsProps>
): Promise<JobSearchResponse | null> {
  const translatedParams = params ? paramsToAlias(params) : undefined;
  try {
    // NOTE No need for this anymore.
    // const accessToken = await authManager.getAccessToken();
    // header.OAuthAccessToken = accessToken;

    // NOTE use this for authorization.
    // header["X-Api-Key"] = "jobboerse-jobsuche";

    const response = await axios.get<JobSearchResponse>(jobLink, {
      headers,
      params: translatedParams,
    });

    const data: JobSearchResponse = response.data;
    return data;
  } catch (error: any) {
    console.error("Error fetching job search results:", error.message);
    return null;
  }
}

/**
 * @function jobsSearch without OAuth access token it is using the new auth header "X-Api-Key"
 * Fetches job search results based on the provided parameters.
 * @param {Partial<IFetchJobsProps>} [params] - The search parameters (optional).
 * @returns {Promise<JobSearchResponse | null>} - The job search results.
 */
async function jobsSearch(
  params?: Partial<IFetchJobsProps>
): Promise<JobSearchResponse | null> {
  if (cancelTokenSource) {
    cancelTokenSource.cancel("Operation canceled due to new request.");
  }

  cancelTokenSource = axios.CancelToken.source();

  const translatedParams = params ? paramsToAlias(params) : undefined;
  // const headers = {
  //   "X-Api-Key": "jobboerse-jobsuche",
  // };

  try {
    const response = await axios.get<JobSearchResponse>(jobLink, {
      headers,
      params: translatedParams,
      timeout: DEFAULT_TIMEOUT, // Add timeout here
      cancelToken: cancelTokenSource.token,
    });

    cancelTokenSource = null; // reset cancel token
    const data: JobSearchResponse = response.data;
    return data;
  } catch (error: any) {
    console.error("Error fetching job search results:", error.message);
    return null;
  }
}

export { jobsSearchOld, jobsSearch };
