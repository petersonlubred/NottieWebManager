import React from 'react';
import styled from 'styled-components';

import { px } from '@/utils';

import Icon from '../../shared/Icons';

const MicroService = ({ heading }: { heading: string }) => {
  return (
    <MonitorContainerBox>
      <MicroserviceCardTitle>{heading}</MicroserviceCardTitle>
      <MonitorContentBox>
        <CardBox tone={'success'}>
          <CircleBox>
            <Icon id="dotted-cube-icon" h={20} w={20} />
          </CircleBox>
          <Icon id="clock-icon" width={12} height={11} /> 5 min
        </CardBox>
        <CardBox tone={'secondary'}>
          <CircleBox>
            <Icon id="crawler-icon" h={20} w={20} />
          </CircleBox>
          <Icon id="clock-icon" width={12} height={11} />5 min
        </CardBox>
        <CardBox tone={'danger'}>
          <Icon id="clock-icon" width={12} height={11} />5 min
        </CardBox>
      </MonitorContentBox>
    </MonitorContainerBox>
  );
};

export default MicroService;

const MonitorContainerBox = styled.div`
  width: 100%;
`;

const MonitorContentBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding-bottom: ${px(16)};
  background: ${({ theme }) => theme.colors.bgPrimary};
  gap: ${px(10)};
`;

const MicroserviceCardTitle = styled.div`
  height: ${px(26)};
  background: ${({ theme }) => theme.colors.bgPrimaryLight};
  text-align: center;
  justify-content: center;
  margin-bottom: ${px(10)};
  display: flex;
  align-items: center;
  font-size: ${px(16)};
  font-weight: 500;
  line-height: ${px(21)};
`;

export const TextIcon = styled.div`
  display: flex;
  align-items: center;
  gap: ${px(6)};
`;

export const Box = styled.div<{ color: string }>`
  width: ${px(8)};
  height: ${px(6)};
  background-color: ${(props) => props.color};
`;

const CircleBox = styled.div`
  width: ${px(34)};
  height: ${px(34)};
  border-radius: 50%;
  background-color: rgba(38, 38, 38, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardBox = styled.div<{ tone: string }>`
  background-color: ${({ theme, tone }) => theme.colors[tone]};
  height: 45px;
  min-width: ${px(114)};
  display: flex;
  align-items: center;
  padding: ${px(5.5)} ${px(10)};
  gap: ${px(6)};
  font-weight: 500;
`;
