import { DatePicker, DatePickerInput, TextInput } from '@carbon/react';
import { Filter } from '@carbon/react/icons';
import moment from 'moment';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import { IPageQuery } from '@/interfaces/notification';
import { px } from '@/utils';

interface Iprops {
  filterItems: { key: string; label: string; value: string }[];
  noDateRange?: boolean;
  setStart?: React.Dispatch<React.SetStateAction<string>>;
  setEnd?: React.Dispatch<React.SetStateAction<string>>;
  startDate?: string;
  endDate?: string;
  setQuery?: React.Dispatch<React.SetStateAction<IPageQuery>>;
  query?: IPageQuery;
}

const TableNavItem = ({ filterItems, noDateRange, setStart, setEnd, startDate, endDate, setQuery, query }: Iprops) => {
  const [date, setDate] = React.useState([startDate, endDate]);
  const [max, setMax] = React.useState(new Date());

  useEffect(() => {
    setDate([startDate, endDate]);
  }, [endDate, startDate]);

  return (
    <ItemContainer>
      {!noDateRange && (
        <NavItem>
          <NavItemTitle>Date Range:</NavItemTitle>
          <DatePicker
            dateFormat="d/m/Y"
            datePickerType="range"
            className="date_picker"
            value={date}
            onChange={(e: Date[]) => {
              setStart && setStart(moment(e[0]).format('YYYY-MM-DD'));
              setEnd && setEnd(moment(e[1]).format('YYYY-MM-DD'));
              setMax(new Date(e[1]));
            }}
            maxDate={max.toString()}
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
            value={query ? query[item.key as keyof IPageQuery] : ''}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setQuery &&
                setQuery({
                  ...query,
                  pageNumber: 1,
                  pageSize: 10,
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
