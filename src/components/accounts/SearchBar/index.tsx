import { Search } from '@carbon/react';
import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [openSearch, setOpenSearch] = useState(false);

  const handleSearchClick = () => {
    if (searchValue.length > 0) {
    }
  };

  const handleClick = () => {
    if (!openSearch) {
      setOpenSearch(true);
    } else {
      handleSearchClick && handleSearchClick();
    }
  };

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <SearchContainer openSearch={openSearch}>
      <Search
        className="search"
        closeButtonLabelText="Clear search input"
        id="search-playground-1"
        labelText=""
        role="searchbox"
        type="text"
        size="lg"
        onKeyDown={handleKeydown}
        onClick={handleClick}
        onChange={handleSearchChange}
      />
    </SearchContainer>
  );
};

export default SearchBar;

type SearchProps = { openSearch: boolean };

const SearchContainer = styled.div<SearchProps>`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.normalText};

  .search {
    position: relative;

    .cds--search-magnifier {
      position: absolute;
      left: ${({ openSearch }) => openSearch && '0'};
      right: ${({ openSearch }) => !openSearch && '50px'};
    }
    svg {
      fill: ${({ theme }) => theme.colors.white};
    }

    input {
      width: 100%;
      background-color: ${({ theme }) => theme.colors.bgPrimary} !important;
      border: none;
      outline: none;
      color: ${({ theme }) => theme.colors.white};

      &:focus,
      &:focus ~ button {
        border: none;
        outline: none;
      }

      &:focus ~ button:hover {
        background-color: ${({ theme }) => theme.colors.bgPrimary};
        border: none;
        outline: none;
      }
    }
    button {
      background-color: ${({ theme }) => theme.colors.bgPrimary};
      border: none;
      outline: none;
    }
    button:before {
      width: 0;
      border: none;
      outline: none;
    }
  }
`;
