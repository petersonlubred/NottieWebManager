import { Add } from '@carbon/icons-react';
import React, { useState } from 'react';
import styled from 'styled-components';

import AccordionBox from '@/components/shared/AccordionBox';
import Button from '@/components/shared/Button';
import Loader from '@/components/shared/Loader';
import { ITemplateConfig, ITemplates } from '@/interfaces/template';
import { useGetTemplateConfigQuery } from '@/redux/api';
import { px } from '@/utils';

interface ITemplateContent {
  // eslint-disable-next-line no-unused-vars
  onSelectTemplate: (props: { serviceId: string; template: { templateId: string; templateName: string }; shouldGetNonTransactionalTag: boolean }) => void;
  template: { templateId: string; templateName: string };
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const TemplateContent = ({ onSelectTemplate, template: parentTemplate, setOpenModal }: ITemplateContent) => {
  const { data, isFetching } = useGetTemplateConfigQuery({});
  const [opened, setOpened] = useState<number[]>([]);

  const toggleDropdown = (index: number) => {
    if (opened.includes(index)) {
      setOpened(opened.filter((item) => item !== index));
    } else {
      setOpened([...opened, index]);
    }
  };
  return (
    <TemplateContainer>
      <TemplateHeader>
        <HeaderParagraph>Templates</HeaderParagraph>
        <Button renderIcon={(props: any) => <Add size={16} {...props} />} handleClick={() => setOpenModal(true)} buttonLabel="" />
      </TemplateHeader>
      {isFetching && <Loader />}
      {!isFetching && (
        <>
          {data?.data.map((item: ITemplateConfig, index: number) => (
            <AccordionBox
              title={item.serviceTypeName}
              key={item.serviceTypeId}
              index={index}
              toggleDropdown={toggleDropdown}
              opened={opened.includes(index)}
              itemsOnExpand={
                <AccordionList>
                  {item.templates?.map((template: ITemplates) => (
                    <AccordionListItem
                      key={template.templateId}
                      clicked={template.templateId === parentTemplate?.templateId}
                      onClick={() =>
                        onSelectTemplate({
                          serviceId: item.serviceTypeId,
                          template: {
                            templateId: template.templateId,
                            templateName: template.templateName,
                          },
                          shouldGetNonTransactionalTag: item.serviceTypeName === 'None-Transaction',
                        })
                      }
                    >
                      {template.templateName}
                    </AccordionListItem>
                  ))}
                </AccordionList>
              }
            />
          ))}
        </>
      )}
    </TemplateContainer>
  );
};

export default TemplateContent;

const TemplateContainer = styled.div`
  width: 20% !important;
  color: ${({ theme }) => theme.colors.white};
  border-right: 1px solid ${({ theme }) => theme.colors.borderLight};
  min-height: calc(100vh - 200px);
  max-height: calc(100vh - 200px);
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TemplateHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${px(16)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  button {
    padding: calc(0.875rem - 4px) 33px calc(0.875rem - 3px) 15px !important;
  }
`;

const HeaderParagraph = styled.p`
  font-size: ${px(16)};
  font-weight: 400;
  line-height: ${px(28)};
`;

const AccordionList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: ${px(7)};
`;

const AccordionListItem = styled.li<{ clicked: boolean }>`
  padding: ${px(7)} ${px(16)} ${px(7)} ${px(49)};
  font-size: ${px(14)};
  line-height: ${px(18)};
  font-weight: 400;
  cursor: pointer;
  background-color: ${({ clicked, theme }) => (clicked ? theme.colors.bgPrimaryLight : 'transparent')};
  border-left: ${({ clicked, theme }) => (clicked ? `2px solid ${theme.colors.normalText}` : 'none')};
`;
