import { Select, SelectItem } from 'carbon-components-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { setIntervals, setNumber } from '@/redux/slices/dashboard';
import { RootState } from '@/redux/store';
import { intervals, number, px } from '@/utils';

type IProps = {
  routename: string;
  isDashboard?: boolean;
};

const NavbarRoute = ({ routename, isDashboard = false }: IProps) => {
  const dispatch = useDispatch();
  const { number: dashboardNumber, intervals: dashboardIntervals } = useSelector((state: RootState) => state.dashboardReducer);
  return (
    <NavBarContainer>
      <RouteContainer>
        <RouteText>{routename}</RouteText> <Slash>/</Slash>
      </RouteContainer>
      {isDashboard && (
        <SelectContainer>
          <Select
            id="select-intervals"
            hideLabel={true}
            defaultValue={dashboardIntervals}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              dispatch(setIntervals(event.target.value));
            }}
          >
            <SelectItem value="" text="Choose Interval" />
            {intervals.map((interval) => (
              <SelectItem key={interval} text={interval} value={interval} />
            ))}
          </Select>

          <Select
            id="select-number"
            hideLabel={true}
            defaultValue={dashboardNumber}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              dispatch(setNumber(event.target.value));
            }}
          >
            <SelectItem value="" text="Choose number" />
            {number.map((numb) => (
              <SelectItem key={numb} text={numb} value={numb} />
            ))}
          </Select>
        </SelectContainer>
      )}
    </NavBarContainer>
  );
};

export default NavbarRoute;

const RouteContainer = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.bgPrimary};
  align-items: center;
`;
const NavBarContainer = styled.div`
  padding-top: ${px(15)};
  padding-bottom: ${px(15)};
  padding-left: ${px(24)};
  display: flex;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.bgPrimary};
  align-items: center;
`;

const SelectContainer = styled.div`
  padding-left: ${px(24)};
  display: flex;
  gap: ${px(12)};
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.bgPrimary};
  align-items: center;
`;

const RouteText = styled.div`
  font-size: ${px(14)};
  line-height: ${px(18)};
  padding-right: ${px(8)};
  color: ${({ theme }) => theme.colors.normalText};
  font-weight: 400;
  cursor: pointer;
`;

const Slash = styled.div`
  font-size: ${px(14)};
  line-height: ${px(18)};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 400;
`;
