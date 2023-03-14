import { CaretRight } from '@carbon/react/icons';
import React from 'react';
import styled from 'styled-components';

import { px } from '@/utils';

type Iprops = {
  title: string;
  index: string;
  toggleDropdown: (_index: string) => void;
  opened: boolean;
  itemsOnExpand?: JSX.Element;
};

const AccordionBox = ({ title, index, opened, toggleDropdown, itemsOnExpand }: Iprops) => {
  return (
    <AccordionContainer>
      <AccordionHeader opened={opened} onClick={() => toggleDropdown(index)}>
        <CaretRight />
        {title}
      </AccordionHeader>
      {opened && itemsOnExpand}
    </AccordionContainer>
  );
};

export default AccordionBox;

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
  margin-bottom: ${px(17)};
  font-size: ${px(18)};
  line-height: ${px(18)};
  gap: ${px(6)};
  font-weight: 600;
  svg {
    transform: ${({ opened }) => (opened ? 'rotate(90deg)' : 'rotate(0deg)')};
    transition: transform 0.1s ease-in-out;
  }
`;
