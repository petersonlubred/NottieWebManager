import React from 'react';
import { Add, Password, TrashCan } from '@carbon/react/icons';
import SearchBar from '../SearchBar';
import Modal from '../../shared/Modal';
import {
  PageSubHeaderContainer,
  PanelIcon,
  PanelItem,
  PanelList,
  PanelText,
  Paragraph,
  SearchSection,
  SelectedCount,
  SelectedPanel,
} from './style';
import ModalContent from '../ModalContent';

type PropType = {
  buttonLabel: string;
  selected?: boolean;
};

const PageSubHeader = ({ buttonLabel, selected }: PropType) => {
  return (
    <PageSubHeaderContainer>
      <Paragraph>User accounts</Paragraph>
      {!selected ? (
        <SearchSection>
          <SearchBar />
          <Modal
            buttonTriggerText={buttonLabel}
            buttonIcon={(props: any) => <Add size={24} {...props} />}
            heading="Create New User"
            buttonLabel="Invite user"
            
          >
            <ModalContent />
          </Modal>
        </SearchSection>
      ) : (
        <SelectedPanel>
          <SelectedCount>3 items selected</SelectedCount>
          <PanelList>
            <PanelItem>
              <PanelText>Reset password</PanelText>
              <PanelIcon>
                <Password size={16} />
              </PanelIcon>
            </PanelItem>
            <PanelItem>
              <PanelText>Delete</PanelText>
              <PanelIcon>
                <TrashCan size={16} />
              </PanelIcon>
            </PanelItem>
            <PanelItem>Cancel</PanelItem>
          </PanelList>
        </SelectedPanel>
      )}
    </PageSubHeaderContainer>
  );
};

export default PageSubHeader;
