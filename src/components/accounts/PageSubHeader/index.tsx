import React from 'react';
import { PageSubHeaderContainer, Paragraph, SearchSection } from './style';

type PropType = {
  navItem: string;
};

const PageSubHeader = ({ navItem }: PropType) => {
  return (
    <PageSubHeaderContainer>
      <Paragraph>{navItem}</Paragraph>
      <SearchSection>
        {/* <SearchBar /> */}
        {/* <Modal
          buttonTriggerText={buttonLabel}
          buttonIcon={(props: any) => <Add size={24} {...props} />}
          heading="Create New User"
          buttonLabel="Invite user"
        >
          <ModalContent />
        </Modal> */}
      </SearchSection>
    </PageSubHeaderContainer>
  );
};

export default PageSubHeader;
