import React from 'react';
import { TextInput, Select, SelectItem } from '@carbon/react';
import { Link } from '@carbon/react/icons';
import Modal from '@/components/shared/Modal';
import { px } from '@/utils';
import styled from 'styled-components';

type IProps = {
  open?: boolean;
  toggleModal: () => void;
};

const CreateTemplateAlertModal = ({ open, toggleModal }: IProps) => {
  return (
    <TemplateModalContainer>
      <Modal
        buttonLabel="Create template"
        heading=" Create template"
        open={open}
        toggleModal={toggleModal}
        secondaryButtonText="Cancel"
        extent="sm"
      >
        <ModalContainer>
          <InputBox>
            <Select id="select-1" labelText="Template name">
              <SelectItem text="Choose option" />
              <SelectItem text="Option 1" value="option-1" />
              <SelectItem text="Option 2" value="option-2" />
            </Select>
          </InputBox>
          <InputBox>
            <TextInput
              type="text"
              id={'input_1'}
              labelText="Service type"
              placeholder="input text"
            />
          </InputBox>
        </ModalContainer>
      </Modal>
    </TemplateModalContainer>
  );
};

export default CreateTemplateAlertModal;

const TemplateModalContainer = styled.div`
  .cds--modal-container--sm {
    width: 451px !important;
  }
`;

const ModalContainer = styled.div`
  label {
    color: ${({ theme }) => theme.colors.lightText};
  }
`;

const InputBox = styled.div`
  width: 100%;
  margin-bottom: 1rem;

  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
`;
