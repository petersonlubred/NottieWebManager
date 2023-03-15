import {
  DataTable,
  DataTableCustomRenderProps,
  DataTableHeader,
  DataTableSkeleton,
  DataTableSkeletonHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'carbon-components-react';
import { isEmpty } from 'lodash';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import Empty from '@/components/shared/Empty';
import Loader from '@/components/shared/Loader';
import useHeaders from '@/hooks/useHeaders';
import { EmailData, SmsData, TransactionData } from '@/interfaces/notification';
import { px } from '@/utils';

import AccessStatus from '../../AccessStatus';

type IProps = {
  transactionData?: Partial<TransactionData>;
  data?: EmailData[] | SmsData[];
  isLoading?: boolean;
  action?: string;
};

const AlertTableModal = ({ data, isLoading, action, transactionData }: IProps) => {
  const [responseData, setResponseData] = React.useState<EmailData[] | SmsData[]>([]);
  const [Rows, setRows] = React.useState<any>([]);
  const { emailmodalheader, smsheader } = useHeaders();
  const [Headers, setHeaders] = React.useState<DataTableHeader[] & DataTableSkeletonHeader[]>([]);

  useEffect(() => {
    const headers = [emailmodalheader, smsheader];

    headers?.forEach(() => {
      if (action?.endsWith('mail')) {
        setHeaders(emailmodalheader);
      } else {
        setHeaders(smsheader?.filter((item: { key: string; header: string }) => item?.key !== 'customerId'));
      }
      const rows = responseData?.map((item: any) => {
        const row: any = {};

        const tabHeaders = action?.endsWith('mail') ? emailmodalheader : smsheader;
        tabHeaders.forEach((item2: { key: string; header: string }) => {
          row[item2.key] = item[item2.key];
          row.id = item.messageId;
          row['deliveryStatus'] = <AccessStatus active={item['deliveryStatus']} />;
        });
        return row;
      });
      !rows.some((row: any) => row.id === undefined) && setRows(rows);
    });
  }, [action, emailmodalheader, responseData, smsheader]);

  useEffect(() => {
    if (action?.endsWith('mail')) {
      !isEmpty(data) ? setResponseData(data as EmailData[]) : setResponseData([]);
    } else if (action?.endsWith('sms')) {
      !isEmpty(data) ? setResponseData(data as SmsData[]) : setResponseData([]);
    } else {
      setResponseData([]);
    }
  }, [action, data]);

  return (
    <InputModalContainer>
      <ModalContainer>
        <SubHeader>
          <Header>Customer ID: {transactionData?.customerId}</Header>
          <Header>Narration: {transactionData?.narration}</Header>
        </SubHeader>
        <DataTable
          rows={Rows}
          headers={Headers}
          render={({ rows, headers, getHeaderProps, getTableProps }: DataTableCustomRenderProps) =>
            isLoading ? (
              <DataTableSkeleton showHeader={false} showToolbar={false} compact rowCount={7} columnCount={Headers?.length - 1} headers={Headers} />
            ) : (
              <Table {...getTableProps()}>
                <TableHead>
                  <TableRow>
                    {headers.map((header: any, index: number) => (
                      <TableHeader {...getHeaderProps({ header })} key={index}>
                        {header.header}
                      </TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row: any) => (
                    <TableRow key={row.id}>
                      {row.cells.map((cell: any) => (
                        <TableCell key={cell.id}>{cell.value}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )
          }
        />
        {isLoading ? <Loader /> : isEmpty(Rows) && <Empty title={action === 'mail' ? 'No Email found' : 'No SMS found'} />}{' '}
      </ModalContainer>
    </InputModalContainer>
  );
};

export default AlertTableModal;

const InputModalContainer = styled.div`
  .cds--data-table-content {
    position: relative;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  table {
    width: 100%;

    thead {
      position: sticky !important;
      top: 0 !important;
      z-index: 1000 !important;
    }

    thead,
    th {
      background-color: ${({ theme }) => theme.colors.bgPrimaryLight} !important;
      color: ${({ theme }) => theme.colors.white} !important;
    }

    td {
      background-color: ${({ theme }) => theme.colors.bgPrimaryLight} !important;
      color: ${({ theme }) => theme.colors.white} !important;
      border-top: 1px solid ${({ theme }) => theme.colors.darkPrimary50} !important;
      border-bottom: 1px solid ${({ theme }) => theme.colors.darkPrimary50} !important;
    }

    tr:hover td {
      background-color: ${({ theme }) => theme.colors.bgPrimaryLight} !important;
      color: ${({ theme }) => theme.colors.white} !important;
      border-top: 1px solid ${({ theme }) => theme.colors.bgHover} !important;
      border-bottom: 1px solid ${({ theme }) => theme.colors.bgHover} !important;
    }
  }
`;

const ModalContainer = styled.div``;

const SubHeader = styled.div`
  display: flex;
  gap: ${px(90)};
  align-items: center;
  width: 100%;
  margin-bottom: 2rem;
`;
const Header = styled.div``;
