import React, { useEffect } from 'react';
import styled from 'styled-components';

import PageHeader from '@/components/accounts/PageHeader';
import Navbar from '@/components/shared/Navbar';
import NavbarRoute from '@/components/shared/NavbarRoute';
import PageFooter from '@/components/shared/PageFooter';
import { ISetState } from '@/interfaces/formik.type';
import { IPageQuery } from '@/interfaces/notification';
import Seo from '@/providers/seo';
import { px } from '@/utils';

import AuthRoute from './AuthRoute';

interface Iprops {
  routename: string;
  children: React.ReactNode;
  navItem: { title: string; tabName: string }[];
  handleSetIndex: (_index: number) => void;
  title?: string;
  subtitle?: string;
  isDashboard?: boolean;
  noPagination?: boolean;
  currentTab?: any;
  setQuery?: ISetState<IPageQuery>;
  paginationData?: {
    pageNumber: number;
    pageSize: number;
    totalCount: number;
  };
}
const Layout = ({ children, routename, navItem, handleSetIndex, title, subtitle, isDashboard, noPagination, currentTab, paginationData, setQuery }: Iprops) => {
  useEffect(() => {
    handleSetIndex(navItem.findIndex((nav) => nav?.tabName === currentTab));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTab]);

  return (
    <AuthRoute>
      <LayoutContainer>
        <Seo title={routename} />
        <Navbar /> <NavbarRoute routename={routename} isDashboard={isDashboard} />{' '}
        {isDashboard && <PageHeader navItem={navItem} handleSetIndex={handleSetIndex} title={title} subtitle={subtitle} isDashboard={isDashboard} />}
        <HeaderNav>
          {navItem?.map((item, index) => (
            <HeaderNavItem
              key={index}
              selected={currentTab === item?.tabName}
              onClick={() => {
                handleSetIndex(index);
              }}
            >
              {item?.title}
            </HeaderNavItem>
          ))}
        </HeaderNav>
        <LayoutChildren>{children}</LayoutChildren>
        {!noPagination && <PageFooter paginationData={paginationData} setQuery={setQuery} />}{' '}
      </LayoutContainer>
    </AuthRoute>
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
      background-color: ${({ theme }) => theme.colors.bgPrimaryLight} !important;
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
      background-color: ${({ theme }) => theme.colors.bgPrimaryLight} !important;
      color: ${({ theme }) => theme.colors.white} !important;
      border-bottom: 1px solid ${({ theme }) => theme.colors.bgHover};t
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
  border-bottom: 1px solid ${({ selected, theme }) => (selected ? theme.colors.normalText : 'transparent')};
  font-weight: ${({ selected }) => selected && '700'};
  &:hover {
    color: ${({ theme }) => theme.colors.white};
    border-bottom: 1px solid ${({ theme }) => theme.colors.normalText};
  }
`;
