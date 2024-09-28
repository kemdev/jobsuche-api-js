import { IArbeitsAgenturJobArgsProps } from "../types/arbeitsAgenturJobArgsTypes";

const aliasMapping: Record<keyof IArbeitsAgenturJobArgsProps, string> = {
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
