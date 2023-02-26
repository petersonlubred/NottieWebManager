import Accordion from '@/components/shared/Accordion';
import Button from '@/components/shared/Button';
import { px } from '@/utils';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Add } from '@carbon/react/icons';

const AccordionItems = ['Transaction', 'Non-Transaction', 'OTP'];

const TemplateContent = () => {
  const [opened, setOpened] = useState<number[]>([]);

  const toggleDropdown = (index: number) => {
    if (opened.includes(index)) {
      setOpened(opened.filter((item) => item !== index));
    } else {
      setOpened([...opened, index]);
    }
  };
  return (
    <TemplateContainer>
      <TemplateHeader>
        <HeaderParagraph>Templates</HeaderParagraph>
        <Button renderIcon={(props: any) => <Add size={16} {...props} />} handleClick={() => console.log('123')} buttonLabel="" />
      </TemplateHeader>
      {AccordionItems.map((item, index) => (
        <Accordion title={item} key={index} index={index} toggleDropdown={toggleDropdown} opened={opened.includes(index)} />
      ))}
    </TemplateContainer>
  );
};

export default TemplateContent;

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
