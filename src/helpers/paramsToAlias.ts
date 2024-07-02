import { aliasMapping } from '../Constants/alias';
import { IFetchJobsProps, WorkTime } from '../types/jobsSearchTypes';

function paramsToAlias(params: Partial<IFetchJobsProps>) {
  const translatedParams: Record<string, any> = {};

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const alias = aliasMapping[key as keyof IFetchJobsProps];
      if (alias) {
        if (key === 'workTime' && params[key as keyof IFetchJobsProps]) {
          // For workTime, join the array into a semicolon-separated string
          translatedParams[alias] = (
            params[key as keyof IFetchJobsProps] as WorkTime[]
          ).join(';');
        } else {
          translatedParams[alias] = params[key as keyof IFetchJobsProps];
        }
      }
    }
  }

  return translatedParams;
}

export { paramsToAlias };
