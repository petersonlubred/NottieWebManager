import { px } from '@/utils';
import React from 'react';
import styled from 'styled-components';

type IProps = {
  routename: string;
};

const NavbarRoute = ({ routename }: IProps) => {
  return (
    <RouteContainer>
      <RouteText>{routename}</RouteText> <Slash>/</Slash>
    </RouteContainer>
  );
};

export default NavbarRoute;

const RouteContainer = styled.div`
  padding-top: ${px(15)};
  padding-bottom: ${px(15)};
  padding-left: ${px(24)};
  display: flex;
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
