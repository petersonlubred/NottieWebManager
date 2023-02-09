import { px } from '@/utils';
import React from 'react';
import styled from 'styled-components';
import { RadioButtonGroup, RadioButton } from '@carbon/react';

interface Iprops {
  Radioitems: string[];
}

const RadioList = ({ Radioitems }: Iprops) => {
  return (
    <RadioItemList
      defaultSelected="default-selected"
      name="radio-button-group"
      valueSelected="default-selected"
    >
      {Radioitems?.map((item, index) => (
        <RadioButton
          key={index}
          id={index.toString()}
          labelText={item}
          value={index}
        />
      ))}
    </RadioItemList>
  );
};

export default RadioList;

const RadioItemList = styled(RadioButtonGroup)`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: ${px(36)};
  margin-top: ${px(20)};
`;
