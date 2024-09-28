import { aliasMapping } from '../constants/alias';
import { IFetchArbeitsAgenturJobsProps, WorkTime } from '../types/ArbeitsAgenturJobsTypes';

function paramsToAlias(params?: Partial<IFetchArbeitsAgenturJobsProps>) {
  const translatedParams: Record<string, any> = {};

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const alias = aliasMapping[key as keyof IFetchArbeitsAgenturJobsProps];
      if (alias) {
        if (key === 'workTime' && params[key as keyof IFetchArbeitsAgenturJobsProps]) {
          // For workTime, join the array into a semicolon-separated string
          translatedParams[alias] = (
            params[key as keyof IFetchArbeitsAgenturJobsProps] as WorkTime[]
          ).join(';');
        } else {
          translatedParams[alias] = params[key as keyof IFetchArbeitsAgenturJobsProps];
        }
      }
    }
  }

  return translatedParams;
}

export { paramsToAlias };
