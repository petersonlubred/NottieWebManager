import styled from 'styled-components';

import Button from '../Button';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: auto;
  margin-top: 120px;
  button {
    padding: calc(0.875rem - 4px) 27px calc(0.875rem - 4px) 15px !important;
  }
`;

const ErrorIcon = styled.svg`
  width: 130px;
  height: 130px;
  fill: currentColor;
  &.fill-error {
    fill: red;
  }
`;

const ErrorMessage = styled.p`
  font-size: 2rem;
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.white};
`;

const ErrorDescription = styled.p`
  margin-top: 4px;
  color: ${({ theme }) => theme.colors.white};
  width: 500px;
`;

const ReloadButton = styled(Button)`
  margin-top: 20px;
`;

const ErrorFallback = ({ message }: { message?: string }) => {
  const handleReload = () => window.location.reload();

  return (
    <ErrorContainer>
      <ErrorIcon viewBox="0 0 130 130" className="fill-error">
        <path d="M129.429 122.04L69.8476 2.87696C68.0061 -0.795412 61.9938 -0.795412 60.152 2.87696L0.570974 122.04C-0.268664 123.719 -0.176499 125.712 0.809384 127.31C1.8006 128.902 3.53929 129.877 5.41889 129.877H124.581C126.461 129.877 128.2 128.902 129.191 127.31C130.176 125.712 130.268 123.719 129.429 122.04ZM65 108.211C62.0101 108.211 59.5836 105.785 59.5836 102.795C59.5836 99.8051 62.0101 97.3786 65 97.3786C67.9899 97.3786 70.4164 99.8051 70.4164 102.795C70.4164 105.785 67.9899 108.211 65 108.211ZM70.4164 86.5453C70.4164 89.5352 67.9952 91.9617 65 91.9617C62.0047 91.9617 59.5836 89.5352 59.5836 86.5453V48.63C59.5836 45.6401 62.0047 43.2136 65 43.2136C67.9952 43.2136 70.4164 45.6401 70.4164 48.63V86.5453Z" />
      </ErrorIcon>
      <ErrorMessage>Something went wrong</ErrorMessage>
      <ErrorDescription>{message}</ErrorDescription>
      <ReloadButton renderIcon={null} handleClick={handleReload} buttonLabel="Reload Page" />
    </ErrorContainer>
  );
};

export default ErrorFallback;
