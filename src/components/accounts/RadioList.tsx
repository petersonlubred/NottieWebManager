import { px } from '@/utils';
import React from 'react';
import styled from 'styled-components';
import { RadioButtonGroup, RadioButton } from '@carbon/react';

const Radioitems = ['Classic', 'AD', 'SSO'];

const RadioList = () => {
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
`;
