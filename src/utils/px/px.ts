export const px = (size: number | `${number}px`) => (typeof size === 'number' ? `${size}px` : size)
