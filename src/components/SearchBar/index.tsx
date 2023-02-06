import React from 'react';
import { Search } from '@carbon/react';
import styled from 'styled-components';
import { px } from '@/utils';

const SearchBar = () => {
  return (
    <SearchContainer>
      <Search
        className="search"
        closeButtonLabelText="Clear search input"
        defaultValue="Default value"
        id="search-playground-1"
        labelText="Label text"
        role="searchbox"
        type="text"
      />
    </SearchContainer>
  );
};

export default SearchBar;

const SearchContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  align-self: stretch;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.normalText};

  .search {
    width: 100%;
    svg {
      fill: ${({ theme }) => theme.colors.white};
    }
    input {
      width: 100%;
      height: 48px;
      background-color: ${({ theme }) => theme.colors.bgPrimary};
      color: ${({ theme }) => theme.colors.white};
      border-bottom: none;
      &:focus {
        border: none;
        outline: none;
      }
    }
  }
`;
