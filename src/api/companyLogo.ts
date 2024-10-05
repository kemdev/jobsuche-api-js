import axios from "axios";
import { companyLogoV3 } from "../constants/urls";
import { ICompanyLogoURL } from "../types/companyLogo";
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
  companyName?: string
): Promise<ICompanyLogoURL> {
  let avatarUrl = null;

  if (companyName) avatarUrl = constructAvatarUrl(companyName);
  if (!companyName && kundennummerHash) {
    const companyInfo = await fetchCompanyInfo(kundennummerHash);
    if (companyInfo) {
      avatarUrl = constructAvatarUrl(companyInfo?.firma);
    }
  }

  if (!kundennummerHash) {
    return companyLogoReturnHelper(avatarUrl, false, null);
  }

  try {
    const fullUrl = `${companyLogoV3}/${kundennummerHash}`;

    // TODO check this later.
    // make an axios request to check if the company logo exists.
    // if there is an error the avatar will be returned.
    const response = await axios.get(fullUrl);

    const data = response.data;

    if (!data) {
      return companyLogoReturnHelper(
        avatarUrl,
        false,
        "Image not found from try!"
      );
    }

    return companyLogoReturnHelper(fullUrl, fullUrl.length > 0, null);
  } catch (error: any) {
    return companyLogoReturnHelper(avatarUrl, false, error.message);
  }
}

export { getCompanyLogoURL };
