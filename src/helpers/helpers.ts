import { v4 as uuidv4 } from 'uuid';
import { RecursiveObject } from '../types/jobSearchResponseTypes';

function addUUID<T extends RecursiveObject>(obj: T): T {
  if (typeof obj !== 'object' || obj === null || Buffer.isBuffer(obj)) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(addUUID) as T;
  }

  const newObj: RecursiveObject = { ...obj, uuid: uuidv4() };

  for (const key in newObj) {
    if (typeof newObj[key] === 'object' && newObj[key] !== null) {
      newObj[key] = addUUID(newObj[key]);
    }
  }

  return newObj as T;
}

export { addUUID };
