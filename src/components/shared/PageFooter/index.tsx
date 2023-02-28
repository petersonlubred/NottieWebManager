import { Pagination } from '@carbon/react';
import React from 'react';
import styled from 'styled-components';

const PageFooter = () => {
  return (
    <FooterContainer>
      <Pagination
        className="pagination"
        backwardText="Previous page"
        forwardText="Next page"
        itemsPerPageText="Items per page:"
        page={1}
        pageNumberText="Page Number"
        pageSize={10}
        pageSizes={[10, 20, 30, 40, 50]}
        totalItems={103}
      />
    </FooterContainer>
  );
};

export default PageFooter;

const FooterContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;

  .pagination {
    background-color: ${({ theme }) => theme.colors.bgPrimary};
    border-top: 1px solid ${({ theme }) => theme.colors.darkPrimary50};
    color: ${({ theme }) => theme.colors.white};

    & > div {
      border: none;

      span:nth-child(3) {
        color: ${({ theme }) => theme.colors.lightText};
      }

      span:nth-child(2) {
        color: ${({ theme }) => theme.colors.white};
      }

      select {
        color: ${({ theme }) => theme.colors.white} !important;
        background-color: ${({ theme }) => theme.colors.bgPrimary} !important;
        border: none !important;
        &:focus,
        &:active,
        &:hover {
          outline: none;
          background-color: ${({ theme }) => theme.colors.bgPrimary};
        }
      }

      #cds-pagination-select-id-10-right {
        border-left: 1px solid ${({ theme }) => theme.colors.darkPrimary50} !important;
      }
      #cds-pagination-select-id-10 {
        border-right: 1px solid ${({ theme }) => theme.colors.darkPrimary50} !important;
      }

      .cds--select-input:focus {
        outline: none;
        background-color: ${({ theme }) => theme.colors.bgPrimary};
      }

      svg {
        fill: ${({ theme }) => theme.colors.white};
      }

      button {
        border-left: 1px solid ${({ theme }) => theme.colors.darkPrimary50};
        &:focus,
        &:hover {
          outline: none;
          border: none;
          background-color: ${({ theme }) => theme.colors.bgPrimary};
        }
      }
    }
  }
`;
