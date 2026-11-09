import type { IArbeitsAgenturJobArgsProps } from '../types/arbeitsAgenturJobArgsTypes';
import type { JobSearchResponse } from '../types/jobSearchResponseTypes';
import type { JobSearchResponseV6 } from '../types/jobDetailsResponseV6Types';
import { paramsToAlias } from '../helpers/paramsToAlias';
import { headers, jobLinkV6, jobLinkV4 } from '../constants/urls';

/** V6 is the current search API; V4 remains available for existing callers. */
function jobsSearch(params?: Partial<IArbeitsAgenturJobArgsProps>, version?: 6): Promise<JobSearchResponseV6 | null>;
function jobsSearch(params: Partial<IArbeitsAgenturJobArgsProps> | undefined, version: 4): Promise<JobSearchResponse | null>;
function jobsSearch(params: Partial<IArbeitsAgenturJobArgsProps> | undefined, version: number): Promise<JobSearchResponseV6 | JobSearchResponse | null>;
async function jobsSearch(params?: Partial<IArbeitsAgenturJobArgsProps>, version = 6): Promise<JobSearchResponseV6 | JobSearchResponse | null> {
  const url = new URL(version === 4 ? jobLinkV4 : jobLinkV6);
  for (const [key, value] of Object.entries(paramsToAlias(params || {}))) {
    if (value !== undefined && value !== null && value !== '') url.searchParams.set(key, String(value));
  }
  try {
    // A separate signal per invocation: searches must never cancel other callers.
    const response = await fetch(url.toString(), { headers, signal: AbortSignal.timeout(12000) });
    if (!response.ok) return null;
    return await response.json() as JobSearchResponseV6 | JobSearchResponse;
  } catch { return null; }
}

/** Explicit, correctly typed V6 entry point. Details use getJobDetails(ref, 'v4'). */
function jobsSearchV6(params?: Partial<IArbeitsAgenturJobArgsProps>): Promise<JobSearchResponseV6 | null> {
  return jobsSearch(params, 6);
}
export { jobsSearch, jobsSearchV6 };
