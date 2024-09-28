import { ICompanyLogoURL } from '../types/companyLogo';

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
