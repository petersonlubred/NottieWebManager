import Navbar from '@/components/Navbar';
import NavbarRoute from '@/components/NavbarRoute';
import PageFooter from '@/components/PageFooter';
import PageHeader from '@/components/PageHeader';
import { px } from '@/utils';
import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <LayoutContainer>
      <Navbar />
      <NavbarRoute routename="User Management" />
      <PageHeader />
      <LayoutChildren> {children}</LayoutChildren>
      <PageFooter />
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

    .cds--checkbox-label::before {
      border: 1px solid ${({ theme }) => theme.colors.white};
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
`;
