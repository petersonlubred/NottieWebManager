import _ from 'lodash';

import { PathType } from '@/interfaces/notification';
import { IColors } from '@/interfaces/theme';

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

export const mapMicroServiceStatus = (value: number): keyof IColors => {
  switch (value) {
    case 0:
      return 'success';
    case 1:
      return 'secondary';
    case 2:
      return 'danger';
    case 3:
      return 'grey';
    default:
      return 'grey';
  }
};

export const mapPerformance = (value: number, customColor?: string) => {
  switch (value) {
    case 0:
      return {
        background: '#171E19',
        text: '#37D263',
      };
    case 1:
      return {
        background: '#232016',
        text: '#F1C21B',
      };
    case 2:
      return {
        background: '#3B1A1A',
        text: ' #F39698',
        customColor: customColor,
      };
    case 3:
      return {
        background: '#4C4C4C',
        text: 'white',
      };
    default:
      return {
        background: '#4C4C4C',
        text: 'white',
      };
  }
};
