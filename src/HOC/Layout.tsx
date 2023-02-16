import PageHeader from '@/components/accounts/PageHeader';
import Navbar from '@/components/shared/Navbar';
import NavbarRoute from '@/components/shared/NavbarRoute';
import PageFooter from '@/components/shared/PageFooter';
import { px } from '@/utils';
import React from 'react';
import styled from 'styled-components';

interface Iprops {
  routename: string;
  children: React.ReactNode;
  navItem: { title: string }[];
  selected?: number;
  handleSetIndex?: Function;
  title?: string;
  subtitle?: string;
  isDashboard?: boolean;
  noPagination?: boolean;
}
const Layout = ({
  children,
  routename,
  navItem,
  selected,
  handleSetIndex,
  title,
  subtitle,
  isDashboard,
  noPagination,
}: Iprops) => {
  return (
    <LayoutContainer>
      <Navbar /> <NavbarRoute routename={routename} />{' '}
      <PageHeader
        navItem={navItem}
        selected={selected}
        handleSetIndex={handleSetIndex}
        title={title}
        subtitle={subtitle}
        isDashboard={isDashboard}
      />{' '}
      <HeaderNav>
        {navItem?.map((item, index) => (
          <HeaderNavItem
            key={index}
            selected={selected === index}
            onClick={() => handleSetIndex && handleSetIndex(index)}
          >
            {item?.title}
          </HeaderNavItem>
        ))}
      </HeaderNav>
      <LayoutChildren>{children}</LayoutChildren>
      {!noPagination && <PageFooter />}{' '}
    </LayoutContainer>
  );
};

export default Layout;

const LayoutContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.bgPrimaryLight};
  & > div:not(:nth-child(n + 3)) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.darkPrimary50};
  }
`;

const LayoutChildren = styled.div`
  margin: ${px(24)};
  padding-bottom: ${px(50)};
  section.cds--table-toolbar {
    position: sticky;
    top: 95px;
  }

  .cds--data-table-content {
    position: relative;
    max-height: calc(100vh - 200px);
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  table {
    width: 100%;

    thead {
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    thead,
    th {
      background-color: ${({ theme }) =>
        theme.colors.bgPrimaryLight} !important;
      color: ${({ theme }) => theme.colors.white};
    }

    td {
      background-color: ${({ theme }) => theme.colors.bgPrimary};
      color: ${({ theme }) => theme.colors.white};
      border-top: 1px solid ${({ theme }) => theme.colors.darkPrimary50};
      border-bottom: 1px solid ${({ theme }) => theme.colors.darkPrimary50};
    }

    tr:hover td {
      background-color: ${({ theme }) => theme.colors.bgPrimaryLight};
      color: ${({ theme }) => theme.colors.white};
      border-top: 1px solid ${({ theme }) => theme.colors.bgHover};
      border-bottom: 1px solid ${({ theme }) => theme.colors.bgHover};
    }

    .cds--data-table--selected td,
    .cds--data-table--selected:hover td {
      background-color: ${({ theme }) =>
        theme.colors.bgPrimaryLight} !important;
      color: ${({ theme }) => theme.colors.white} !important;
      border-bottom: 1px solid ${({ theme }) => theme.colors.bgHover};t
    }

    td:last-child,
    td:last-child > div {
      padding: 0;
    }
  }

  .transparent-button {
    background-color: transparent;
    color: ${({ theme }) => theme.colors.white} !important;
    border: 1px solid ${({ theme }) => theme.colors.white} !important;
    margin-left: ${px(1)};
  }
`;

const HeaderNav = styled.div`
  background-color: ${({ theme }) => theme.colors.bgPrimary};
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  width: 100%;
  height: ${px(48)};
  position: sticky;
  top: 50px;
  z-index: 5;
  padding-left: ${px(24)};
  padding-right: ${px(24)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
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
    font-weight: 700;
    color: ${({ theme }) => theme.colors.white};
  }
`;
