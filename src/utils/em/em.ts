import { em as _em } from 'polished';

export const em = (size: number | `${number}px`) => (typeof size === 'number' ? _em(`${size}px`) : _em(size));
