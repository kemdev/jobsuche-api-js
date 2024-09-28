import { IFetchJobsProps } from "../types/jobsSearchTypes";

const aliasMapping: Record<keyof IFetchJobsProps, string> = {
  what: "was",
  where: "wo",
  professionalField: "berufsfeld",
  page: "page",
  employer: "arbeitgeber",
  isTemporary: "zeitarbeit",
  size: "size",
  publishedSince: "veroeffentlichtseit",
  isPrivate: "pav",
  offerType: "angebotsart",
  contractDuration: "befristung",
  radius: "umkreis",
  workTime: "arbeitszeit",
};

export { aliasMapping };
