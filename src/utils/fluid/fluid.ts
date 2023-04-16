import { fluidRange } from 'polished';

import { px } from '../px/px';

export const fluid = (property: string, from: number, to: number, minScreen: number, maxScreen: number) =>
  fluidRange({ prop: property, fromSize: px(from), toSize: px(to) }, px(minScreen), px(maxScreen));

export const fluidScreen = (minScreen: number, maxScreen: number) => (property: string, from: number, to: number) =>
  fluidRange({ prop: property, fromSize: px(from), toSize: px(to) }, px(minScreen), px(maxScreen));
