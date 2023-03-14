import React from 'react';
import styled from 'styled-components';

import { IDashboardBackgroundServiceMicroServices } from '@/interfaces/dashboard';
import { px } from '@/utils';

import Icon from '../../shared/Icons';

const MicroService = ({
  data,
  showDivider,
  innerRef,
}: {
  data: IDashboardBackgroundServiceMicroServices;
  showDivider: boolean;
  // eslint-disable-next-line no-unused-vars
  innerRef: ((element?: HTMLElement | null | undefined) => void) | null;
}) => {
  const mapStatus = (value: number) => {
    switch (value) {
      case 0:
        return 'success';
      case 1:
        return 'secondary';
      case 2:
        return 'danger';
      case 3:
        return 'grey';
      default:
        return 'grey';
    }
  };
  return (
    <MonitorContainerBox>
      <MonitorFlex>
        <MonitorSpacing>
          <MicroserviceCardTitle>{data?.serviceType}</MicroserviceCardTitle>
          <MonitorContentBox>
            {data?.sourceMicroservices.map((microService) => (
              <CardBox key={microService.microserviceId} tone={mapStatus(microService.performanceStatus)}>
                <CircleBox>
                  <Icon id="dotted-cube-icon" h={20} w={20} />
                </CircleBox>
                <Icon id="clock-icon" width={12} height={11} /> {microService.lapse}
              </CardBox>
            ))}
          </MonitorContentBox>
        </MonitorSpacing>
        <MonitorSpacing>
          <MicroserviceCardTitle>{data?.serviceType} SMS</MicroserviceCardTitle>
          <MonitorContentBox>
            {data?.smsMicroservices.map((microService) => (
              <CardBox key={microService.microserviceId} tone={mapStatus(microService.performanceStatus)}>
                <CircleBox>
                  <Icon id="dotted-cube-icon" h={20} w={20} />
                </CircleBox>
                <Icon id="clock-icon" width={12} height={11} /> {microService.lapse}
              </CardBox>
            ))}
          </MonitorContentBox>
        </MonitorSpacing>
        <MonitorSpacing ref={innerRef}>
          <MicroserviceCardTitle>{data?.serviceType} Email</MicroserviceCardTitle>
          <MonitorContentBox>
            {data?.emailMicroservices.map((microService) => (
              <CardBox key={microService.microserviceId} tone={mapStatus(microService.performanceStatus)}>
                <CircleBox>
                  <Icon id="dotted-cube-icon" h={20} w={20} />
                </CircleBox>
                <Icon id="clock-icon" width={12} height={11} /> {microService.lapse}
              </CardBox>
            ))}
          </MonitorContentBox>
        </MonitorSpacing>
      </MonitorFlex>
      {showDivider && <Divider />}
    </MonitorContainerBox>
  );
};

export default MicroService;

const MonitorContainerBox = styled.div``;
const Divider = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  margin-bottom: ${px(16)};
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
