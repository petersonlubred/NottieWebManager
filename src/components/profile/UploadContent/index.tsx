import { px } from '@/utils';
import React from 'react';
import styled from 'styled-components';
import Button from '@/components/shared/Button';
import { Close } from '@carbon/react/icons';

const UploadContent = () => {
  return (
    <Container>
      <Label>Upload file</Label>
      <Description>
        Max file size is 5mb. Supported file types are csv or excel.
      </Description>
      <Button
        renderIcon={null}
        handleClick={() => console.log('123')}
        buttonLabel="Add file"
      />{' '}
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

const Label = styled.p`
  font-size: ${px(14)};
  font-weight: 600;
  line-height: ${px(18)};
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${px(8)};
`;

const Description = styled.p`
  font-size: ${px(14)};
  font-weight: 400;
  line-height: ${px(18)};
  color: ${({ theme }) => theme.colors.lightText};
  margin-bottom: ${px(16)};
`;

const PreviewName = styled.p`
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

const Paragraph = styled.p``;
