import axios from "axios";
import { companyInfoLink } from "../constants/urls";
import { ICompanyInfoProps } from "../types/jobDetailsResponseV3Types";
async function fetchCompanyInfo(
  kundennummerHash: string
): Promise<ICompanyInfoProps | null> {
  try {
    const res = await axios.get(`${companyInfoLink}${kundennummerHash}`, {
      headers: {
        "X-API-KEY": "jobboerse-jobsuche",
      },
    });

    const data = res.data;

    return data;
  } catch (err) {
    console.warn("Failed to fetch company info", err);
    return null;
  }
}

export { fetchCompanyInfo };
