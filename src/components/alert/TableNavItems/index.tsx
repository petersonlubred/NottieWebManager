import { DatePicker, DatePickerInput, TextInput } from '@carbon/react';
import { Filter } from '@carbon/react/icons';
import dayjs from 'dayjs';
import React from 'react';
import { BsToggleOff, BsToggleOn } from 'react-icons/bs';
import styled from 'styled-components';

import { IPageQuery } from '@/interfaces/notification';
import { px } from '@/utils';

interface Iprops {
  filterItems: { key: string; label: string; value: string }[];
  noDateRange?: boolean;
  setStart?: React.Dispatch<React.SetStateAction<string | undefined>>;
  setEnd?: React.Dispatch<React.SetStateAction<string | undefined>>;
  startDate?: string;
  endDate?: string;
  setQuery?: React.Dispatch<React.SetStateAction<IPageQuery>>;
  query?: IPageQuery;
  renderDate?: boolean;
  notArchive?: boolean;
  setNotArchive?: React.Dispatch<React.SetStateAction<boolean>>;
  displayToday?: boolean;
}

const TableNavItem = ({ filterItems, noDateRange, setStart, setEnd, startDate, endDate, setQuery, query, renderDate, notArchive, setNotArchive, displayToday }: Iprops) => {
  return (
    <ItemContainer>
      {displayToday && (
        <NavItem>
          <NavItemTitle>Today</NavItemTitle>
          {notArchive ? (
            <BsToggleOn
              size={25}
              onClick={() => {
                setNotArchive && setNotArchive(false);
                setQuery &&
                  setQuery({
                    ...query,
                    pageNumber: 1,
                    pageSize: 10,
                    notArchive: false,
                  });
              }}
            />
          ) : (
            <BsToggleOff
              size={25}
              onClick={() => {
                setNotArchive && setNotArchive(true);
                setQuery &&
                  setQuery({
                    ...query,
                    pageNumber: 1,
                    pageSize: 10,
                    notArchive: true,
                  });
              }}
            />
          )}
        </NavItem>
      )}
      {!noDateRange && (
        <NavItem>
          <NavItemTitle>Date Range:</NavItemTitle>
          <DatePicker
            key={renderDate}
            dateFormat="d/m/Y"
            datePickerType="range"
            className="date_picker"
            value={[startDate && dayjs(startDate).toString(), endDate && dayjs(endDate).toString()]}
            onChange={(value: Date[]) => {
              setStart && setStart(dayjs(value[0]).format('YYYY-MM-DD'));
              setEnd && setEnd(value[1] ? dayjs(value[1]).format('YYYY-MM-DD') : undefined);
            }}
            maxDate={dayjs(startDate).endOf('month').toString()}
          >
            <DatePickerInput placeholder="Start date" id="date-picker-default-id" size="md" labelText="" />
            <DatePickerInput placeholder="End date" id="date-picker-default-id-2" size="md" labelText="" />
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
    width: 200px !important;
  }
  #date-picker-default-id {
    width: 150px !important;
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
