import type { IJobDetailsV2ResponseProps } from '../types/jobDetailsResponseV2Types';
import type { IJobDetailsV3ResponseProps } from '../types/jobDetailsResponseV3Types';
import { headers, jobDetailV2Link, jobDetailV3Link, jobDetailV4Link } from '../constants/urls';

/** Search is V6; the currently supported job-detail endpoint is V4. */
async function getJobDetails(refnr: string, version: 'v4' | 'v3' | 'v2' = 'v4'): Promise<IJobDetailsV3ResponseProps | IJobDetailsV2ResponseProps | null> {
  const base = version === 'v2' ? jobDetailV2Link : version === 'v3' ? jobDetailV3Link : jobDetailV4Link;
  try {
    const response = await fetch(base + encodeURIComponent(btoa(refnr)), { headers, signal: AbortSignal.timeout(12000) });
    if (!response.ok) return null;
    return await response.json() as IJobDetailsV3ResponseProps | IJobDetailsV2ResponseProps;
  } catch { return null; }
}
function fetchJobDetailsV2(refnr: string): Promise<IJobDetailsV2ResponseProps | null> { return getJobDetails(refnr, 'v2') as Promise<IJobDetailsV2ResponseProps | null>; }
function fetchJobDetailsV3(refnr: string): Promise<IJobDetailsV3ResponseProps | null> { return getJobDetails(refnr, 'v3') as Promise<IJobDetailsV3ResponseProps | null>; }
export { fetchJobDetailsV2, fetchJobDetailsV3, getJobDetails };
