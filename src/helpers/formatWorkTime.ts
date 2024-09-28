import { WorkTime } from '../types/ArbeitsAgenturJobsTypes';

function formatWorkTime(workTimes: WorkTime[]): string {
  return workTimes.join(';');
}

export { formatWorkTime };
