import { NextResponse } from 'next/server';
import { getJobDetails } from '../../../../src';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const refnr = searchParams.get('refnr');

  if (!refnr) {
    return NextResponse.json({ error: 'Missing refnr' }, { status: 400 });
  }

  const details = await getJobDetails(refnr);
  return NextResponse.json(details);
}
