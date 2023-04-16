import { User } from '@carbon/icons-react';
import React from 'react';
import styled from 'styled-components';

import { px } from '@/utils';

const IconAndText = ({ text }: { text: string }) => {
  return (
    <IconTextContainer>
      <User size={20} />
      <Paragraph>{text}</Paragraph>
    </IconTextContainer>
  );
};

export default IconAndText;

const IconTextContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${px(6)};
`;

const Paragraph = styled.p`
  display: flex;
  font-weight: 400;
  font-size: ${px(14)};
  line-height: ${px(18)};
`;
