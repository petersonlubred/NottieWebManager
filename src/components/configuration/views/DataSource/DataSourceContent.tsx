import { Add } from '@carbon/react/icons';
import React from 'react';
import styled from 'styled-components';

import Button from '@/components/shared/Button';
import { IDataSourceType } from '@/interfaces/configuration';
import { ISetState } from '@/interfaces/formik.type';
import { px } from '@/utils';

type IProps = {
  handleToggleForm: () => void;
  data?: IDataSourceType[];
  id?: string;
  setId: ISetState<string>;
};

const DataSourceContent = ({ handleToggleForm, data, id, setId }: IProps) => {
  return (
    <DataSourceContainer>
      <DataSourceHeader>
        <HeaderParagraph>Data Source</HeaderParagraph>
        <Button renderIcon={(props: any) => <Add size={12} {...props} />} handleClick={handleToggleForm} buttonLabel=" " />
      </DataSourceHeader>
      {data?.map((item, index) => (
        <AccordionContainer key={index}>
          <AccordionHeader clicked={item?.dataSourceId === id} onClick={() => setId(item?.dataSourceId)}>
            {item?.databaseName}
          </AccordionHeader>
        </AccordionContainer>
      ))}
    </DataSourceContainer>
  );
};

export default DataSourceContent;

const DataSourceContainer = styled.div`
  width: 20% !important;
  color: ${({ theme }) => theme.colors.white};
  border-right: 1px solid ${({ theme }) => theme.colors.borderLight};
  min-height: calc(100vh - 300px);
`;

const DataSourceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${px(16)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  button {
    padding: calc(0.875rem - 4px) 33px calc(0.875rem - 3px) 15px !important;
  }
`;

const HeaderParagraph = styled.p`
  font-size: ${px(16)};
  font-weight: 400;
  line-height: ${px(28)};
`;

const AccordionContainer = styled.div`
  margin-top: ${px(12)};
`;

const AccordionHeader = styled.div<{ clicked: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: ${px(9)} ${px(16)};
  font-size: ${px(14)};
  line-height: ${px(18)};
  gap: ${px(6)};
  font-weight: 600;
  width: fit-content;
  border-left: ${({ clicked, theme }) => (clicked ? `2px solid ${theme.colors.normalText}` : 'none')};
`;
