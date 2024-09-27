type OfferType = 1 | 2 | 3 | 4 | 34 | '1' | '2' | '3' | '4' | '34';
type ContractDuration = 1 | 2 | '1' | '2';

enum WorkTimeEnum {
  FULL_TIME = 'vz',
  PART_TIME = 'tz',
  SHIFT_NIGHT_WEEKEND = 'snw',
  HOME_TELEWORK = 'ho',
  MINIJOB = 'mj',
}

type WorkTime = 'vz' | 'tz' | 'snw' | 'ho' | 'mj';

/**
 * @param to be used in the function this is the english names see the documentation
 *  #:~:text=Parametern%20zu%20filtern%3A-,Filter,-Parameter%3A%20was
 */

interface IFetchJobsProps {
  /**
   * @alias was
   */
  what: string | undefined /* Freitextsuche Jobtitel (z.B. Referatsleiter). */;
  /**
   * @alias wo
   */
  where: string /* Freitextsuche Beschäftigungsort (z.B. Berlin). */;

  /**
   * @alias berufsfeld | undefined
   */
  professionalField:
    | string
    | undefined /* Freitextsuche Berufssfeld (z.B. Informatik). */;

  page: number | undefined /* Seite (beginnend mit 1). */;

  /**
   * @alias arbeitgeber
   */
  employer:
    | string
    | undefined /* ID des Arbeitgebers. z.B. "Deutsche%20Bahn%20AG" */;

  /**
   * @alias zeitarbeit
   */
  isTemporary:
    | boolean
    | undefined /* Gibt an, ob Jobs von Zeitarbeitsfirmen in die Suchergebnisse einbezogen werden sollen (default true). */;

  size: number | undefined /* Anzahl der Ergebnisse */;

  /**
   * @alias veroeffentlichtseit
   */
  publishedSince:
    | number
    | undefined /*Anzahl der Tage, seit der Job veröffentlicht wurde. Kann zwischen 0 und 100 Tagen liegen. */;

  /**
   * @alias pav
   */
  isPrivate:
    | boolean
    | undefined /* Private Arbeitsvermittlung: Gibt an, ob Jobs von privaten Arbeitsvermittlungen in die Suchergebnisse einbezogen werden sollen. */;

  /**
   * @alias angebotsart
   * @accepts numbers or string of 1 | 2 | 4 | 34
   * Angebotsart: 1=ARBEIT; 2=SELBSTAENDIGKEIT; 4=AUSBILDUNG/Duales Studium; 34=Praktikum/Trainee.
   */
  offerType: OfferType | undefined;

  /**
   * 1
   * 2
   * Befristung: 1 = befristet; 2 = unbefristet. Mehrere Semikolon-separierte Werte möglich (z.B.  befristung=1;2).
   */
  contractDuration: ContractDuration;

  /**
   * @alias umkreis (Optional)
   * Umkreis: in Kilometern von Wo-Parameter (z.B. 25 oder 200).
   */
  radius: number;

  /**
   * @alias arbeitszeit (Optional)
   * WorkTime: vz=FULL_TIME, tz=PART_TIME, snw=SHIFT_NIGHT_WEEKEND, ho=HOME_TELEWORK, mj=MINIJOB.
   * Multiple semicolon-separated values are possible (e.g., workTime=vz;tz).
   */
  workTime: WorkTime[];

  /**
   * to allow any additional properties
   */
  [key: string]: any; // to allow any additional properties
}

// Define a type that maps English aliases to corresponding keys of IFetchJobsProps
type AliasMapping = {
  what: keyof IFetchJobsProps;
  where: keyof IFetchJobsProps;
  professionalField: keyof IFetchJobsProps;
  page: keyof IFetchJobsProps;
  employer: keyof IFetchJobsProps;
  isTemporary: keyof IFetchJobsProps;
  size: keyof IFetchJobsProps;
  publishedSince: keyof IFetchJobsProps;
  isPrivate: keyof IFetchJobsProps;
  offerType: keyof IFetchJobsProps;
  contractDuration: keyof IFetchJobsProps;
  radius: keyof IFetchJobsProps;
  workTime: keyof IFetchJobsProps;
};

export { IFetchJobsProps, AliasMapping, WorkTime };
