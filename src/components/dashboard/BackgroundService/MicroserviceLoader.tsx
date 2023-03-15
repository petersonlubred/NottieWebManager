import React from 'react';
import styled from 'styled-components';

import { px } from '@/utils';

const MicroServiceLoader = ({ showDivider }: { showDivider: boolean }) => {
  return (
    <MonitorContainerBox>
      <MonitorFlex>
        <MonitorSpacing>
          <MicroserviceCardTitle></MicroserviceCardTitle>
          <MonitorContentBox>
            <CardBox></CardBox>
            <CardBox></CardBox>
            <CardBox></CardBox>
            <CardBox></CardBox>
            <CardBox></CardBox>
            <CardBox></CardBox>
          </MonitorContentBox>
        </MonitorSpacing>
      </MonitorFlex>
      {showDivider && <Divider />}
    </MonitorContainerBox>
  );
};

export default MicroServiceLoader;

const Divider = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  margin-bottom: ${px(16)};
`;

const MonitorContainerBox = styled.div``;

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

const CardBox = styled.div`
  background-color: #525252;
  height: 45px;
  max-width: ${px(114)};
  display: flex;
  align-items: center;
  padding: ${px(5.5)} ${px(10)};
  gap: ${px(6)};
  font-weight: 500;
`;

const MonitorFlex = styled.div`
  display: flex;
`;

const MonitorSpacing = styled.div`
  margin-right: ${px(20)};
  min-width: ${px(300)};
  max-width: ${px(300)};
  min-height: ${px(152)};
`;
