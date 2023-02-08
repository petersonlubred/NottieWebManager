import React from 'react';
import { User } from '@carbon/react/icons';
import { px } from '@/utils';
import styled from 'styled-components';

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
