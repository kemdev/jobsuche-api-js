// Nested Type

interface IStellenlokation {
  breite: number;
  adresse: IAdresse;
  laenge: number;
  [key: string]: any; // to allow any additional properties
}

interface IVeroeffentlichungszeitraum {
  von: string; // Should be in the format 'YYYY-MM-DD'
  [key: string]: any; // to allow any additional properties
}

interface IAdresse {
  ort: string;
  land: string;
  region: string;
  plz: string;
  strasse: string;
  hausnummer: string;
  [key: string]: any; // to allow any additional properties
}

interface IEintrittszeitraum {
  von: string; // Should be in the format 'YYYY-MM-DD'
  [key: string]: any; // to allow any additional properties
}

// Main Type
interface IJobDetailsV3ResponseProps {
  allianzpartnerName: string;
  allianzpartnerUrl: string;
  vertragsdauer: string;
  istBetreut: boolean;
  stellenangebotsart: string;
  istArbeitnehmerUeberlassung: boolean;
  arbeitszeitTeilzeitFlexibel: boolean;
  arbeitszeitTeilzeitAbend: boolean;
  arbeitszeitTeilzeitNachmittag: boolean;
  arbeitszeitTeilzeitVormittag: boolean;
  arbeitszeitVollzeit: boolean;
  arbeitszeitSchichtNachtWochenende: boolean;
  arbeitszeitHeimarbeitTelearbeit: boolean;
  arbeitgeberKundennummerHash: string;
  chiffrenummer: string;
  istPrivateArbeitsvermittlung: boolean;
  gehalt: string;
  eintrittszeitraum: IEintrittszeitraum;
  firma: string;
  istGeringfuegigeBeschaeftigung: boolean;
  hauptberuf: string;
  stellenangebotsBeschreibung: string;
  stellenangebotsTitel: string;
  istBehinderungGefordert: boolean;
  stellenlokationen: IStellenlokation[];
  veroeffentlichungszeitraum: IVeroeffentlichungszeitraum;
  referenznummer: string;
  geforderteAnlagen: string;
  anzeigeAnonym: boolean;
  externeURL: string;
  [key: string]: any; // to allow any additional properties
}

// Company Nested Properties

interface ILinks {
  url: string;
  art: string;
  [key: string]: any; // to allow any additional properties
}

// Main Company Type
interface ICompanyProps {
  firma: string;
  betriebsgroesse: string;
  beschreibung: string;
  links: ILinks[];
  socialmedialinks: ILinks[];
  gruendungsjahr: number;
  hauptsitz: string;
  mitarbeitervorteile: string[];
  mitarbeitervorteileInSteaAnzeigen: boolean;
  schlagworte: string[];
  kontaktinformationen: string;
  [key: string]: any; // to allow any additional properties
}

export type {
  IStellenlokation,
  IVeroeffentlichungszeitraum,
  IAdresse,
  IEintrittszeitraum,
  IJobDetailsV3ResponseProps,
  ILinks,
  ICompanyProps,
};
