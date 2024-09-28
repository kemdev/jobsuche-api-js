interface ICompanyAvatar {
  name?: string;
  background?: string;
  color?: string;
  size?: number;
  format?: string;
}

interface ICompanyLogoURL {
  url: string | null;
  isLogoExist: boolean;
  error: any;
}

export type { ICompanyAvatar, ICompanyLogoURL };
