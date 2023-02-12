import { px } from '@/utils';
import React from 'react';
import styled from 'styled-components';
import { CaretRight } from '@carbon/react/icons';

type Iprops = {
  title: string;
  index: number;
  toggleDropdown: Function;
  opened: boolean;
};

const Accordion = ({ title, index, opened, toggleDropdown }: Iprops) => {
  return (
    <AccordionContainer onClick={() => toggleDropdown(index)}>
      <AccordionHeader opened={opened}>
        <CaretRight />
        {title}
      </AccordionHeader>
      {opened && (
        <AccordionList>
          <AccordionListItem>Default</AccordionListItem>
          <AccordionListItem>Staff</AccordionListItem>
        </AccordionList>
      )}
    </AccordionContainer>
  );
};

export default Accordion;

const AccordionContainer = styled.div`
  margin-top: ${px(12)};
`;

type AccordionHeaderProps = {
  opened: boolean;
};

const AccordionHeader = styled.div<AccordionHeaderProps>`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: ${px(7)} ${px(16)};
  font-size: ${px(14)};
  line-height: ${px(18)};
  gap: ${px(6)};
  font-weight: 600;
  border-left: ${({ opened, theme }) =>
    opened ? `2px solid ${theme.colors.button}` : 'none'};
  background-color: ${({ opened, theme }) =>
    opened ? theme.colors.bgPrimaryLight : 'none'};

  svg {
    transform: ${({ opened }) => (opened ? 'rotate(90deg)' : 'rotate(0deg)')};
    transition: transform 0.1s ease-in-out;
  }
`;

const AccordionList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: ${px(7)};
`;

const AccordionListItem = styled.li`
  padding: ${px(7)} ${px(16)} ${px(7)} ${px(49)};
  font-size: ${px(14)};
  line-height: ${px(18)};
  font-weight: 400;
`;
