import base64 from 'base-64';
import axios, { CancelTokenSource } from 'axios';
import authManager from '../auth/authManager';
import { IJobDetailsV2ResponseProps } from '../types/jobDetailsResponseV2Types';
import { IJobDetailsV3ResponseProps } from '../types/jobDetailsResponseV3Types';
import { header, jobDetailV2Link, jobDetailV3Link } from '../constants/urls';

const DEFAULT_TIMEOUT = 10000; // 10 seconds
let cancelTokenSource: CancelTokenSource | null = null;

/**
 * Fetches job details (V2) based on the provided reference number.
 * @param {string} refnr from the response of the jobSearch function.
 * @typeParam string
 * Note: Please add the refnr as it is no need to encode it with Base64.
 * @returns {(Promise<JobDetails | null>)} - The job details result.
 */

async function fetchJobDetailsV2(
  refnr: string
): Promise<IJobDetailsV2ResponseProps | null> {
  // const accessToken = await getJwt();
  const encodedJobRef = base64.encode(refnr);

  const accessToken = await authManager.getAccessToken();
  const headers = {
    ...header,
    OAuthAccessToken: accessToken,
  };

  const url = `${jobDetailV2Link}${encodedJobRef}`;
  try {
    const response = await axios.get(url, {
      headers,
      timeout: DEFAULT_TIMEOUT, // Add timeout here for consistency
    });
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.warn('====error GET JOB DETAILS V2 FUNCTION====', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    return null;
  }
}

/**
 * Fetches job details (V3) based on the provided reference number.
 * Note: No OAuth Access Token Required! Only Add 'X-Api-Key': 'jobboerse-jobsuche' to the header.
 * @param {string} refnr - The reference number of the job.
 * @returns {Promise<IJobDetailsV3ResponseProps | null>} - The job details.
 */
async function fetchJobDetailsV3(
  refnr: string
): Promise<IJobDetailsV3ResponseProps | null> {
  if (cancelTokenSource) {
    cancelTokenSource.cancel('Operation canceled due to new request.');
  }
  cancelTokenSource = axios.CancelToken.source();

  const encodedJobRef = base64.encode(refnr);

  const headers = {
    'X-Api-Key': 'jobboerse-jobsuche',
  };

  const url = `${jobDetailV3Link}${encodedJobRef}`;
  try {
    const response = await axios.get(url, {
      headers,
      timeout: DEFAULT_TIMEOUT,
      cancelToken: cancelTokenSource.token,
    });
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.warn('====error GET JOB DETAILS V3 FUNCTION====', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    return null;
  }
}

export { fetchJobDetailsV2, fetchJobDetailsV3 };
