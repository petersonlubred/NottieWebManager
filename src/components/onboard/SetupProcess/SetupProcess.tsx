import { px, rem } from '@/utils';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { CircleDash, CheckmarkOutline } from '@carbon/react/icons';
import {
  useLazyCreateTableQuery,
  useLazyLoadDefaultDataQuery,
  useLazyWrapUpQuery,
} from '@/redux/services';

const itemsList = [
  'Creating stored procedures and views',
  'Creating database table and indexes',
  'Loading default data.',
  'Wrapping up',
];

type IProps = {
  handleSetStep: () => void;
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
  error: any;
};

const SetupProcess = ({ handleSetStep, isSuccess, isLoading }: IProps) => {
  const [processStep, setProcessStep] = React.useState<number>(-2);
  const [createTable, { isLoading: step2Loading, isSuccess: step2Success }] =
    useLazyCreateTableQuery();
  const [loadDefault, { isLoading: step3Loading, isSuccess: step3Success }] =
    useLazyLoadDefaultDataQuery();

  const [wrapUp, { isLoading: step4Loading, isSuccess: step4Success }] =
    useLazyWrapUpQuery();

  const incrementStep = () => {
    setProcessStep(processStep + 1);
  };

  useEffect(() => {
    if (isLoading) {
      incrementStep();
    }
    if (isSuccess) {
      createTable({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createTable, isLoading, isSuccess]);

  useEffect(() => {
    if (step2Loading) {
      incrementStep();
    }
    if (step2Success) {
      loadDefault({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createTable, step2Loading, step2Success]);

  useEffect(() => {
    if (step3Loading) {
      incrementStep();
    }
    if (step3Success) {
      wrapUp({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createTable, step3Loading, step3Success]);

  useEffect(() => {
    if (step4Loading) {
      incrementStep();
    }

    if (step4Success) {
      handleSetStep();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleSetStep, step4Loading, step4Success]);

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
