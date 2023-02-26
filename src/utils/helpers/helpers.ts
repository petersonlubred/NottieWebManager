import _ from 'lodash';

export const pickValues = (obj: any): any => {
  return _.pickBy(obj, (value) => {
    return !_.isUndefined(value) && !_.isNull(value) && !_.isEqual(value, '');
  });
};
