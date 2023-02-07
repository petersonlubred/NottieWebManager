import { px } from '@/utils';
import React from 'react';
import styled from 'styled-components';

interface Iprops {
  content: string;
}
const SimpleModalcontent = ({ content }: Iprops) => {
  return <Paragraph>{content}</Paragraph>;
};

export default SimpleModalcontent;

const Paragraph = styled.p`
  display: flex;
  font-weight: 400;
  font-size: ${px(14)};
  line-height: ${px(20)};
`;
