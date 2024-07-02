import { IFetchJobsProps } from '../types/jobsSearchTypes';
import { JobSearchResponse } from '../types/jobSearchResponseTypes';
import axios from 'axios';
import { paramsToAlias } from '../helpers/paramsToAlias';
import { jobLink } from '../Constants/urls';
import { headers } from '../Constants/urls';
import getJwt from '../auth/authApi';
import searchParamsExample from '../examples/searchParamsExample';

/**
 * Fetches job search results based on the provided parameters.
 * @param {Partial<IFetchJobsProps>} [params] - The search parameters (optional).
 * @returns {Promise<JobSearchResponse | null>} - The job search results.
 */
async function jobsSearch(
  params?: Partial<IFetchJobsProps>
): Promise<JobSearchResponse | null> {
  const translatedParams = paramsToAlias(params || searchParamsExample);
  const jwt = await getJwt();

  headers.OAuthAccessToken = jwt;

  try {
    const response = await axios.get<JobSearchResponse>(jobLink, {
      headers,
      params: translatedParams,
    });

    const data: JobSearchResponse = response.data;
    return data;
  } catch (error: any) {
    console.error('Axios error:', error.message);
    return null;
  }
}

export default jobsSearch;
