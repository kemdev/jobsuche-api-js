const { searchJobs, getJobDetails } = require('../../lib/cjs');

async function main() {
  const jobs = await searchJobs({ what: 'developer', where: 'Berlin', page: 1, size: 3 });
  console.log('Found jobs:', jobs?.stellenangebote?.length || 0);

  const firstRef = jobs?.stellenangebote?.[0]?.refnr;
  if (firstRef) {
    const details = await getJobDetails(firstRef);
    console.log('First job title:', details?.stellenangebotsTitel);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
