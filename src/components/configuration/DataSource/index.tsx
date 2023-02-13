import Button from '@/components/shared/Button';
import { px } from '@/utils';
import React from 'react';
import styled from 'styled-components';
import { Add } from '@carbon/react/icons';

const AccordionItems = ['Source001', 'Source002', 'Source003'];

const DataSource = () => {
  return (
    <TemplateContainer>
      <TemplateHeader>
        <HeaderParagraph>Data Source</HeaderParagraph>
        <Button
          renderIcon={(props: any) => <Add size={16} {...props} />}
          handleClick={() => console.log('123')}
          buttonLabel=""
        />
      </TemplateHeader>
      {AccordionItems.map((item, index) => (
        <AccordionContainer key={index}>
          <AccordionHeader>{item}</AccordionHeader>
        </AccordionContainer>
      ))}
    </TemplateContainer>
  );
};

export default DataSource;

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

const AccordionHeader = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: ${px(7)} ${px(16)};
  font-size: ${px(14)};
  line-height: ${px(18)};
  gap: ${px(6)};
  font-weight: 600;
`;
