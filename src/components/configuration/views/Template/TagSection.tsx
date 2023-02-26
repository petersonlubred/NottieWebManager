import { px } from '@/utils';
import React from 'react';
import styled from 'styled-components';
import { Search, Hashtag } from '@carbon/react/icons';

const TagSection = () => {
  return (
    <Container>
      <TagHeader>
        <TagParagraph>
          <Hashtag />
          Tags
        </TagParagraph>
        <Search size={16} />
      </TagHeader>
      <TagContent>
        <TagContentParagraph>*|FNAME|*</TagContentParagraph>
        <TagContentParagraph>The first name of the user </TagContentParagraph>
      </TagContent>
      <TagContent>
        <TagContentParagraph>*|FNAME|*</TagContentParagraph>
        <TagContentParagraph>The first name of the user </TagContentParagraph>
      </TagContent>
    </Container>
  );
};

export default TagSection;

const Container = styled.div`
  width: 20% !important;
  color: ${({ theme }) => theme.colors.white};
  min-height: calc(100vh - 300px);
  background-color: ${({ theme }) => theme.colors.tagBackground};
  border-left: 1px solid ${({ theme }) => theme.colors.borderLight};
`;

const TagHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${px(16)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  button {
    padding: calc(0.875rem - 4px) 33px calc(0.875rem - 3px) 15px !important;
  }
`;

const TagParagraph = styled.p`
  font-size: ${px(16)};
  font-weight: 400;
  line-height: ${px(28)};
  display: flex;
  align-items: center;

  svg {
    fill: ${({ theme }) => theme.colors.bgHover};
    margin-right: ${px(8)};
  }
`;

const TagContent = styled.div`
  margin: 0 ${px(16)};
  padding: ${px(16)} 0;
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  }
`;

const TagContentParagraph = styled.p`
  font-size: ${px(16)};
  font-weight: 400;
`;
