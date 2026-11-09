/** The API spells this field externeURL (capital URL). */
export interface JobLinkSource {
  externeURL?: string | null;
  /** Older payloads may use this spelling. */
  externeUrl?: string | null;
  referenznummer?: string | null;
  refnr?: string | null;
}
function safeHttpUrl(value: unknown): string | null {
  if (typeof value !== 'string' || !value.trim()) return null;
  try {
    const url = new URL(value.trim());
    return ['https:', 'http:'].includes(url.protocol) && !url.username && !url.password ? url.href : null;
  } catch { return null; }
}
export function getExternalJobUrl(job: JobLinkSource): string | null {
  return safeHttpUrl(job.externeURL) || safeHttpUrl(job.externeUrl);
}
/** Prefer the employer/ATS job page. Fall back only when no safe external URL exists. */
export function getJobApplicationUrl(job: JobLinkSource): string | null {
  const external = getExternalJobUrl(job);
  if (external) return external;
  const ref = job.referenznummer || job.refnr;
  return typeof ref === 'string' && ref.trim() ? `https://www.arbeitsagentur.de/jobsuche/jobdetail/${encodeURIComponent(ref.trim())}` : null;
}
