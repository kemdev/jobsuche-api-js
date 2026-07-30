import base64 from "base-64";
import axios, { CancelTokenSource } from "axios";
import { IJobDetailsV2ResponseProps } from "../types/jobDetailsResponseV2Types";
import { IJobDetailsV3ResponseProps } from "../types/jobDetailsResponseV3Types";
import { headers, jobDetailV2Link, jobDetailV3Link, jobDetailV4Link } from "../constants/urls";

const DEFAULT_TIMEOUT = 10000; // 10 seconds
let cancelTokenSource: CancelTokenSource | null = null;

async function getJobDetails(
  refnr: string,
  version: "v4" | "v3" | "v2" = "v4"
): Promise<IJobDetailsV3ResponseProps | IJobDetailsV2ResponseProps | null> {
  if (cancelTokenSource) {
    cancelTokenSource.cancel("Operation canceled due to new request.");
  }
  cancelTokenSource = axios.CancelToken.source();

  const encodedJobRef = base64.encode(refnr);
  const url =
    version === "v2"
      ? `${jobDetailV2Link}${encodedJobRef}`
      : version === "v3"
        ? `${jobDetailV3Link}${encodedJobRef}`
        : `${jobDetailV4Link}${encodedJobRef}`;

  try {
    const response = await axios.get(url, {
      headers,
      timeout: DEFAULT_TIMEOUT,
      cancelToken: cancelTokenSource.token,
    });
    // console.log("🚀 ~ getJobDetails ~ response:", response)
    cancelTokenSource = null;
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.warn("====error GET JOB DETAILS FUNCTION====", error.message);
      if (error.code === "ECONNABORTED" || error.response?.status === 401) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return await getJobDetails(refnr, version);
      }
    }
    console.error("Unexpected error:", error);
    return null;
  }
}

async function fetchJobDetailsV2(
  refnr: string
): Promise<IJobDetailsV2ResponseProps | null> {
  return getJobDetails(refnr, "v2") as Promise<IJobDetailsV2ResponseProps | null>;
}

async function fetchJobDetailsV3(
  refnr: string
): Promise<IJobDetailsV3ResponseProps | null> {
  return getJobDetails(refnr, "v3") as Promise<IJobDetailsV3ResponseProps | null>;
}

export { fetchJobDetailsV2, fetchJobDetailsV3, getJobDetails };
