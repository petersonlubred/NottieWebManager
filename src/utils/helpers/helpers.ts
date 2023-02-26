import _ from 'lodash';

export const pickValues = <T extends Record<string, any>>(obj: T): Partial<T> => {
  const pickedObj: Partial<T> = {};
  for (const key in obj) {
    if (!_.isUndefined(obj[key]) && !_.isNull(obj[key]) && !_.isEqual(obj[key], '')) {
      pickedObj[key] = obj[key];
    }
  }
  return pickedObj;
};
