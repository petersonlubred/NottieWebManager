import React from 'react';
import { Loading } from '@carbon/react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <LoaderContainer>
      <Loading description="Active loading indicator" className="loader" />
    </LoaderContainer>
  );
};

export default Loader;

const LoaderContainer = styled.div`
  .cds--loading__stroke {
    stroke: ${({ theme }) => theme.colors.normalText};
  }
  .cds--loading__svg {
    fill: transparent;
  }
`;