import React from 'react';
import {
  TextInput,
  TextArea,
  Dropdown,
  Checkbox,
  RadioButtonGroup,
  RadioButton,
} from '@carbon/react';
import styled from 'styled-components';
import { px } from '@/utils';
import Button from '@/components/shared/Button';
import { Formik, Form, Field } from 'formik';
import { SeqLogSchema } from '@/schemas';
import { initialSeqLog } from '@/interfaces/dtos';

const items: string[] = ['Baya', 'Pcsis', 'Nottie'];

const checkboxFields = [{ label: 'Transaction service', id: 'checkbox_1' }];

const SeqLogForm = () => {
  return (
    <Container>
      <MailNav>
        <ActionContainer>
          <Button
            renderIcon={null}
            handleClick={() => console.log('123')}
            buttonLabel="Save changes"
          />
        </ActionContainer>
      </MailNav>{' '}
      <InputContainer>
        <InputCover>
          <TextInput
            id="text-input-1"
            type="text"
            labelText="Text input label"
          />
        </InputCover>
        <InputCover>
          <Dropdown
            id="default"
            titleText="Dropdown label"
            label="Dropdown menu options"
            items={items}
            itemToString={(item: string) => (item ? item : '')}
          />
        </InputCover>
        <InputCover>
          {checkboxFields.map((checkbox) => (
            <Checkbox
              key={checkbox.id}
              labelText={checkbox.label}
              id={checkbox.id}
              checked
            />
          ))}
        </InputCover>
        <InputCover>
          <TextArea
            labelText="Text Area label"
            rows={4}
            id="text-area-1"
          />
        </InputCover>
        <InputCover>
          <RadioButtonGroup>
            <RadioButton
              labelText="Radio button label"
              value="radio-3"
              id="radio-3"
              disabled
            />
          </RadioButtonGroup>
        </InputCover>
      </InputContainer>
    </Container>
  );
};

export default SeqLogForm;

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 300px);
  overflow: auto;

  .color-picker {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, 10%);
    z-index: 1000;
    background-color: ${({ theme }) => theme.colors.bgHover};
    border: 1px solid ${({ theme }) => theme.colors.borderLight};
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  }

  form {
    padding: 0 ${px(252)} ${px(16)} ${px(13)};
    svg {
      fill: ${({ theme }) => theme.colors.white} !important ;
    }
  }
`;

const MailNav = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${px(24)};
  justify-content: flex-end;
`;

const ActionContainer = styled.div`
  button {
    padding: ${px(10)} ${px(16)};
  }
`;

const InputContainer = styled.div`
  width: 100%;
  margin: 2rem;

  display: flex;
  flex-direction: column;
`;
const InputCover = styled.div`
  max-width: 50%;
  margin-bottom: 1rem;
`;
