import { px, rem } from '@/utils';
import React from 'react';
import styled from 'styled-components';
import { CircleDash, CheckmarkOutline } from '@carbon/react/icons';

const itemsList = [
  'Creating stored procedures and views',
  'Creating database table and indexes',
  'Loading default data.',
  'Wrapping up',
];

type IProps = {
  handleSetStep: () => void;
};

const SetupProcess = ({ handleSetStep }: IProps) => {
  const [processStep] = React.useState<number>(1);

  return (
    <Setupcontainer>
      <SetUpMessageSection>
        Setting up the best service management system for you.
      </SetUpMessageSection>
      <VerticalLine />
      <SectionList>
        {itemsList?.map((item, index) => (
          <SectionListitem key={index} step={processStep} Id={index}>
            <SectionListIcon>
              {processStep === index || index < processStep ? (
                <CheckmarkOutline />
              ) : (
                <CircleDash />
              )}
            </SectionListIcon>
            <SectionListDescription step={processStep} Id={index}>
              {item}
            </SectionListDescription>
          </SectionListitem>
        ))}
      </SectionList>
    </Setupcontainer>
  );
};

export default SetupProcess;

const Setupcontainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: calc(100vh - ${px(64)});
  gap: ${px(80)};
`;

const SetUpMessageSection = styled.div`
  width: ${px(381)};
  font-size: ${px(32)};
  line-height: ${px(42)};
  color: ${({ theme }) => theme.colors.white};
`;

const VerticalLine = styled.div`
  width: ${px(1)};
  height: ${px(100)};
  background-color: ${({ theme }) => theme.colors.darkPrimary20};
`;

const SectionList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

type ListItemProps = { Id: number; step: number };

const SectionListitem = styled.div<ListItemProps>`
  color: ${({ Id, step, theme }) =>
    Id === step || Id <= step ? theme.colors.normalText : theme.colors.white};
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-size: ${rem(16)};
  font-weight: 400;
`;

const SectionListIcon = styled.div`
  margin-right: ${px(14)};
  svg {
    fill: currentColor;
    width: ${px(20)};
    height: ${px(20)};
    margin-top: ${px(4)};
  }
`;

const SectionListDescription = styled.div<ListItemProps>`
  font-size: ${px(16)};
  line-height: ${px(24)};
  color: ${({ Id, step, theme }) =>
    Id === step || Id <= step
      ? theme.colors.normalText
      : Id === step + 1
      ? theme.colors.white
      : theme.colors.bgHover};
`;
