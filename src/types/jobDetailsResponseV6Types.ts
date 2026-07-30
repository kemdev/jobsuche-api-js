/* ============================================================================
 * Root Response
 * ========================================================================== */

export interface IJobDetailsV6ResponseProps {
  ergebnisliste: JobOffer[];
  maxErgebnisse: number;
  page: number;
  size: number;
  facetten: Facetten;
}

/* ============================================================================
 * Job Offer
 * ========================================================================== */

export interface JobOffer {
  stellenangebotsart: string;
  stellenangebotsTitel: string;

  quereinstiegGeeignet?: boolean;

  arbeitszeitSchichtNachtWochenende?: boolean;
  arbeitszeitTeilzeitAbend?: boolean;
  arbeitszeitTeilzeitNachmittag?: boolean;
  arbeitszeitTeilzeitVormittag?: boolean;
  arbeitszeitTeilzeitFlexibel?: boolean;
  arbeitszeitVollzeit?: boolean;

  eintrittszeitraum?: Zeitraum;

  verguetungsangabe?: string;
  artDerVerguetung?: string;
  festgehalt?: number;

  vertragsdauer?: string;
  befristungInMonaten?: number;

  istGeringfuegigeBeschaeftigung?: boolean;
  homeofficemoeglich?: boolean;

  stellenlokationen: Stellenlokation[];

  veroeffentlichungszeitraum?: Zeitraum;

  datumErsteVeroeffentlichung: string;
  aenderungsdatum?: string;

  externeURL?: string;

  hauptberuf?: string;
  alternativBeruf1?: string;
  alternativBeruf2?: string;
  alternativBeruf3?: string;

  weitereBerufe?: string[];
  alleBerufe?: string[];

  firma: string;
  arbeitgeberKundennummerHash: string;

  referenznummer: string;
}

/* ============================================================================
 * Common Objects
 * ========================================================================== */

export interface Zeitraum {
  von: string;
  bis?: string;
}

export interface Stellenlokation {
  adresse: Adresse;
  breite?: number;
  laenge?: number;
}

export interface Adresse {
  strasse?: string;
  hausnummer?: string;

  plz: string;
  ort: string;

  ortsteil?: string;

  region?: string;
  land?: string;
}

/* ============================================================================
 * Facetten
 * ========================================================================== */

export interface Facetten {
  verguetung?: Facet;

  befristung?: Facet;
  externestellenboersen?: Facet;
  behinderung?: Facet;
  berufsfeld?: Facet;
  pav?: Facet;
  topberuf?: ScoredFacet;
  arbeitsort?: Facet;
  veroeffentlichtseit?: Facet;
  weitereberufe?: Facet;
  arbeitsort_plz?: Facet;
  arbeitgeber?: Facet;
  beruf?: Facet;
  quereinstieg?: Facet;
  branche?: Facet;
  arbeitszeit?: Facet;
  eintrittsdatum?: Facet;
  zeitarbeit?: Facet;
  topberufsfeld?: ScoredFacet;

  /**
   * In case BA adds new facets.
   */
  [key: string]: Facet | ScoredFacet | undefined;
}

/* ============================================================================
 * Generic Facets
 * ========================================================================== */

export interface Facet {
  /**
   * The keys differ for every facet.
   *
   * Examples:
   * {
   *   "true": 12,
   *   "false": 20
   * }
   *
   * {
   *   "Reinigung": 22,
   *   "Hotellerie": 3
   * }
   *
   * {
   *   "14": 10,
   *   "28": 14
   * }
   */
  counts: Record<string, number>;

  maxCount: number;
}

export interface ScoredFacet extends Facet {
  /**
   * Only exists for ranking facets.
   */
  scores: Record<string, number>;
}
