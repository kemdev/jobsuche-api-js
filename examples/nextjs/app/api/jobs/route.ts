import { NextResponse } from 'next/server';
import { searchJobs } from '../../../../src';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const what = searchParams.get('what') ?? 'developer';
  const where = searchParams.get('where') ?? 'Berlin';
  const page = Number(searchParams.get('page') ?? '1');
  const size = Number(searchParams.get('size') ?? '5');

  const jobs = await searchJobs({ what, where, page, size });
  return NextResponse.json(jobs);
}
