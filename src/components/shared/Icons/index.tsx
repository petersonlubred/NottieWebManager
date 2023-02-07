import React from 'react';

const Icon = ({
  width,
  height,
  id,
}: {
  width?: number;
  height?: number;
  id?: string;
}) => {
  return (
    <svg width={width} height={height}>
      <use xlinkHref={`/svgs/icon-sprite.svg#${id}`} />
    </svg>
  );
};

export default Icon;
