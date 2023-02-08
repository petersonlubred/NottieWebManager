import { px } from '@/utils';
import React, { useState } from 'react';
import styled from 'styled-components';

interface Iprops {
  navItem?: string[];
  selected?: number;
  handleSetIndex?: Function;
  title?: string;
  subtitle?: string;
}

const PageHeader = ({
  navItem,
  selected,
  handleSetIndex,
  title,
  subtitle,
}: Iprops) => {
  return (
    <HeaderContainer>
      <HeaderTitle>{title}</HeaderTitle>
      <HeaderDescription>{subtitle}.</HeaderDescription>
      <HeaderNav>
        {navItem?.map((item, index) => (
          <HeaderNavItem
            key={index}
            selected={selected === index}
            onClick={() => handleSetIndex && handleSetIndex(index)}
          >
            {item}
          </HeaderNavItem>
        ))}
      </HeaderNav>
    </HeaderContainer>
  );
};

export default PageHeader;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-left: ${px(24)};
  padding-top: ${px(21)};
  flex-direction: column;
  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.bgPrimary};
`;

const HeaderTitle = styled.h1`
  font-size: ${px(26)};
  line-height: ${px(34)};
  font-weight: 400;
  margin: 0;
  margin-bottom: ${px(16)};
`;

const HeaderDescription = styled.p`
  font-size: ${px(16)};
  line-height: ${px(24)};
  font-weight: 400;
  margin: 0;
  margin-bottom: ${px(36)};
  color: ${({ theme }) => theme.colors.lightText};
`;

const HeaderNav = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: ${px(48)};
`;

type HeaderNavItemProps = { selected: boolean };

const HeaderNavItem = styled.div<HeaderNavItemProps>`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: ${px(15)};
  color: ${({ selected, theme }) => !selected && theme.colors.lightText};
  transition: all 0.1s ease-in;
  border-bottom: 1px solid
    ${({ selected, theme }) =>
      selected ? theme.colors.normalText : 'transparent'};
  font-weight: ${({ selected }) => selected && '700'};
  &:hover {
    border-bottom: 1px solid ${({ theme }) => theme.colors.normalText};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.white};
  }
`;
