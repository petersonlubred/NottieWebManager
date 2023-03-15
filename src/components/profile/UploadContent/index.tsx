import { Close } from '@carbon/icons-react';
import React from 'react';
import styled from 'styled-components';

import Button from '@/components/shared/Button';
import { px } from '@/utils';

const UploadContent = () => {
  return (
    <Container>
      <Label>Upload file</Label>
      <Description>Max file size is 5mb. Supported file types are csv or excel.</Description>
      <Button renderIcon={null} handleClick={() => null} buttonLabel="Add file" />{' '}
      <PreviewName>
        <Paragraph>name.txt</Paragraph>
        <Close size={16} />
      </PreviewName>
    </Container>
  );
};

export default UploadContent;

const Container = styled.div`
  button {
    margin-bottom: ${px(16)};
  }
`;

const Label = styled.div`
  font-size: ${px(14)};
  font-weight: 600;
  line-height: ${px(18)};
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${px(8)};
`;

const Description = styled.div`
  font-size: ${px(14)};
  font-weight: 400;
  line-height: ${px(18)};
  color: ${({ theme }) => theme.colors.lightText};
  margin-bottom: ${px(16)};
`;

const PreviewName = styled.div`
  font-size: ${px(14)};
  font-weight: 400;
  line-height: ${px(18)};
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.bgPrimaryLight};
  padding: ${px(8)} ${px(16)};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Paragraph = styled.div``;
