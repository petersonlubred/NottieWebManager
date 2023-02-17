import React from 'react';
import { TextInput } from '@carbon/react';
import { Link } from '@carbon/react/icons';
import Modal from '@/components/shared/Modal';
import { px } from '@/utils';
import styled from 'styled-components';

const dummpData: any[] = [
  { tagName: 'Tag1', id: 'id1', inputName: 'Name', inputId: 'name' },
  { tagName: 'Tag2', id: 'id2', inputName: 'Age', inputId: 'age' },
  {
    tagName: 'Tag3',
    id: 'id3',
    inputName: 'Last transaction',
    inputId: 'last_transaction',
  },
  {
    tagName: 'Tag4',
    id: 'id4',
    inputName: 'Date registered',
    inputId: 'date_registered',
  },
];

type IProps = {
  open?: boolean;
  toggleModal: () => void;
};

const AlertInputFieldModal = ({ open, toggleModal }: IProps) => {
  return (
    <InputModalContainer>
      <Modal
        buttonLabel="Save Chnages"
        heading="Map custom tags"
        open={open}
        toggleModal={toggleModal}
        secondaryButtonText="Cancel"
        buttonTriggerText={''}
        extent="sm"
        buttonIcon={(props: any) => props}
      >
        {dummpData.map((item: any) => (
          <InputFieldContainer key={item.id}>
            <TagBox>{item.tagName}</TagBox>
            <IconBox>
              <Link />
            </IconBox>
            <InputBox>
              <TextInput
                type="text"
                id={item.inputId}
                placeholder={item.inputName}
              />
            </InputBox>
          </InputFieldContainer>
        ))}
      </Modal>
    </InputModalContainer>
  );
};

export default AlertInputFieldModal;

const InputModalContainer = styled.div`
  .cds--modal-container--sm {
    width: 435px !important;
  }
`;

const InputFieldContainer = styled.div`
  display: flex;
  gap:33px;
  align-items: center;
  margin-bottom: 14px;
`;
const TagBox = styled.div`
  width: 10%;
`;

const IconBox = styled.div`
  width: 25%;
  text-align: center;
`;

const InputBox = styled.div`
  width: 256px;

  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
`;
