import { DatePicker, DatePickerInput, TextInput } from '@carbon/react';
import { Filter } from '@carbon/react/icons';
import moment from 'moment';
import React from 'react';
import styled from 'styled-components';

import { px } from '@/utils';

interface Iprops {
  filterItems: { key: string; label: string; value: string }[];
  setFilterData?: React.Dispatch<
    React.SetStateAction<{
      [key: string]: unknown;
    }>
  >;
  filterData?: { [key: string]: any[] };
  noDateRange?: boolean;
  setStart?: React.Dispatch<React.SetStateAction<string>>;
  setEnd?: React.Dispatch<React.SetStateAction<string>>;
  startDate?: string;
}

const TableNavItem = ({ filterItems, noDateRange, setStart, setEnd, startDate, setFilterData, filterData }: Iprops) => {
  return (
    <ItemContainer>
      {!noDateRange && (
        <NavItem>
          <NavItemTitle>Date Range:</NavItemTitle>
          <DatePicker
            dateFormat="d/m/Y"
            datePickerType="range"
            className="date_picker"
            onChange={(e: Date[]) => {
              setStart && setStart(moment(e[0]).format('YYYY-MM-DD'));
              setEnd && setEnd(moment(e[1]).format('YYYY-MM-DD'));
            }}
            maxDate={moment(startDate).endOf('month').format('DD/MM/YYYY')}
          >
            <DatePickerInput placeholder="Start date" id="date-picker-default-id" size="md" labelText="" />
            <DatePickerInput placeholder="End date" id="date-picker-default-id" size="md" labelText="" />
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
            value={filterData ? filterData[item.key] : ''}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setFilterData &&
                setFilterData({
                  ...filterData,
                  [item.key]: event.target.value,
                });
            }}
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
