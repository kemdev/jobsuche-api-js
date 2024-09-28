import { paramsToAlias } from '../helpers/paramsToAlias';
import { IArbeitsAgenturJobArgsProps } from '../types/arbeitsAgenturJobArgsTypes';

// Example usage:
export const searchParamsExample: Partial<IArbeitsAgenturJobArgsProps> = {
  what: 'Software Developer',
  where: 'Berlin',
  radius: 25,
  workTime: ['vz', 'tz'],
};
export default searchParamsExample;
