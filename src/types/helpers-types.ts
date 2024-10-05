import { IStellenlokation } from './jobDetailsResponseV3Types';

interface IOffersLocationsInterface {
  [region: string]: IStellenlokation[];
}

interface GroupedByRegion {
  region: string;
  locations: IStellenlokation[];
}

export type { GroupedByRegion, IOffersLocationsInterface };