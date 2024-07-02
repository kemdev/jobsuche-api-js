import { JsonWebKeyInput } from 'crypto';
import { JobDetails } from '../types/jobDetailsTypes';
import base64 from 'base-64';
import { headers, host, https } from '../Constants/urls';
import axios from 'axios';
import getJwt from '../auth/authApi';

/**
 *
 * @param {string} refnr from the response of the jobSearch function.
 * Note: Please add the refnr as it is no need to encode it with Base64.
 * @returns {Promise<JobDetails | null>} - The job details result.
 */
async function jobDetails(refnr: string): Promise<JobDetails | null> {
  const encodedJobRef = base64.encode(refnr);
  const accessToken = await getJwt();
  const url = `${https}${host}/jobboerse/jobsuche-service/pc/v2/jobdetails/${encodedJobRef}`;

  headers.OAuthAccessToken = accessToken;
  try {
    const response = await axios.get(url, {
      headers,
    });
    return response.data;
  } catch (error: any) {
    console.warn('====error GET JOB DETAILS FUNCTION====', error.message);
    return null;
  }
}

export default jobDetails;
