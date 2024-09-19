import axios, { AxiosError } from "axios";
import { companyLogoV3 } from "../constants/urls";
import { ICompanyAvatar, ICompanyLogoURL } from "../types/company";
import { fetchCompanyInfo } from "./companyInfo";
import { companyLogoReturnHelper } from "../helpers/companyLogoReturnHelper";

const constructAvatarUrl = (name: string): string => {
  const defaultSettings = {
    name: name || "N/A",
    background: "random",
    color: "fff",
    size: 128,
    format: "svg",
  };

  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    defaultSettings.name
  )}&background=${defaultSettings.background}&color=${
    defaultSettings.color
  }&size=${defaultSettings.size}&format=${defaultSettings.format}`;
};

async function getCompanyLogoURL(
  kundennummerHash: string,
  getAvatarIfNeeded?: ICompanyAvatar | boolean
): Promise<ICompanyLogoURL> {
  try {
    const fullUrl = `${companyLogoV3}/${kundennummerHash}`;

    // TODO check this later.
    const response = await axios.get(fullUrl);

    const data = response.data;

    return companyLogoReturnHelper(fullUrl, fullUrl.length > 0, null);
  } catch (error: any) {
    let avatarUrl = null;

    if (axios.isAxiosError(error) && error.response?.status === 404) {
      try {
        const companyInfo = await fetchCompanyInfo(kundennummerHash);
        if (companyInfo.firma)
          avatarUrl = constructAvatarUrl(companyInfo.firma);

        // Return isLogoExist false
        return companyLogoReturnHelper(avatarUrl, false, null);
      } catch (e: any) {
        companyLogoReturnHelper(avatarUrl, false, e.message);
      }

      return companyLogoReturnHelper(avatarUrl, false, error.message);
    }
    return companyLogoReturnHelper(avatarUrl, false, error.message);
  }
}

export { getCompanyLogoURL };
