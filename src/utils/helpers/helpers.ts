import _ from 'lodash';

import { PathType } from '@/interfaces/notification';

export const pickValues = <T extends Record<string, any>>(obj: T): Partial<T> => {
  const pickedObj: Partial<T> = {};
  for (const key in obj) {
    if (!_.isUndefined(obj[key]) && !_.isNull(obj[key]) && !_.isEqual(obj[key], '')) {
      pickedObj[key] = obj[key];
    }
  }
  return pickedObj;
};

export const getExtraPath = (extraPath?: string | string[]): string => {
  if (typeof extraPath === 'string') {
    return extraPath;
  } else if (Array.isArray(extraPath)) {
    return extraPath.join('/');
  } else {
    return '';
  }
};

export const getPath = (data: PathType): string => {
  const validPath = pickValues(data);
  return Object.values(validPath).join('/');
};
