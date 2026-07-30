const test = require('node:test');
const assert = require('node:assert/strict');
const lib = require('../lib/cjs');

test('exports modern job search and details helpers', () => {
  assert.equal(typeof lib.searchJobs, 'function');
  assert.equal(typeof lib.getJobDetails, 'function');
  assert.equal(typeof lib.getCompanyLogo, 'function');
  assert.equal(typeof lib.getCompanyInfo, 'function');
});
