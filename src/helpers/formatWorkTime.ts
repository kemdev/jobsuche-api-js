import { WorkTime } from '../types/jobsSearchTypes';

function formatWorkTime(workTimes: WorkTime[]): string {
  return workTimes.join(';');
}

export { formatWorkTime };
