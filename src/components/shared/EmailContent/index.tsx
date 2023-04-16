import React from 'react';
import styled from 'styled-components';

import { px } from '@/utils';

import Loader from '../Loader';

interface Iprops {
  subject?: string | JSX.Element;
  content?: string;
  isLoading?: boolean;
}
const EmailContent = ({ subject, content, isLoading }: Iprops) => {
  return isLoading ? (
    <Loader />
  ) : (
    <EmailContentContainer>
      <SubjectContainer>
        <Title>Subject</Title>
        <Paragraph>{subject}</Paragraph>
      </SubjectContainer>
      <Title>Message</Title>
      <Paragraph
        dangerouslySetInnerHTML={{
          __html: content?.toString() || '',
        }}
      ></Paragraph>
    </EmailContentContainer>
  );
};

export default EmailContent;

const EmailContentContainer = styled.div``;

const SubjectContainer = styled.div`
  margin-bottom: ${px(30)};
`;

const Title = styled.p`
  display: flex;
  font-weight: 400;
  font-size: ${px(16)};
  line-height: ${px(20)};
  color: ${({ theme }) => theme.colors.lightText};
  margin-bottom: ${px(3)};
`;

const Paragraph = styled.div`
  display: flex;
  font-weight: 400;
  font-size: ${px(14)};
  line-height: ${px(20)};

  table {
    width: 100%;

    table.btn-primary:hover {
      background-color: ${({ theme }) => theme.colors.bgPrimary} !important;
    }

    thead,
    th {
      background-color: ${({ theme }) => theme.colors.bgPrimary} !important;
    }

    td {
      background-color: ${({ theme }) => theme.colors.bgPrimary} !important ;
      color: ${({ theme }) => theme.colors.white};
      border-top: none !important;
      border-bottom: none !important ;
    }

    tr {
      background-color: ${({ theme }) => theme.colors.bgPrimary} !important;
    }

    tr:hover td {
      background-color: ${({ theme }) => theme.colors.bgPrimary} !important;
      color: ${({ theme }) => theme.colors.white} !important;
      border-top: none !important;
      border-bottom: none !important;
    }

    .cds--data-table--selected td,
    .cds--data-table--selected:hover td {
      background-color: ${({ theme }) => theme.colors.bgPrimary} !important;
      color: ${({ theme }) => theme.colors.white} !important;
      border-bottom: none !important;
    }
  }
`;
