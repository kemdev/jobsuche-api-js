'use client';

import { useEffect, useState } from 'react';

type JobItem = {
  titel: string;
  refnr: string;
  arbeitgeber: string;
};

export default function HomePage() {
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadJobs() {
      try {
        const response = await fetch('/api/jobs?what=developer&where=Berlin&page=1&size=5');
        if (!response.ok) {
          throw new Error('Failed to load jobs');
        }
        const payload = await response.json();
        setJobs(payload?.stellenangebote ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load jobs');
      } finally {
        setLoading(false);
      }
    }

    loadJobs();
  }, []);

  async function loadDetails(refnr: string) {
    try {
      const response = await fetch(`/api/job-details?refnr=${encodeURIComponent(refnr)}`);
      if (!response.ok) {
        throw new Error('Failed to load job details');
      }
      const payload = await response.json();
      setDetails(payload);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load details');
    }
  }

  return (
    <main style={{ padding: 24, fontFamily: 'sans-serif', maxWidth: 960, margin: '0 auto' }}>
      <h1>Jobsuche API demo</h1>
      <p>This example calls a local Next.js route so the browser avoids the upstream CORS restriction.</p>

      {loading && <p>Loading jobs…</p>}
      {error && <p style={{ color: 'crimson' }}>{error}</p>}

      <ul>
        {jobs.map((job) => (
          <li key={job.refnr} style={{ marginBottom: 16 }}>
            <strong>{job.titel}</strong>
            <div>{job.arbeitgeber}</div>
            <button onClick={() => loadDetails(job.refnr)} style={{ marginTop: 8 }}>
              Load details
            </button>
          </li>
        ))}
      </ul>

      {details && (
        <section style={{ marginTop: 24, padding: 16, border: '1px solid #ddd', borderRadius: 8 }}>
          <h2>Job details</h2>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(details, null, 2)}</pre>
        </section>
      )}
    </main>
  );
}
