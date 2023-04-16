import React from 'react';

const Icon = ({ width, height, h, w, id }: { width?: number; w?: number; height?: number; h?: number; id?: string }) => {
  return (
    <svg width={width || w} height={height || h}>
      <use xlinkHref={`/svgs/icon-sprite.svg#${id}`} />
    </svg>
  );
};

export default Icon;
