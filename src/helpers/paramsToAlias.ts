import { aliasMapping } from '../constants/alias';
import { IArbeitsAgenturJobArgsProps, WorkTime } from '../types/arbeitsAgenturJobArgsTypes';

function paramsToAlias(params?: Partial<IArbeitsAgenturJobArgsProps>) {
  const translatedParams: Record<string, any> = {};

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const alias = aliasMapping[key as keyof IArbeitsAgenturJobArgsProps];
      if (alias) {
        if (key === 'workTime' && params[key as keyof IArbeitsAgenturJobArgsProps]) {
          // For workTime, join the array into a semicolon-separated string
          translatedParams[alias] = (
            params[key as keyof IArbeitsAgenturJobArgsProps] as WorkTime[]
          ).join(';');
        } else {
          translatedParams[alias] = params[key as keyof IArbeitsAgenturJobArgsProps];
        }
      }
    }
  }

  return translatedParams;
}

export { paramsToAlias };
