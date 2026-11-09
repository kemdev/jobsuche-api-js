const {test}=require('node:test');
const assert=require('node:assert/strict');
const {jobsSearchV6,getJobDetails,getExternalJobUrl,getJobApplicationUrl}=require('../lib/cjs');

test('external application links use the provider field, with safe BA fallback',()=>{
  const base={referenznummer:'10000-test-S'};
  assert.equal(getJobApplicationUrl({...base,externeURL:'https://company.example/jobs/123'}),'https://company.example/jobs/123');
  assert.equal(getExternalJobUrl({...base,externeURL:null,externeUrl:'https://legacy.example/123'}),'https://legacy.example/123');
  for(const externeURL of [null,'','javascript:alert(1)','https://name:password@example.com'])
    assert.equal(getJobApplicationUrl({...base,externeURL}),'https://www.arbeitsagentur.de/jobsuche/jobdetail/10000-test-S');
  assert.equal(getJobApplicationUrl({}),null);
});

test('V6 searches are independent, typed-payload compatible and do not retry failures',async()=>{
  const original=global.fetch,calls=[];
  try{
    global.fetch=async(url,options)=>{calls.push({url,options});return Response.json({ergebnisliste:[{referenznummer:'x',externeURL:null}],maxErgebnisse:1})};
    const [a,b]=await Promise.all([jobsSearchV6({what:'React',where:'Berlin',workTime:['tz','ho']}),jobsSearchV6({what:'Node'})]);
    assert.equal(a.ergebnisliste[0].externeURL,null);assert.equal(b.maxErgebnisse,1);
    assert.equal(calls.length,2);assert.match(calls[0].url,/v6/);assert.match(calls[0].url,/was=React/);assert.match(calls[0].url,/arbeitszeit=tz%3Bho/);
    assert.notEqual(calls[0].options.signal,calls[1].options.signal);
    let failures=0;global.fetch=async()=>{failures++;return new Response('',{status:401})};
    assert.equal(await jobsSearchV6({what:'React'}),null);assert.equal(failures,1);
  }finally{global.fetch=original}
});

test('details use the supported V4 endpoint and preserve external URLs',async()=>{
  const original=global.fetch;
  try{
    global.fetch=async(url)=>{assert.match(url,/v4/);assert.ok(url.endsWith(encodeURIComponent(btoa('10000-test-S'))));return Response.json({externeURL:'https://company.example/job'})};
    assert.equal(getExternalJobUrl(await getJobDetails('10000-test-S')),'https://company.example/job');
    global.fetch=async()=>{throw Error('Timeout')};assert.equal(await getJobDetails('10000-test-S'),null);
  }finally{global.fetch=original}
});
