import { rem as _rem } from 'polished';

export const rem = (size: number | `${number}px`) =>
  typeof size === 'number' ? _rem(`${size}px`) : _rem(size);
