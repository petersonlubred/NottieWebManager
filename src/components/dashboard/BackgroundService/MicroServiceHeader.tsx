import React from 'react';
import styled from 'styled-components';

import Icon from '@/components/shared/Icons';
import { px } from '@/utils';

import { TextIcon } from './MicroService';

const MicroServiceheader = ({
  totalHeartbeatCount,
}: {
  totalHeartbeatCount?: {
    ok: number;
    check: number;
    critical: number;
    idle: number;
  };
}) => {
  return (
    <Header>
      <MicroServiceHeader>
        <MicroServiceHeaderTitle>Microservice hearbeat</MicroServiceHeaderTitle>
      </MicroServiceHeader>
      <MicroServiceStatusContainer>
        <MicroServiceStatus>
          <StatusBox>
            <TextIcon>
              <Box color="#157532" />
              Ok
            </TextIcon>
            <Statusparagraph>{totalHeartbeatCount?.ok ?? 0}</Statusparagraph>
          </StatusBox>
          <StatusBox>
            <TextIcon>
              <Box color="#F2B301" />
              Check
            </TextIcon>
            <Statusparagraph>{totalHeartbeatCount?.check ?? 0}</Statusparagraph>
          </StatusBox>
          <StatusBox>
            <TextIcon>
              <Box color="#4C4C4C" />
              Idle
            </TextIcon>
            <Statusparagraph>{totalHeartbeatCount?.idle ?? 0}</Statusparagraph>
          </StatusBox>
          <StatusBox>
            <TextIcon>
              <Box color="#C51C24" />
              Critical
            </TextIcon>
            <Statusparagraph>{totalHeartbeatCount?.critical ?? 0}</Statusparagraph>
          </StatusBox>
        </MicroServiceStatus>
        <MicroServiceStatus>
          <TextIcon>
            <Icon id="crawler-icon" width={16} height={16} />
            Crawler
          </TextIcon>
          <TextIcon>
            <Icon id="dotted-cube-icon" width={16} height={16} /> Micro Service
          </TextIcon>
        </MicroServiceStatus>
      </MicroServiceStatusContainer>
    </Header>
  );
};

export default MicroServiceheader;

const Header = styled.div`
  grid-column: 1/4;
  padding: ${px(10)} ${px(20)};
  margin-bottom: ${px(20)};
`;
const MicroServiceHeader = styled.div`
  width: 100%;
  margin-bottom: ${px(20)};
`;
const MicroServiceHeaderTitle = styled.p`
  font-size: ${px(20)};
  line-height: ${px(28)};
  font-weight: 400;
`;

const MicroServiceStatusContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const MicroServiceStatus = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${px(30)};
`;

const Statusparagraph = styled.div`
  font-size: ${px(20)};
  line-height: ${px(28)};
`;

const StatusBox = styled.div``;

export const Box = styled.div<{ color: string }>`
  width: ${px(8)};
  height: ${px(6)};
  background-color: ${(props) => props.color};
`;
