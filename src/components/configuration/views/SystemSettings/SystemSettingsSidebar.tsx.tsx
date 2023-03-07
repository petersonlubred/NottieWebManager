import React from 'react';
import styled from 'styled-components';

import { ISetState } from '@/interfaces/formik.type';
import { ISystemConfig } from '@/interfaces/systemConfig';
import { px } from '@/utils';

type IProps = {
  data?: ISystemConfig[];
  setMenuCode: ISetState<string>;
  menuCode: string;
};
const SystemSettingSideBar = ({ data, setMenuCode, menuCode }: IProps) => {
  return (
    <TemplateContainer>
      <TemplateHeader>
        <HeaderParagraph>System setting</HeaderParagraph>
      </TemplateHeader>
      {data?.map(
        (item: ISystemConfig, index) =>
          item?.configMenuItem && (
            <AccordionContainer key={index}>
              <AccordionHeader clicked={item?.configMenuItemCode === menuCode} onClick={() => setMenuCode(item?.configMenuItemCode)}>
                {item?.configMenuItem}
              </AccordionHeader>
            </AccordionContainer>
          )
      )}
    </TemplateContainer>
  );
};

export default SystemSettingSideBar;

const TemplateContainer = styled.div`
  width: 20% !important;
  color: ${({ theme }) => theme.colors.white};
  border-right: 1px solid ${({ theme }) => theme.colors.borderLight};
  min-height: calc(100vh - 300px);
`;

const TemplateHeader = styled.div`
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
  background-color: ${({ clicked, theme }) => (clicked ? theme.colors.bgPrimaryLight : 'transparent')};
  border-left: ${({ clicked, theme }) => (clicked ? `2px solid ${theme.colors.normalText}` : 'none')};
`;
