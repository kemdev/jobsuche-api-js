interface Postadresse {
  strasse: string;
  plz: string;
  ort: string;
  region: string;
  land: string;
}

interface Name {
  vorname: string;
  nachname: string;
}

interface Telefonnummer {
  laendervorwahl: string;
  vorwahl: string;
  rufnummer: string;
}

interface Angebotskontakt {
  firma: string;
  postadresse: Postadresse;
  anrede: string;
  name: Name;
  telefonnummer: Telefonnummer;
  emailadresse: string;
}

interface ICompanyInfo {
  angebotskontakt: Angebotskontakt;
  bewerbungUeberArbeitsagenturDe: boolean;
  bewerbungPerEMail: boolean;
  bewerbungPersoenlich: boolean;
  bewerbungSchriftlich: boolean;
  bewerbungTelefonisch: boolean;
  bewerbungUeberInternet: boolean;
  urlBewerbungsformular: string;
  geforderteAnlagen: string;
}

export type { ICompanyInfo };
