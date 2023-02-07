import React from 'react';
import styled from 'styled-components';

interface Iprops {
  invalid: boolean;
  invalidText: string | undefined;
}

const ErrorMessage = ({ invalid, invalidText }: Iprops) => {
  return (
    <ErrorContainer>
      {invalid && <ErrorDescription>{invalidText}</ErrorDescription>}
    </ErrorContainer>
  );
};

export default ErrorMessage;

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ErrorDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.s};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.danger};
`;
