import React from 'react';
import styled from 'styled-components';

import { px } from '@/utils';

import Loader from '../Loader';

interface Iprops {
  content: string | JSX.Element;
  isLoading?: boolean;
}
const SimpleModalcontent = ({ content, isLoading }: Iprops) => {
  return isLoading ? <Loader /> : <Paragraph>{content}</Paragraph>;
};

export default SimpleModalcontent;

const Paragraph = styled.p`
  display: flex;
  font-weight: 400;
  font-size: ${px(14)};
  line-height: ${px(20)};
`;
