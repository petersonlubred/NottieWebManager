import { px } from '@/utils';
import React from 'react';
import styled from 'styled-components';
import { Add } from '@carbon/react/icons';
import Button from '../Button';
import SearchBar from '../SearchBar';

type PropType = {
  buttonLabel: string;
};

const PageSubHeader = ({ buttonLabel }: PropType) => {
  return (
    <PageSubHeaderContainer>
      <Paragraph>User accounts</Paragraph>
      <SearchSection>
        <SearchBar />
        <Button
          renderIcon={(props: any) => <Add size={24} {...props} />}
          buttonLabel={buttonLabel}
          disabled={false}
        />
      </SearchSection>
    </PageSubHeaderContainer>
  );
};

export default PageSubHeader;

const PageSubHeaderContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.bgPrimary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.darkPrimary50};
`;

const Paragraph = styled.p`
  font-family: ${({ theme }) => theme.fontFamilies.heading};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.l};
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  line-height: ${px(28)};
  padding: ${px(16)};
  padding-bottom: ${px(24)};
`;

const SearchSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
