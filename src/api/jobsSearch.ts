import { IArbeitsAgenturJobArgsProps } from "../types/arbeitsAgenturJobArgsTypes";
import { JobSearchResponse } from "../types/jobSearchResponseTypes";
import axios, { CancelTokenSource } from "axios";
import { paramsToAlias } from "../helpers/paramsToAlias";
import { headers, jobLinkV6, jobLinkV4 } from "../constants/urls";

// const authManager = new AuthManager(
//   'c003a37f-024f-462a-b36d-b001be4cd24a',
//   '32a39620-32b3-4307-9aa1-511e3d7f48a8'
// );

const DEFAULT_TIMEOUT = 10000; // 10 seconds
let cancelTokenSource: CancelTokenSource | null = null;

// /**
//  * Fetches job search results based on the provided parameters.
//  * @param {Partial<IArbeitsAgenturJobArgsProps>} [params] - The search parameters (optional).
//  * @returns {Promise<JobSearchResponse | null>} - The job search results.
//  */
// async function jobsSearchOld(
//   params?: Partial<IArbeitsAgenturJobArgsProps>,
// ): Promise<JobSearchResponse | null> {
//   return jobsSearch();
// }

/**
 * @function jobsSearch without OAuth access token it is using the new auth header "X-Api-Key"
 * Fetches job search results based on the provided parameters.
 * @param {Partial<IArbeitsAgenturJobArgsProps>} [params] - The search parameters (optional).
 * @param {number} [version=6] - The API version to use (default is latest).
 * @returns {Promise<JobSearchResponse | null>} - The job search results.
 */
async function jobsSearch(
  params?: Partial<IArbeitsAgenturJobArgsProps>,
  version: number = 6,
): Promise<JobSearchResponse | null> {
  if (cancelTokenSource) {
    cancelTokenSource.cancel("Operation canceled due to new request.");
  }

  cancelTokenSource = axios.CancelToken.source();

  const translatedParams = params ? paramsToAlias(params) : undefined;

  try {
    let jobLink = jobLinkV6;
    if (version === 4) {
      jobLink = jobLinkV4;
    }

    const response = await axios.get<JobSearchResponse>(jobLink, {
      headers,
      params: translatedParams,
      timeout: DEFAULT_TIMEOUT,
      cancelToken: cancelTokenSource.token,
    });

    cancelTokenSource = null;
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.warn("====error GET JOB SEARCH FUNCTION====", error.message);

      if (error.code === "ECONNABORTED" || error.response?.status === 401) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return await jobsSearch(params, version);
      }
    }
    console.error("Error fetching job search results:", error.message);
    return null;
  }
}

// async function jobsSearch(
//   params?: Partial<IArbeitsAgenturJobArgsProps>,
//   version: number = 6,
// ): Promise<JobSearchResponse | null> {
//   return searchJobs(params, version);
// }

export { jobsSearch };
