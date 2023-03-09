import styled from 'styled-components';

import { px } from '@/utils';

type AccessDotProps = {
  active: 'pending' | 'delivered' | 'undelivered' | 'unknown' | 'rejected';
};

const AccessStatus = ({ active }: AccessDotProps) => {
  return (
    <AccessStatusContainer>
      <AccessDot active={active} />
      <AccessStatusText>{active}</AccessStatusText>
    </AccessStatusContainer>
  );
};

export default AccessStatus;

const AccessStatusContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${px(8)};
`;

const AccessDot = styled.div<AccessDotProps>`
  width: ${px(7)};
  height: ${px(7)};
  border-radius: 50%;
  background-color: ${({ active }) =>
    active === 'pending' ? '#4589FF' : active === 'delivered' ? '#42BE65' : active === 'undelivered' ? '#FFC010' : active === 'rejected' ? '#FA4D56' : '#C6C6C6'};
`;

const AccessStatusText = styled.p`
  font-size: ${px(14)};
  line-height: ${px(18)};
`;
