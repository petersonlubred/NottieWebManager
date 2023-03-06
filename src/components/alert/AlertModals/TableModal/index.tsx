import { DataTable, DataTableSkeleton, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@carbon/react';
import { isEmpty } from 'lodash';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import Empty from '@/components/shared/Empty';
import Loader from '@/components/shared/Loader';
import useHeaders from '@/hooks/useHeaders';
import { EmailData, SmsData, TransactionData } from '@/interfaces/notification';
import { px } from '@/utils';

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
  const [Headers, setHeaders] = React.useState<any>([]);

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
        <DataTable rows={Rows} headers={Headers}>
          {({ rows, headers, getHeaderProps, getTableProps }: any) =>
            isLoading ? (
              <DataTableSkeleton showHeader={false} showToolbar={false} size="compact" rowCount={7} columnCount={Headers?.length - 1} headers={Headers} />
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
        </DataTable>{' '}
        {isLoading ? <Loader /> : isEmpty(Rows) && <Empty title={action === 'mail' ? 'No Email found' : 'No SMS found'} />}{' '}
      </ModalContainer>
      {/* {!isEmpty(Rows) && (
        <PaginationContainer>
          <Pagination
            backwardText="Previous page"
            forwardText="Next page"
            itemsPerPageText="Items per page:"
            className="pagination"
            page={pageNumber}
            pageNumberText="Page Number"
            pageSize={pageSize}
            pageSizes={[10, 20, 30, 40, 50]}
            totalItems={totalCount}
            onChange={({ page, pageSize }: { page: number; pageSize: number }) => {
              setQuery &&
                setQuery({
                  pageNumber: page,
                  pageSize,
                });
            }}
          />{' '}
        </PaginationContainer>
      )} */}
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

// const PaginationContainer = styled.div`
//   bottom: 0;
//   width: 100%;

//   .pagination {
//     background-color: ${({ theme }) => theme.colors.bgPrimary};
//     border-top: 1px solid ${({ theme }) => theme.colors.darkPrimary50};
//     color: ${({ theme }) => theme.colors.white};

//     & > div {
//       border: none;

//       span:nth-child(3) {
//         color: ${({ theme }) => theme.colors.lightText};
//       }

//       span:nth-child(2) {
//         color: ${({ theme }) => theme.colors.white};
//       }

//       select {
//         color: ${({ theme }) => theme.colors.white} !important;
//         background-color: ${({ theme }) => theme.colors.bgPrimaryLight} !important;
//         border: none !important;
//         &:focus,
//         &:active,
//         &:hover {
//           outline: none;
//           background-color: ${({ theme }) => theme.colors.bgPrimaryLight};
//         }
//       }

//       #cds-pagination-select-id-10-right {
//         border-left: 1px solid ${({ theme }) => theme.colors.darkPrimary50} !important;
//       }
//       #cds-pagination-select-id-10 {
//         border-right: 1px solid ${({ theme }) => theme.colors.darkPrimary50} !important;
//       }

//       .cds--select-input:focus {
//         outline: none;
//         background-color: ${({ theme }) => theme.colors.bgPrimaryLight};
//       }

//       svg {
//         fill: ${({ theme }) => theme.colors.white};
//       }

//       button {
//         border-left: 1px solid ${({ theme }) => theme.colors.darkPrimary50};
//         &:focus,
//         &:hover {
//           outline: none;
//           border: none;
//           background-color: ${({ theme }) => theme.colors.bgPrimaryLight};
//         }
//       }
//     }
//   }
//   .pagination {
//     background-color: ${({ theme }) => theme.colors.bgPrimaryLight};
//     border-top: 1px solid ${({ theme }) => theme.colors.darkPrimary50};
//     color: ${({ theme }) => theme.colors.white};

//     & > div {
//       border: none;

//       span:nth-child(3) {
//         color: ${({ theme }) => theme.colors.lightText};
//       }

//       span:nth-child(2) {
//         color: ${({ theme }) => theme.colors.white};
//       }

//       select {
//         color: ${({ theme }) => theme.colors.white} !important;
//         background-color: ${({ theme }) => theme.colors.bgPrimaryLight} !important;
//         border: none !important;
//         &:focus,
//         &:active,
//         &:hover {
//           outline: none;
//           background-color: ${({ theme }) => theme.colors.bgPrimaryLight};
//         }
//       }

//       #cds-pagination-select-id-10-right {
//         border-left: 1px solid ${({ theme }) => theme.colors.darkPrimary50} !important;
//       }
//       #cds-pagination-select-id-10 {
//         border-right: 1px solid ${({ theme }) => theme.colors.darkPrimary50} !important;
//       }

//       .cds--select-input:focus {
//         outline: none;
//         background-color: ${({ theme }) => theme.colors.bgPrimaryLight};
//       }

//       svg {
//         fill: ${({ theme }) => theme.colors.white};
//       }

//       button {
//         border-left: 1px solid ${({ theme }) => theme.colors.darkPrimary50};
//         &:focus,
//         &:hover {
//           outline: none;
//           border: none;
//           background-color: ${({ theme }) => theme.colors.bgPrimaryLight};
//         }
//       }
//     }
//   }
//   .cds--pagination__control-buttons {
//     background-color: ${({ theme }) => theme.colors.bgPrimaryLight};
//   }
// `;
