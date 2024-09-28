import { WorkTime } from '../types/arbeitsAgenturJobArgsTypes';

function formatWorkTime(workTimes: WorkTime[]): string {
  return workTimes.join(';');
}

export { formatWorkTime };
