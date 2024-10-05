import { v4 as uuidv4 } from "uuid";
import { RecursiveObject } from "../types/jobSearchResponseTypes";
import { GroupedByRegion, IStellenlokation } from "../types";

function addUUID<T extends RecursiveObject>(obj: T): T {
  if (typeof obj !== "object" || obj === null || Buffer.isBuffer(obj)) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(addUUID) as T;
  }

  const newObj: RecursiveObject = { ...obj, uuid: uuidv4() };

  for (const key in newObj) {
    if (typeof newObj[key] === "object" && newObj[key] !== null) {
      newObj[key] = addUUID(newObj[key]);
    }
  }

  return newObj as T;
}

function offersLocations(
  jobsOfferLocations: IStellenlokation[]
): GroupedByRegion[] {
  const regionMap = jobsOfferLocations.reduce(
    (
      acc: { [region: string]: IStellenlokation[] },
      current: IStellenlokation
    ) => {
      const region = current.adresse.region;
      const regionWithoutUnderScore = region?.split('_').join("-")

      if (!acc[regionWithoutUnderScore]) {
        acc[regionWithoutUnderScore] = [];
      }

      acc[regionWithoutUnderScore].push(current);

      return acc;
    },
    {}
  );

  const result = Object.keys(regionMap).map((region) => ({
    region,
    locations: regionMap[region],
  }));

  return result;
}

export { addUUID, offersLocations };
