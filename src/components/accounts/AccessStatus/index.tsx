import styled from 'styled-components';

import { px } from '@/utils';

type AccessDotProps = {
  active: boolean;
};

const AccessStatus = ({ active }: AccessDotProps) => {
  return (
    <AccessStatusContainer>
      <AccessDot active={active} />
      <AccessStatusText>{active ? 'Activated' : 'Inactive'}</AccessStatusText>
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
  background-color: ${(props) => (props.active ? '#24A148' : '#FA4D56')};
`;

const AccessStatusText = styled.p`
  font-size: ${px(14)};
  line-height: ${px(18)};
`;
