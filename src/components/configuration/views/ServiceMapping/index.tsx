import React, { useState } from 'react';
import styled from 'styled-components';

import AccordionBox from '@/components/shared/AccordionBox';
import Icon from '@/components/shared/Icons';
import Loader from '@/components/shared/Loader';
import { IServiceMapping } from '@/interfaces/serviceMapping';
import { ConfigurationContainer } from '@/pages/configuration';
import { useGetServiceMappingQuery } from '@/redux/api/serviceMappingApi';
import { px } from '@/utils';

const ServiceMapping = () => {
  const [opened, setOpened] = useState<number[]>([]);
  const { data, isFetching } = useGetServiceMappingQuery({});

  const toggleDropdown = (index: number) => {
    if (opened.includes(index)) {
      setOpened(opened.filter((item) => item !== index));
    } else {
      setOpened([...opened, index]);
    }
  };

  if (isFetching) {
    return <Loader />;
  }

  return (
    <ConfigurationContainer>
      <Container>
        <Heading>Map each service to different data source by dragging or right clicking on them.</Heading>
        <CardBox>
          <MappingCard>
            <MappingTitleBox>
              <Icon id="dotted-cube-icon" width={18} height={19} />
              <MappingTitle>Unmapped Services</MappingTitle>
            </MappingTitleBox>
            {data?.data?.map((item: IServiceMapping, index: number) => (
              <AccordionBox
                title={item.serviceType}
                key={item.serviceType}
                index={index}
                toggleDropdown={toggleDropdown}
                opened={opened.includes(index)}
                itemsOnExpand={
                  <>
                    {item.serviceMapModels.map((_, index) => (
                      <AccordionItemListBox key={index}>
                        <AccordionListTitle>
                          <Icon id="dotted-cube-icon" width={18} height={19} />
                          <TitleParagraph>Unmapped Services</TitleParagraph>
                        </AccordionListTitle>{' '}
                        <Icon id="dotted-rectangle-icon" width={6} height={9} />
                      </AccordionItemListBox>
                    ))}
                  </>
                }
              />
            ))}
          </MappingCard>
        </CardBox>
      </Container>
    </ConfigurationContainer>
  );
};

export default ServiceMapping;

const Container = styled.div`
  padding: ${px(24)};
  color: ${({ theme }) => theme.colors.white};
`;

const Heading = styled.h1`
  font-size: ${px(22)};
  font-weight: 400;
  margin-bottom: ${px(40)};
`;

const CardBox = styled.div`
  display: flex;
  width: 100%;
  gap: ${px(12)};
`;
const MappingCard = styled.div`
  width: ${px(321)} !important;
  background-color: ${({ theme }) => theme.colors.bgPrimaryLight};
  color: ${({ theme }) => theme.colors.white};
  min-height: calc(100vh - 300px);
`;

const MappingTitleBox = styled.div`
  display: flex;
  align-items: center;
  padding: ${px(14)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  gap: ${px(6)};

  svg {
    fill: ${({ theme }) => theme.colors.white};
  }
`;

const MappingTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: ${px(20)};
`;

const AccordionItemListBox = styled.div`
  padding: ${px(16)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.borderLight};
  margin-left: ${px(44)};
  margin-right: ${px(33)};
`;

const AccordionListTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${px(6)};
  svg {
    fill: ${({ theme }) => theme.colors.white};
  }
`;

const TitleParagraph = styled.p`
  font-size: ${px(18)} !important;
`;
