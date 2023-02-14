import React from 'react';
import { Checkbox } from '@carbon/react';
import Button from '@/components/shared/Button';
import { px } from '@/utils';
import styled from 'styled-components';

const checkboxFields = [
  { label: 'Transaction service', id: 'checkbox_1' },
  { label: 'Non Transaction service', id: 'checkbox_2' },
  { label: 'OTP service', id: 'checkbox_3' },
];

type Iprops= {
  isDesc:boolean
}


const CheckBoxForm = ({isDesc}:Iprops) => {
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
      <CheckboxContainer>
        {checkboxFields.map((checkbox) => (
          <Checkbox
            key={checkbox.id}
            labelText={checkbox.label}
            id={checkbox.id}
            checked
          />
        ))}
      </CheckboxContainer>
    </Container>
  );
};

export default CheckBoxForm;

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

const CheckboxContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  /* gap: 5px; */
  width: 60%;
  padding:${px(12)};
`;
