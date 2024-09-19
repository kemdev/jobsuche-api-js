interface JobOffer {
  title: string;
  hashId: string;
  beruf: string;
  refnr: string;
  arbeitgeber: string;
  aktuelleVeroeffentlichungsdatum: string; // Assuming this is a date string
  eintrittsdatum: string; // Assuming this can be an empty object or have dynamic properties
  arbeitsort: Arbeitsort;
  modifikationsTimestamp: string;
  kundennummerHash: string;
}

// Define the structure for coordinates
interface Coordinates {
  lat: number;
  lon: number;
}

// Define the structure for Arbeitsort
interface Arbeitsort {
  land: string;
  region: string;
  plz: number;
  ort: string;
  strasse: string;
  koordinaten: Coordinates;
}

// Define the structure for counts
interface Counts {
  [key: string]: number; // Assuming the counts object has key-value pairs where key is a string and value is a number
}

// Define the structure for Facet counts and maxCount
interface Facet {
  counts: Counts;
  maxCount: number;
}

interface Facets {
  befristung: Facet;
  behinderung: Facet;
  pav: Facet;
  berufsfeld: Facet;
  arbeitsort: Facet;
  ausbildungsart: Facet;
  veroeffentlichtseit: Facet;
  schulbildung: Facet;
  arbeitsort_plz: Facet;
  arbeitgeber: Facet;
  beruf: Facet;
  branche: Facet;
  arbeitszeit: Facet;
  eintrittsdatum: Facet;
  zeitarbeit: Facet;
  corona: Facet;
}

// Define the main JobSearchResponse structure
interface JobSearchResponse {
  stellenangebote: JobOffer[];
  maxErgebnisse: string;
  page: number;
  size: number;
  facetten: Facets[];
}

type RecursiveObject = { [key: string]: any } | any[];

export {
  JobOffer,
  Coordinates,
  Arbeitsort,
  Counts,
  Facet,
  Facets,
  JobSearchResponse,
  RecursiveObject,
};
