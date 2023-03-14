import React, { useState } from 'react';
import styled from 'styled-components';

import Loader from '@/components/shared/Loader';
import { ConfigurationContainer } from '@/pages/configuration';
import { useGetMappedQuery, useGetServiceMappingsQuery } from '@/redux/api/serviceMappingApi';
import { px } from '@/utils';

import Boards from '../../Boards';

const ServiceMapping = () => {
  const [opened, setOpened] = useState<string[]>([]);
  const { data, isFetching } = useGetServiceMappingsQuery();
  const { data: mapped, isFetching: Loading } = useGetMappedQuery();

  const toggleDropdown = (index: string) => {
    if (opened.includes(index)) {
      setOpened(opened.filter((item) => item !== index));
    } else {
      setOpened([...opened, index]);
    }
  };

  if (isFetching || Loading) {
    return <Loader />;
  }

  return (
    <ConfigurationContainer>
      <Container>
        <Heading>Map each service to different data source by dragging or right clicking on them.</Heading>
        <Boards data={data?.data} toggleDropdown={toggleDropdown} opened={opened} mapped={mapped?.data} />
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
