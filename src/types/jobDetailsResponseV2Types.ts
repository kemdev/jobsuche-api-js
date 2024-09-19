import { Arbeitsort } from './jobSearchResponseTypes';

interface IJobDetailsV2ResponseProps {
  aktuelleVeroeffentlichungsdatum: Date;
  angebotsart: string;
  arbeitgeber: string;
  branchengruppe: string;
  branche: string;
  arbeitgeberHashId: string;
  arbeitsorte: JobDetailsArbeitsorteInner[];
  arbeitszeitmodelle: string[];
  befristung: string;
  uebernahme: boolean;
  betriebsgroesse: string;
  eintrittsdatum: Date;
  ersteVeroeffentlichungsdatum: Date;
  allianzpartner: string;
  allianzpartnerUrl: string;
  titel: string;
  hashId: string;
  beruf: string;
  modifikationsTimestamp: string;
  stellenbeschreibung: string;
  refnr: string;
  fuerFluechtlingeGeeignet: boolean;
  nurFuerSchwerbehinderte: boolean;
  anzahlOffeneStellen: number;
  arbeitgeberAdresse: JobDetailsArbeitgeberAdresse;
  fertigkeiten: JobDetailsFertigkeitenInner[];
  mobilitaet: JobDetailsMobilitaet;
  fuehrungskompetenzen: JobDetailsFuehrungskompetenzen;
  verguetung: string;
  arbeitgeberdarstellungUrl: string;
  arbeitgeberdarstellung: string;
  hauptDkz: string;
  istBetreut: boolean;
  istGoogleJobsRelevant: boolean;
  anzeigeAnonym: boolean;
  [key: string]: any; // to allow any additional properties
}

interface JobDetailsArbeitgeberAdresse extends Arbeitsort {
  strasseHausnummer: string;
  [key: string]: any; // to allow any additional properties
}

interface JobDetailsArbeitsorteInner extends Arbeitsort {
  [key: string]: any; // to allow any additional properties
}

interface JobDetailsFertigkeitenInner {
  hierarchieName: string;
  auspraegungen: {
    [key: string]:
      | boolean
      | Date
      | string
      | object
      | number
      | Array<boolean | Date | string | object | number>
      | null;
  };
}

interface JobDetailsMobilitaet {
  reisebereitschaft: boolean;
}

interface JobDetailsFuehrungskompetenzen {
  hatVollmacht: boolean;
  hatBudgetverantwortung: string;
}

export {
  IJobDetailsV2ResponseProps,
  JobDetailsArbeitgeberAdresse,
  JobDetailsArbeitsorteInner,
  JobDetailsFertigkeitenInner,
  JobDetailsMobilitaet,
  JobDetailsFuehrungskompetenzen,
};
