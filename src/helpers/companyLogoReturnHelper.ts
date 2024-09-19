import { ICompanyLogoURL } from '../types/company';

function companyLogoReturnHelper(
  url: ICompanyLogoURL['url'],
  isLogoExist: ICompanyLogoURL['isLogoExist'],
  error: ICompanyLogoURL['error']
): ICompanyLogoURL {
  return {
    url,
    isLogoExist,
    error,
  };
}

export { companyLogoReturnHelper };
