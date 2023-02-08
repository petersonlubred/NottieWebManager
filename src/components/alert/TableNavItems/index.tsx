import { px } from '@/utils';
import React from 'react';
import styled from 'styled-components';
import { DatePicker, DatePickerInput, TextInput } from '@carbon/react';
import { Filter } from '@carbon/react/icons';

interface Iprops {
  filterItems: { key: string; label: string; value: string }[];
  noDateRange?: boolean;
}

const TableNavItem = ({ filterItems, noDateRange }: Iprops) => {
  return (
    <ItemContainer>
      {!noDateRange && (
        <NavItem>
          <NavItemTitle>Date Range:</NavItemTitle>
          <DatePicker
            dateFormat="m/d/Y"
            datePickerType="range"
            className="date_picker"
          >
            <DatePickerInput
              placeholder="Start date"
              id="date-picker-default-id"
              size="md"
            />
            <DatePickerInput
              placeholder="End date"
              id="date-picker-default-id"
              size="md"
            />
          </DatePicker>
        </NavItem>
      )}
      {filterItems?.map((item, index) => (
        <NavItem key={index}>
          <NavItemTitle> {item.label}:</NavItemTitle>
          <TextInput
            type="text"
            id={item?.key}
            labelText=""
            placeholder="type here"
          />
        </NavItem>
      ))}
      <IconBox>
        <Filter size={20} />
      </IconBox>
    </ItemContainer>
  );
};

export default TableNavItem;

const ItemContainer = styled.div`
  display: flex;
  justify-content: center;

  input[title='type here'] {
    width: 100px !important;
  }
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: ${px(6)};
  padding: ${px(18)};
  border-right: 1px solid ${({ theme }) => theme.colors.bgPrimaryLight};
`;

const NavItemTitle = styled.div`
  font-size: ${px(14)};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.lightText};
  line-height: ${px(18)};
  white-space: nowrap;
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${px(18)};
  background: ${({ theme }) => theme.colors.bgHover};
`;
