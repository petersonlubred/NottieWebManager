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
      <Navbar />
      <NavbarRoute routename={routename} />
      <PageHeader
        navItem={navItem}
        selected={selected}
        handleSetIndex={handleSetIndex}
        title={title}
        subtitle={subtitle}
        isDashboard={isDashboard}
      />
      <LayoutChildren>{children}</LayoutChildren>
      {!noPagination && <PageFooter />}{' '}
    </LayoutContainer>
  );
};

export default Layout;

const LayoutContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.bgPrimaryLight};
  & > div:not(:nth-child(4)) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.darkPrimary50};
  }
`;

const LayoutChildren = styled.div`
  margin: ${px(24)};
  table {
    width: 100%;
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
