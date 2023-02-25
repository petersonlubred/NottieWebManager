import _ from 'lodash';

interface Obj {
  [key: string]: any;
}

export const pickValues = (obj: Obj) => {
  return _.pickBy(obj, (value) => {
    return !_.isUndefined(value) && !_.isNull(value) && !_.isEqual(value, '');
  });
};
