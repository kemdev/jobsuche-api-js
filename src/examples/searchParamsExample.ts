import { paramsToAlias } from '../helpers/paramsToAlias';
import { IFetchArbeitsAgenturJobsProps } from '../types/ArbeitsAgenturJobsTypes';

// Example usage:
export const searchParamsExample: Partial<IFetchArbeitsAgenturJobsProps> = {
  what: 'Software Developer',
  where: 'Berlin',
  radius: 25,
  workTime: ['vz', 'tz'],
};
export default searchParamsExample;
