import { paramsToAlias } from '../helpers/paramsToAlias';
import { IFetchJobsProps } from '../types/jobsSearchTypes';

// Example usage:
export const searchParamsExample: Partial<IFetchJobsProps> = {
  what: 'Software Developer',
  where: 'Berlin',
  radius: 25,
  workTime: ['vz', 'tz'],
};
export default searchParamsExample;
